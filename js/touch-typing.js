/* ============================================================
   LingoStep — touch-typing.js  (v10 native keyboard answers)
   Answer surfaces for lessons, placement test and dialogue
   practice are driven by the NATIVE phone keyboard. There are no
   custom letter banks or QWERTY pads anywhere: an invisible
   <input> overlays the answer slots, so tapping the answer area
   opens the Android/iPhone system keyboard exactly like typing in
   any other app.

   Shared core — createNativeSessionField(opts):
   - Letter slots grouped by word (letter-track helpers define the
     word grouping and punctuation policy).
   - Keystrokes go through the word state machine (exercise-state)
     with the SAME prefix policy as the original typing pipeline:
     wrong letters are rejected (shake + buzz), punctuation is
     printed in place and never has to be typed.
   - Words LOCK word-by-word: a completed word turns green and is
     frozen (cannot be deleted, edited or replaced). The space
     after it is inserted automatically.
   - Backspace only ever removes the last letter of the ACTIVE
     word — locked words are untouchable. There is NO clear-all.
   - Smart hints: revealHint() reveals the next hidden letter of
     the active word (capped at half the word, never the whole
     word, never the Arabic meaning) and styles it in the hint
     color.
   - Physical keyboards still work on desktop through a
     document-level keydown listener.

   1) createTouchTypingField({ expected, ... })
      Dictation surface for listen-and-type / dialogue practice.
      Completing the sentence fires onComplete() once.

   2) createNativeBlankField({ expected, ... })
      Fill-blank surface: same slots, same session logic, plus
      lockCorrect() / markIncorrect() so the engine can freeze the
      answer green after checkAnswer() confirms it.

   Pure logic helpers (validateKeystroke / buildTiles) are DOM-free
   and Node-testable; the word state machine lives in
   exercise-state.js (pure, tested).
   ============================================================ */

import { splitSegments, alignTyped, isOptionalChar } from './letter-track.js';
import { createWordSession } from './exercise-state.js';
import { getSettings } from './settings.js';
import { el } from './utils.js';

/* ---------- shared feedback tones (same policy as before) ---------- */

let sharedCtx = null;

function audioCtx() {
  try {
    if (typeof window === 'undefined') return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!sharedCtx || sharedCtx.state === 'closed') sharedCtx = new Ctx();
    if (sharedCtx.state === 'suspended') sharedCtx.resume().catch(() => {});
    return sharedCtx;
  } catch {
    return null;
  }
}

function tone(freq, { dur = 0.09, delay = 0, gain = 0.06, type = 'sine' } = {}) {
  try {
    const ctx = audioCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
    osc.onended = () => {
      try { osc.disconnect(); g.disconnect(); } catch { /* ignore */ }
    };
  } catch { /* sound is optional; never block input */ }
}

function effectsEnabled() {
  try { return getSettings().soundEffects !== false; } catch { return true; }
}

function soundCorrect() { if (effectsEnabled()) tone(660, { dur: 0.07, gain: 0.045 }); }
function soundWrong() { if (effectsEnabled()) tone(180, { dur: 0.13, gain: 0.05, type: 'sawtooth' }); }
function soundComplete() {
  if (!effectsEnabled()) return;
  tone(523.25, { dur: 0.09, gain: 0.055, delay: 0 });
  tone(659.25, { dur: 0.09, gain: 0.055, delay: 0.09 });
  tone(783.99, { dur: 0.16, gain: 0.06, delay: 0.18 });
}
function soundErase() { if (effectsEnabled()) tone(440, { dur: 0.05, gain: 0.03 }); }
function soundLock() {
  if (!effectsEnabled()) return;
  tone(587.33, { dur: 0.07, gain: 0.05 });
  tone(880, { dur: 0.1, gain: 0.05, delay: 0.07 });
}

/* ============================================================
   Pure logic — Node-testable (kept for validation parity)
   ============================================================ */

/**
 * Validate one keystroke against the expected sentence.
 * Mirrors the ORIGINAL character-check policy exactly:
 *   - unmatched letters before completion  → rejected
 *   - real letters typed beyond completion → rejected (original `extraBad`)
 *   - punctuation at/after completion      → accepted & kept (grading
 *     ignores punctuation, same as the original input pipeline)
 */
export function validateKeystroke(expected, buffer, ch) {
  const candidate = String(buffer ?? '') + String(ch ?? '');
  const a = alignTyped(expected, candidate);
  const before = alignTyped(expected, String(buffer ?? ''));
  const rejected = (a.typedUsed < candidate.length && !a.complete) || a.extraBad;
  if (rejected) return { accepted: false, buffer, complete: before.complete };
  return { accepted: true, buffer: candidate, complete: a.complete, progress: a.typedUsed - before.typedUsed };
}

/**
 * Backspace over the buffer. Returns the next buffer value.
 * Trailing optional punctuation is never in the buffer (never
 * typed), so a plain slice matches the original behavior.
 */
export function backspaceBuffer(buffer) {
  return String(buffer ?? '').slice(0, -1);
}

/**
 * Build the tile list for a fill-blank answer.
 * Single-word blanks → letters; multi-word blanks → words.
 * Shuffle is deterministic-safe: short answers never render in
 * the exact expected order (that would give the answer away).
 * Returns array of string tiles.
 * (Pure helper — kept for the validation-parity test suite.)
 */
export function buildTiles(source, random = Math.random) {
  const src = String(source ?? '').trim();
  if (!src) return [];
  const multiWord = /\s/.test(src);
  const tiles = multiWord ? src.split(/\s+/) : Array.from(src);
  // Fisher–Yates on a copy
  const arr = [...tiles];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // never present the identity order for short tile sets
  const same = arr.length === tiles.length && arr.every((t, i) => t === tiles[i]);
  if (same && arr.length > 1) {
    [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
  }
  return arr;
}

/** The characters a word may additionally require (' or -). */
export function requiredKeyChars(expected) {
  const need = new Set();
  const chars = Array.from(String(expected ?? ''));
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (/[a-z0-9]/i.test(ch)) continue;
    if (isOptionalChar(ch, chars[i - 1], chars[i + 1])) continue;
    if (ch === "'") need.add("'");
    if (ch === '-') need.add('-');
    if (ch === ' ') need.add('space');
  }
  return need;
}

/* ============================================================
   Shared native-keyboard session field
   ============================================================ */

/**
 * Core builder shared by the dictation and fill-blank surfaces.
 * opts: {
 *   expected:      String  — the full expected text (unchanged content)
 *   ariaLabel:     String
 *   rootClass:     String  — class for the outer wrapper
 *   onChanged:     (value) => void
 *   onWrong:       () => void          (rejected letter)
 *   onWordLocked:  (index) => void     (a word just locked green)
 *   onComplete:    () => void          (text fully entered; fires once)
 *   onEnter:       () => void          (desktop Enter convenience)
 * }
 * Returns the internal handles used by both public factories.
 */
function createNativeSessionField(opts = {}) {
  const expected = String(opts.expected ?? '');
  const session = createWordSession({ sentence: expected });
  const segments = splitSegments(expected);
  const targetChars = Array.from(expected);

  let completed = false;
  let destroyed = false;

  /* ----- letter slots surface (no visible input element) ----- */
  const surface = el('div', { class: 'lw-typing-surface is-touch', dir: 'ltr' });
  const track = el('div', { class: 'lw-letter-track', 'aria-hidden': 'true' });
  surface.append(track);

  function renderSlots() {
    const views = session.wordsView();
    track.replaceChildren();
    let wordIdx = 0;
    for (const seg of segments) {
      if (seg.type === 'gap') {
        const prevLocked = wordIdx > 0 && views[wordIdx - 1] && views[wordIdx - 1].state === 'locked';
        for (let i = seg.start; i < seg.end; i += 1) {
          track.append(el('span', { class: `lw-word-gap ${prevLocked ? 'is-filled' : 'is-empty'}` }));
        }
        continue;
      }
      const view = views[wordIdx] || { state: 'empty', progress: 0, revealed: [] };
      const word = el('span', { class: `lw-word is-${view.state}` });
      let reqIdx = 0;
      for (let i = seg.start; i < seg.end; i += 1) {
        const expectedChar = targetChars[i] ?? '';
        if (isOptionalChar(expectedChar, targetChars[i - 1], targetChars[i + 1])) {
          const slot = el('span', {
            class: `lw-letter-slot is-punctuation ${view.state === 'locked' ? 'is-locked' : ''}`,
            text: expectedChar, // printed in place, never typed
          });
          word.append(slot);
          continue;
        }
        const pos = reqIdx;
        reqIdx += 1;
        let cls = 'lw-letter-slot';
        if (view.state === 'locked') cls += ' is-locked is-filled';
        else if (pos < view.progress) cls += view.revealed[pos] ? ' is-filled is-hint' : ' is-filled';
        else if (view.state === 'active' && pos === view.progress) cls += ' is-current';
        else cls += ' is-empty';
        const slot = el('span', { class: cls });
        if (view.state === 'locked' || pos < view.progress) {
          // the canonical letter appears (session stores expected chars)
          slot.textContent = expectedChar;
        }
        word.append(slot);
      }
      track.append(word);
      wordIdx += 1;
    }
    surface.classList.toggle('is-complete', completed);
  }

  /* ----- native phone keyboard (invisible input overlay) ----- */
  const nativeInput = el('input', {
    class: 'lw-native-input', type: 'text', inputmode: 'text',
    autocomplete: 'off', autocapitalize: 'none', autocorrect: 'off',
    spellcheck: 'false', 'aria-label': opts.ariaLabel || 'Type the answer',
  });
  nativeInput.setAttribute('enterkeyhint', 'done');
  surface.append(nativeInput);

  nativeInput.addEventListener('beforeinput', (e) => {
    if (destroyed || completed) { e.preventDefault(); return; }
    if (e.inputType === 'deleteContentBackward') {
      e.preventDefault(); removeLast(); return;
    }
    if (e.inputType === 'insertText' && e.data) {
      e.preventDefault();
      for (const ch of Array.from(e.data)) {
        if (/^[a-z]$/i.test(ch) || ch === "'" || ch === '-') placeLetter(ch.toLowerCase());
      }
    }
  });
  nativeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (typeof opts.onEnter === 'function') opts.onEnter(); }
  });
  surface.addEventListener('pointerdown', () => {
    if (!completed && !destroyed) nativeInput.focus({ preventScroll: true });
  });

  function placeLetter(ch) {
    if (destroyed || completed) return;
    const res = session.placeLetter(String(ch).toLowerCase());
    if (res.accepted) {
      soundCorrect();
      renderSlots();
      if (typeof opts.onChanged === 'function') opts.onChanged(session.getValue());
      if (res.wordLocked) {
        soundLock();
        if (typeof opts.onWordLocked === 'function') opts.onWordLocked(session.activeWordIndex());
        if (res.sessionComplete) {
          completed = true;
          renderSlots();
          soundComplete();
          if (typeof opts.onComplete === 'function') opts.onComplete();
        }
      }
    } else {
      soundWrong();
      shake();
      if (typeof opts.onWrong === 'function') opts.onWrong();
    }
  }

  /** Backspace for the ACTIVE word only (locked words are protected). */
  function removeLast() {
    if (destroyed) return;
    const r = session.removeLastLetter();
    if (!r.removed) { shake(); return; }
    soundErase();
    renderSlots();
    if (typeof opts.onChanged === 'function') opts.onChanged(session.getValue());
  }

  /**
   * Smart hint: reveal the next hidden letter of the active word.
   * Returns the exercise-state result ({revealed, letter...}).
   */
  function revealHint() {
    if (destroyed || completed) return { revealed: false, reason: 'complete' };
    const res = session.revealFirstLetter();
    if (res.revealed) {
      renderSlots();
      if (res.wordLocked) {
        soundLock();
        if (typeof opts.onWordLocked === 'function') opts.onWordLocked(session.activeWordIndex());
        if (res.sessionComplete) {
          completed = true;
          renderSlots();
          soundComplete();
          if (typeof opts.onComplete === 'function') opts.onComplete();
        }
      }
      if (typeof opts.onChanged === 'function') opts.onChanged(session.getValue());
    }
    return res;
  }

  function shake() {
    surface.classList.remove('lw-shake');
    void surface.offsetWidth; // restart animation
    surface.classList.add('lw-shake');
    window.setTimeout(() => surface.classList.remove('lw-shake'), 420);
  }

  /* ----- desktop physical keyboard (optional, never on mobile) ----- */
  function onPhysicalKey(e) {
    if (destroyed || e.target === nativeInput) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Enter') {
      if (typeof opts.onEnter === 'function') { e.preventDefault(); opts.onEnter(); }
      return;
    }
    if (e.key === 'Backspace') { e.preventDefault(); removeLast(); return; }
    if (/^[a-zA-Z]$/.test(e.key)) { placeLetter(e.key.toLowerCase()); return; }
    if (e.key === "'" || e.key === '-' || e.key === '\u2019') {
      placeLetter(e.key === '\u2019' ? "'" : e.key);
    }
  }
  document.addEventListener('keydown', onPhysicalKey);

  return {
    surface,
    nativeInput,
    session,
    getValue: () => session.getValue(),
    isComplete: () => completed || session.isComplete(),
    revealHint,
    shake,
    renderSlots,
    wordsView: () => session.wordsView(),
    activeWordIndex: () => session.activeWordIndex(),
    markCompleted() {
      completed = true;
      renderSlots();
    },
    resetValue(v) {
      session.reset();
      nativeInput.value = '';
      completed = false;
      surface.classList.remove('is-complete', 'is-locked');
      for (const ch of Array.from(String(v ?? ''))) {
        if (ch === ' ') continue;
        session.placeLetter(ch.toLowerCase());
      }
      renderSlots();
    },
    destroy() {
      destroyed = true;
      document.removeEventListener('keydown', onPhysicalKey);
      nativeInput.remove();
    },
  };
}

/* ============================================================
   1) Dictation field — listen-and-type & dialogue practice
   ============================================================ */

/**
 * Create the native-keyboard dictation field.
 * Returns { root, surface, getValue, setValue, isComplete, shake,
 *           revealHint, removeLast, wordsView, activeWordIndex,
 *           render, destroy }.
 */
export function createTouchTypingField(opts = {}) {
  const core = createNativeSessionField(opts);
  const root = el('div', { class: 'tt-field wt-field' }, [core.surface]);
  core.renderSlots();
  return {
    root,
    surface: core.surface,
    getValue: core.getValue,
    setValue: (v) => core.resetValue(v),
    isComplete: core.isComplete,
    shake: core.shake,
    render: () => core.renderSlots(),
    revealHint: core.revealHint,
    removeLast: () => {
      const r = core.session.removeLastLetter();
      if (r.removed) { core.renderSlots(); if (typeof opts.onChanged === 'function') opts.onChanged(core.getValue()); }
    },
    wordsView: core.wordsView,
    activeWordIndex: core.activeWordIndex,
    destroy: core.destroy,
  };
}

/* ============================================================
   2) Fill-blank field — engine-validated lock (no letter bank)
   ============================================================ */

/**
 * Create the native-keyboard fill-blank field.
 * Same slots/session/hints as the dictation surface, plus:
 *   lockCorrect()   — engine confirmed the answer → freeze green
 *   markIncorrect() — engine flagged the answer → red shake, stays
 *                     editable (never locks)
 * Returns { root, surface, getValue, isComplete, reset, setValue,
 *           lockCorrect, markIncorrect, shake, revealHint, destroy }.
 */
export function createNativeBlankField(opts = {}) {
  let frozen = false;
  const core = createNativeSessionField({
    ...opts,
    onComplete: () => {
      if (!frozen) core.markCompleted();
      if (typeof opts.onComplete === 'function') opts.onComplete();
    },
  });
  const root = el('div', { class: 'blank-field', dir: 'ltr' }, [core.surface]);

  return {
    root,
    surface: core.surface,
    getValue: core.getValue,
    isComplete: core.isComplete,
    setValue: (v) => { if (!frozen) core.resetValue(v); },
    reset: () => { if (!frozen) core.resetValue(''); },
    revealHint: core.revealHint,
    shake: core.shake,
    /** Engine confirmed the answer is correct → freeze green. */
    lockCorrect() {
      if (frozen) return;
      frozen = true;
      core.markCompleted();
      core.surface.classList.add('is-locked');
      core.nativeInput.disabled = true;
      soundLock();
    },
    /** Engine flagged the answer as wrong → red state (editable). */
    markIncorrect() {
      core.surface.classList.remove('is-wrong');
      void core.surface.offsetWidth;
      core.surface.classList.add('is-wrong');
      window.setTimeout(() => core.surface.classList.remove('is-wrong'), 600);
      core.shake();
    },
    destroy: core.destroy,
  };
}

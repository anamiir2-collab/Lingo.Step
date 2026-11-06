# LingoStep

LingoStep is a complete English learning app for Arabic speakers: structured lessons organized by level, interactive exercises of all kinds, clear Arabic explanations for every word and sentence, listening and pronunciation practice with real everyday phrases, progress tracking, and a premium mobile-first design built for Android phones first.

**v10.0.0 — premium mobile redesign (same engine, same content, better app):**

- **Mobile-first premium interface** — deep-blue → turquoise brand, clean white surfaces, soft gradients, rounded cards, subtle shadows and consistent spacing. Every screen is designed for one-handed phone use (no desktop layout squeezed onto a phone).
- **Home screen that matters** — welcome greeting, daily streak, XP and current level up front, today's plan with a goal ring, a Daily challenge built from your real progress, quick access to Dialogues / Vocabulary / Revision / Achievements, and your learning paths.
- **Floating bottom navigation** — Home · Sections · Vocabulary · Progress · More, all reachable with a thumb; the tab bar steps aside during focused practice.
- **Keyboard-free exercises** — letter tiles, word chips and option cards only; the system keyboard can never appear during a lesson.
- **Smart first-letter hints** — the Hint button reveals only the first letter of the current incomplete word (in turquoise). Repeated presses never reveal the whole word, and never show the Arabic meaning or the answer.
- **Word-by-word locking** — a correctly completed word turns green and is locked for the whole attempt: it cannot be deleted, edited, replaced or moved. Incorrect words never lock.
- **No accidental erasing** — there is no clear-all button at all; backspace only ever touches the current word.
- **Restart needs confirmation** — restarting an exercise shows an explicit dialog; saved lesson progress is never lost.
- **Skipping requires an answer** — a skipped question earns no points and a different question from the same lesson must be answered before continuing.
- **Fast and light** — a slim 4-file CSS system (tokens → base → practice → dialogues), lazy lesson loading, service-worker offline cache.

- 252 lessons across 11 sections (A1 → C1), 14,000+ practice sentences — every exercise, answer and achievement preserved
- Progress, streaks and XP stored locally (IndexedDB) with v2 backup/restore
- Full Arabic RTL and English LTR support with a light/dark/system theme

## Run, test, validate

```bash
npm start              # dev server on http://localhost:8080
npm test               # 17 test suites
npm run validate       # project structure + lessons + duplicates
npm run validate:lessons
npm run build          # web bundle into www/ (for Capacitor)
```

## Install on an Android phone

**Option 1 — APK:** download `LingoStep-v10.0.0-debug.apk` from the GitHub Actions artifacts of the **Android APK** workflow (or a GitHub Release), then open it on the phone (allow *Install unknown apps* for your browser or file manager). The APK is built on CI from a **temporarily generated** Android project — no Android/Gradle/Kotlin/Java files are committed to this repository.

**Option 2 — PWA:** open the site in Chrome and use *Install app* (*Add to Home screen*). Works offline after the lessons load once.

See `docs/ANDROID-APK.md` for local build instructions.

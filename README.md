# 📱 LingoStep

A complete English learning app built for Arabic speakers — structured lessons, interactive exercises, clear Arabic explanations, and a premium mobile-first experience designed for Android phones first.

<p align="left">
  <img src="https://img.shields.io/badge/version-10.0.0-blue" alt="Version 10.0.0">
  <img src="https://img.shields.io/badge/levels-A1%20%E2%86%92%20C1-turquoise" alt="CEFR levels A1 to C1">
  <img src="https://img.shields.io/badge/lessons-252-green" alt="252 lessons">
  <img src="https://img.shields.io/badge/sentences-14%2C000%2B-orange" alt="14,000+ sentences">
  <img src="https://img.shields.io/badge/platform-Android%20first-brightgreen" alt="Android first">
  <img src="https://img.shields.io/badge/license-see%20LICENSE-lightgrey" alt="License">
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [What's New in v10.0.0](#-whats-new-in-v1000)
- [Feature Breakdown](#-feature-breakdown)
- [Content at a Glance](#-content-at-a-glance)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Install on Android](#-install-on-android)
- [Project Structure](#-project-structure)
- [Data & Storage](#-data--storage)
- [Theming & Internationalization](#-theming--internationalization)
- [Testing & Validation](#-testing--validation)
- [Building for Production](#️-building-for-production)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 Overview

LingoStep is a full-featured English learning application designed specifically for Arabic speakers. It combines the structure of a formal language course with the engagement of a modern mobile app, giving learners a clear path from beginner to advanced while keeping explanations accessible in their native language.

The application is mobile-first and optimized for comfortable one-handed phone use. It runs as a Progressive Web App (PWA) and supports Android packaging through the project's CI workflow.

### Core pillars

- 📚 Structured lessons organized by CEFR level (A1 → C1).
- 🎯 Interactive exercises with a consistent answer experience.
- 🗣️ Clear Arabic explanations for words and sentences.
- 🎧 Listening and pronunciation practice using everyday phrases.
- 📊 Progress tracking with streaks, XP, and achievements stored locally.
- 📱 Responsive mobile-first design, with Android phones as the primary target.

---

## 🆕 What's New in v10.0.0

**Premium mobile redesign — same learning engine, same content, improved experience.**

Version 10 focuses on improving the interface and interaction experience while preserving the existing lesson content, exercises, answers, progress system, and achievements.

### 🎨 Mobile-first premium interface

- Deep-blue and turquoise brand identity with elegant gold-accented card borders.
- Clean surfaces, rounded cards, subtle shadows, and consistent spacing.
- Improved card layouts, typography, icons, and touch targets.
- Responsive layouts designed for phone screens rather than desktop layouts squeezed onto mobile.

### 🏠 Improved home screen

- Welcome greeting, daily streak, XP, and current level.
- Today's learning plan and goal progress.
- Daily challenge based on learner progress.
- Quick access to Dialogues, Vocabulary, Revision, and Achievements.
- Clear access to learning paths.

### 🧭 Floating bottom navigation

Home · Sections · Vocabulary · Progress · More.

The navigation is positioned for convenient thumb access and steps aside during focused practice when appropriate.

### ⌨️ Native mobile keyboard

- The custom colored letter bank is replaced by the device's normal system keyboard in typing exercises.
- Tapping the answer area opens the native phone keyboard.
- Existing answer slots, checking logic, and word-building behavior are preserved.
- Correctly completed words remain locked and cannot be deleted.
- Backspace only affects unfinished input.

### 💡 Smart first-letter hints

- The Hint button reveals only the first letter of the current incomplete word.
- The hint is visually distinguished from the remaining answer.
- It does not reveal the full Arabic sentence or give away the complete answer.

### 🔒 Word-by-word locking

- A correctly completed word becomes locked for the current attempt.
- Locked words cannot be deleted, edited, replaced, or moved.
- Incorrect and incomplete words remain editable.

### 🛡️ Protection against accidental mistakes

- No clear-all action that can erase completed words.
- Backspace only affects the active, unfinished answer.
- Restart requires confirmation.
- Skipping does not bypass the learning requirement: the learner must answer a question before continuing, according to the exercise rules.

### 🎧 Compact audio controls

- Related audio actions are grouped in one compact card.
- Controls are arranged horizontally where screen width allows.
- Buttons remain touch-friendly and adapt to narrow screens.
- Existing playback and speed controls are preserved.

### 🗂️ Dedicated More pages

- More is organized as a navigation hub with clear category cards.
- Categories open dedicated full pages instead of expanding accordion/dropdown panels.
- Unnecessary arrows are removed from category entries.
- Each subpage provides a clear way back to More.
- Existing settings and actions remain available.

### ⚡ Fast and lightweight

- Four-file CSS system (tokens → base → practice → dialogues).
- Lazy lesson loading.
- Service-worker offline cache.

### 🌍 Full bilingual support

- Arabic RTL and English LTR layouts.
- Light, dark, and system theme options.

---

## ✨ Feature Breakdown

### Learning experience

| Feature | Description |
|---|---|
| Level-based structure | 11 sections spanning A1 to C1 |
| 252 lessons | Vocabulary, sentences, and practical usage |
| 14,000+ practice sentences | Varied exercises for continued practice |
| Arabic explanations | Explanations for words and sentences |
| Everyday phrases | Listening and pronunciation practice |
| Daily Challenge | A challenge connected to learning progress |

### Interaction design

| Feature | Description |
|---|---|
| Native keyboard input | Uses the phone's system keyboard for typing exercises |
| First-letter hints | Progressive hints without revealing the full answer |
| Word locking | Correctly completed words remain locked |
| Safe backspace | Deletion does not affect completed words |
| Confirmed restart | Helps prevent accidental restarts |
| Answer-gated skipping | Skipping cannot be used to bypass required answers |

### Progress & motivation

| Feature | Description |
|---|---|
| XP system | Earn experience points through exercises |
| Daily streaks | Track consecutive learning days |
| Achievements | Unlock badges as you progress |
| Goal progress | Visualize daily learning completion |
| Local persistence | Keep progress on the learner's device |

### Platform & performance

| Feature | Description |
|---|---|
| PWA support | Installable from a supported browser |
| Android packaging | APK build supported through CI |
| Lazy loading | Lessons load when needed |
| Service worker | Offline caching for repeat visits |
| Lightweight CSS | Four-file CSS system |

---

## 📦 Content at a Glance

| Item | Count |
|---|---:|
| Lessons | 252 |
| Sections | 11 |
| CEFR levels | A1 → C1 |
| Practice sentences | 14,000+ |
| CSS files | 4 |
| Test suites | 17 |

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML, CSS, and JavaScript.
- **Styling:** Custom four-file CSS system (tokens → base → practice → dialogues).
- **Storage:** IndexedDB for progress, streaks, XP, and backups.
- **Offline:** Service Worker (`sw.js`).
- **Packaging:** Capacitor for Android APK builds through CI.
- **PWA:** Web app manifest for installability.
- **Testing:** Test suites and validation scripts.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended).
- npm.

### Installation

```bash
# Clone the repository
git clone https://github.com/anamiir2-collab/Lingo.Step.git
cd Lingo.Step

# Install dependencies
npm install

# Start the development server
npm start
```

The development server runs at [http://localhost:8080](http://localhost:8080).

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the development server on port 8080 |
| `npm test` | Run the test suites |
| `npm run validate` | Validate project structure, lessons, and duplicates |
| `npm run validate:lessons` | Validate lesson content |
| `npm run build` | Build the web bundle into `www/` for Capacitor |

---

## 📲 Install on Android

### Option 1 — Android APK

1. Open the repository's **Actions** tab.
2. Select a successful run of the Android APK workflow.
3. Download the APK artifact, if that workflow run provides one, or use an available GitHub Release.
4. Open the APK on your Android phone.
5. If prompted, allow installation from your browser or file manager.

The Android project may be generated during CI. Check the workflow and [docs/ANDROID-APK.md](docs/ANDROID-APK.md) for the current build process. Do not assume an APK artifact or release exists until it is published.

### Option 2 — Install as a PWA

1. Open the deployed application in Chrome on Android.
2. Choose **Install app** or **Add to Home screen**.
3. Launch LingoStep from the home screen.

Offline availability depends on the service-worker cache and which content has already been loaded.

---

## 🗂️ Project Structure

```text
Lingo.Step/
├── .github/workflows/    # CI workflows
├── assets/               # Static assets
├── css/                  # Application styles
├── data/                 # Application data
├── dialogues/            # Dialogue content
├── docs/                 # Project documentation
├── icons/                # App icons
├── js/                   # Application logic
├── lessons/              # Lesson files
├── scripts/              # Helper scripts
├── tests/                # Test suites
├── index.html            # Application entry point
├── manifest.json         # PWA manifest
├── sw.js                 # Service worker
├── capacitor.config.json # Capacitor configuration
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
```

---

## 💾 Data & Storage

LingoStep stores learner data locally on the device.

- IndexedDB is used for learning progress and related learner data.
- Backup and restore tools allow learners to export and re-import supported data.
- No account is required for the core local learning experience.
- Offline use depends on previously cached application resources and lesson content.

---

## 🎨 Theming & Internationalization

| Feature | Support |
|---|---|
| Arabic RTL | Right-to-left layout |
| English LTR | Left-to-right layout |
| Light theme | Bright, clean surfaces |
| Dark theme | Comfortable low-light appearance |
| System theme | Follows the device preference |
| Brand identity | Deep blue, turquoise, and refined gold accents |

---

## 🧪 Testing & Validation

Run the project's checks before submitting changes:

```bash
npm test
npm run validate
npm run validate:lessons
```

Validation tooling is intended to check:

- Project structure integrity.
- Lesson content.
- Duplicate lesson or sentence content.

Always review the command output and resolve failures before merging changes.

---

## 🏗️ Building for Production

### Web build

```bash
npm run build
```

The build output is written to `www/` for the configured Capacitor workflow.

### Android APK

The repository can use its Android APK CI workflow to package the web application. Refer to the current workflow configuration and [docs/ANDROID-APK.md](docs/ANDROID-APK.md) for the exact build requirements.

---


## 🔄 Continuous Integration & Deployment

GitHub Actions automates validation, testing, deployment, and Android packaging.

| Workflow | Trigger | What it does |
|---|---|---|
| [Deploy to GitHub Pages](.github/workflows/deploy.yml) | Push to `main` or manual run | Runs project validation and tests, then deploys the site to GitHub Pages |
| [Android APK](.github/workflows/android.yml) | Push to `main`, pull request, or manual run | Runs validation and tests, builds the web app, generates a temporary Capacitor Android project, and produces a debug APK |
| [Validate](.github/workflows/validate.yml) | Pull request or manual run | Runs the project validation gate and test suite |

**Android build environment:** CI uses Node.js 20 and Temurin JDK 21. The generated Android project is created in the workflow workspace; Gradle, Kotlin, and Java project files are not maintained as committed application source.

After a successful main-branch Android workflow run, the workflow is configured to publish the `LingoStep-v10.0.0-debug.apk` artifact and a GitHub Release tagged `v10.0.0`. Check the latest workflow run or Releases page for the currently available build.

- [View workflow runs](../../actions)
- [View releases](../../releases)
- [Android build guide](docs/ANDROID-APK.md)

## 🔐 Privacy & Local-First Data

LingoStep is designed around local learning data:

- Core learning progress is stored on the learner's device.
- Backup and restore gives learners a way to move supported progress data.
- The service worker caches same-origin app resources and lesson content for offline use.
- The service worker does not cache cross-origin requests or POST responses.
- No account is required for the core local learning experience.

Review the source code and browser/device permissions to understand the exact behavior of any optional platform feature.

## 🔔 Device Features

The project includes Capacitor integrations for supported native capabilities, including:

- Local notifications.
- Text-to-speech.
- Native application and status-bar integration.

Availability and behavior depend on the platform, browser, installed app build, and granted device permissions. Web browsers may expose different capabilities from the Android APK.

## 📱 PWA Details

The web app manifest configures LingoStep as an installable, standalone application:

- Standalone display mode.
- Portrait-primary orientation.
- App icons in standard and maskable sizes.
- Education and productivity categories.
- Theme and background colors for the installed experience.

For the best mobile experience, use an up-to-date version of Chrome on Android and install the app from its supported install prompt.

## 🧭 Repository Links

- [Source code](https://github.com/anamiir2-collab/Lingo.Step)
- [Issues and bug reports](https://github.com/anamiir2-collab/Lingo.Step/issues)
- [Pull requests](https://github.com/anamiir2-collab/Lingo.Step/pulls)
- [GitHub Actions](https://github.com/anamiir2-collab/Lingo.Step/actions)
- [Releases](https://github.com/anamiir2-collab/Lingo.Step/releases)
- [License: MIT](LICENSE)


## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a branch for your feature or fix.
3. Keep changes consistent with the existing architecture and mobile-first design.
4. Preserve existing lessons, exercises, learner progress, and application behavior.
5. Run the validators and tests:

   ```bash
   npm run validate
   npm test
   ```

6. Open a pull request with a clear description of the changes.

---

## 📄 License

See the [LICENSE](LICENSE) file for usage terms.

---

<div align="center">

Built with ❤️ for Arabic-speaking English learners.

⭐ If you find LingoStep useful, consider starring the repository!

</div>

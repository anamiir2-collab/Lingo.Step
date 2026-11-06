# 📱 LingoStep

**A complete English-learning app built for Arabic speakers.** Learn through structured lessons, interactive exercises, clear Arabic explanations, listening practice, and a premium mobile-first experience designed primarily for Android phones.

<p align="left">
  <img src="https://img.shields.io/badge/version-10.0.0-blue" alt="Version 10.0.0">
  <img src="https://img.shields.io/badge/levels-A1%20%E2%86%92%20C1-turquoise" alt="CEFR levels A1 to C1">
  <img src="https://img.shields.io/badge/lessons-252-green" alt="252 lessons">
  <img src="https://img.shields.io/badge/sentences-14%2C000%2B-orange" alt="14,000+ practice sentences">
  <img src="https://img.shields.io/badge/platform-Android%20first-brightgreen" alt="Android first">
  <img src="https://img.shields.io/badge/license-see%20LICENSE-lightgrey" alt="See license">
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [What's New in v10.0.0](#-whats-new-in-v1000)
- [Features](#-features)
- [Content at a Glance](#-content-at-a-glance)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Install on Android](#-install-on-android)
- [Project Structure](#-project-structure)
- [Data, Privacy & Offline Use](#-data-privacy--offline-use)
- [Theming & Languages](#-theming--languages)
- [Testing & Validation](#-testing--validation)
- [CI/CD & Deployment](#-cicd--deployment)
- [Building for Production](#-building-for-production)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 Overview

LingoStep is a full-featured English-learning application created especially for Arabic speakers. It combines a structured language course with interactive practice to help learners progress from beginner to advanced levels while keeping explanations accessible in Arabic.

The app is designed mobile-first, with responsive screens and touch-friendly controls for everyday phone use. It can run as an installable Progressive Web App (PWA), and the repository includes a CI workflow for generating an Android APK with Capacitor.

### Core pillars

- 📚 Structured lessons across CEFR levels A1 to C1.
- 🎯 Interactive exercises with clear answer feedback.
- 🗣️ Arabic explanations for vocabulary and sentences.
- 🎧 Listening and pronunciation practice with everyday phrases.
- 📊 Learning progress, XP, streaks, and achievements.
- 📱 A responsive mobile-first interface, with Android as the primary target.
- 💾 Local progress storage and backup/restore support.
- 🌐 Arabic RTL and English LTR interface support.

---

## 🆕 What's New in v10.0.0

**A refreshed mobile experience while preserving the learning content and core learning engine.**

### 🎨 Mobile-first visual design

- A deep-blue and turquoise brand identity with refined golden accents.
- Consistent cards with elegant gold borders, rounded corners, and subtle shadows.
- Improved spacing, typography, icons, and touch targets.
- Responsive layouts designed for phone screens first.
- Light, dark, and system appearance options.

### 🏠 Home and navigation

- A clearer home screen for daily learning and progress.
- Quick access to lessons, vocabulary, dialogues, revision, and achievements.
- Floating bottom navigation: Home, Sections, Vocabulary, Progress, and More.
- Navigation designed for comfortable thumb access during mobile use.

### 🗂️ Dedicated pages in More

- More works as a navigation hub with clear category cards.
- Selecting a category opens a dedicated full page rather than expanding an accordion.
- Unnecessary category arrows are removed.
- Each category page includes a clear way to return to More.
- Existing settings and actions are retained.

### ⌨️ Native mobile keyboard

- Typing exercises use the device's normal system keyboard instead of the custom colored letter bank.
- Tapping the answer area opens the native phone keyboard.
- Existing answer slots, validation, and exercise logic are retained.
- Completed correct words stay locked; backspace only affects unfinished input.

### 💡 First-letter hints

- Hints reveal the first letter of the current incomplete word.
- The revealed letter is visually distinguished.
- Hints do not expose the entire Arabic sentence or reveal the full answer.

### 🔒 Word locking and safer practice

- Correctly completed words are locked for the current attempt.
- Locked words cannot be deleted, edited, replaced, or moved.
- Incorrect or incomplete words remain editable.
- Restart actions use confirmation to help prevent accidental resets.
- Skipping follows the exercise's answer requirement and does not provide points for an unanswered skipped question.

### 🎧 Compact audio controls

- Related audio controls are grouped together in a compact card.
- Controls are arranged horizontally when space allows.
- Button sizes and spacing adapt to narrow phone screens.
- Existing playback and speed functionality is preserved.

### ⚡ Performance and offline support

- Lessons are loaded on demand.
- A service worker caches the application shell and lesson resources.
- Previously cached resources can remain available offline.
- The settings area provides an option to download lesson content for offline use.

---

## ✨ Features

### Learning experience

| Feature | Description |
|---|---|
| CEFR learning path | 11 sections spanning A1 to C1 |
| Structured lessons | 252 lessons covering vocabulary, sentences, and practical usage |
| Practice content | More than 14,000 practice sentences and exercises |
| Arabic explanations | Accessible explanations for English words and sentences |
| Listening practice | Audio-based listening and pronunciation activities |
| Daily learning | Daily goals and challenge-oriented practice |

### Exercise interaction

| Feature | Description |
|---|---|
| Native keyboard | Uses the phone's system keyboard for typing activities |
| First-letter hints | Reveals a limited hint for the active incomplete word |
| Word locking | Correctly completed words remain locked |
| Safe deletion | Backspace does not remove locked words |
| Answer validation | Checks learner input using the existing exercise rules |
| Protected restart | Confirmation helps prevent accidental restarts |
| Skip rules | Skipping does not bypass required answering |

### Progress and motivation

| Feature | Description |
|---|---|
| XP | Earn experience through learning activities |
| Daily streaks | Track consecutive days of practice |
| Achievements | Unlock achievements as progress is made |
| Progress tracking | Review learning activity and completion |
| Backup and restore | Export and restore supported learner data |

### Platform and usability

| Feature | Description |
|---|---|
| PWA | Installable from supported browsers |
| Android APK | Build workflow available through GitHub Actions |
| Offline cache | Service worker caches supported app resources |
| Lazy loading | Lesson resources load when needed |
| Responsive UI | Layouts adapt to mobile and larger screens |
| Bilingual UI | Arabic RTL and English LTR |

---

## 📦 Content at a Glance

| Item | Count |
|---|---:|
| Lessons | 252 |
| Sections | 11 |
| CEFR levels | A1 → C1 |
| Practice sentences | 14,000+ |
| Test suites | 17 |

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML, CSS, and JavaScript.
- **Styling:** Custom CSS, including theme, base, mobile, dialogue, and audio styles.
- **Storage:** IndexedDB and browser storage for supported learner data.
- **Offline:** Service Worker (`sw.js`).
- **PWA:** Web app manifest (`manifest.json`).
- **Android packaging:** Capacitor, built through GitHub Actions.
- **Testing:** Node.js validation scripts and test suites.
- **Hosting:** GitHub Pages deployment workflow.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or a compatible supported version.
- npm.

### Installation

```bash
# Clone the repository
git clone https://github.com/anamiir2-collab/Lingo.Step.git

# Open the project folder
cd Lingo.Step

# Install dependencies
npm install

# Start the development server
npm start
```

The development server is configured to run at:

[http://localhost:8080](http://localhost:8080)

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the local development server |
| `npm test` | Run the project's test suite |
| `npm run validate` | Validate project structure, lessons, and duplicates |
| `npm run validate:lessons` | Validate lesson content |
| `npm run build` | Build the web bundle into `www/` |

Run the validation and test commands before submitting changes.

---

## 📲 Install on Android

### Option 1 — Android APK

1. Open the repository's [Actions](https://github.com/anamiir2-collab/Lingo.Step/actions) tab.
2. Open a successful **Android APK** workflow run.
3. Download the `LingoStep-debug-apk` artifact.
4. Extract the APK if it is downloaded as an archive.
5. Open the APK on your Android phone.
6. If Android asks, allow installation from the browser or file manager you used.

The Android workflow creates a temporary Capacitor Android project in CI, builds a debug APK, and uploads it as a workflow artifact. A GitHub Release may also be published by the workflow on qualifying main-branch pushes.

### Option 2 — Install as a PWA

1. Open the deployed LingoStep website in Chrome on Android.
2. Select **Install app** or **Add to Home screen**.
3. Launch LingoStep from your home screen.

Offline access depends on which app resources and lessons have been cached or downloaded.

For further Android build details, see [docs/ANDROID-APK.md](docs/ANDROID-APK.md).

---

## 🗂️ Project Structure

```text
Lingo.Step/
├── .github/
│   └── workflows/       # CI, validation, deployment, and Android build workflows
├── assets/              # Static assets
├── css/                 # Application styles
├── data/                # Lesson and application data
├── dialogues/           # Dialogue content
├── docs/                # Documentation
├── icons/               # App icons
├── js/                  # Application logic
├── lessons/             # Lesson files
├── scripts/             # Validation and helper scripts
├── tests/               # Automated test suites
├── index.html           # Application entry point
├── manifest.json        # PWA manifest
├── sw.js                # Service worker
├── capacitor.config.json# Capacitor configuration
├── package.json         # Project scripts and dependencies
├── package-lock.json
├── README.md
└── LICENSE
```

---

## 💾 Data, Privacy & Offline Use

LingoStep is designed to keep core learning data on the learner's device.

- Supported progress and learning data are stored locally using browser storage technologies, including IndexedDB where applicable.
- Backup and restore tools support exporting and importing learner data.
- The core learning experience does not require creating an account.
- The service worker caches same-origin application resources and lesson content.
- Cross-origin requests and non-GET requests are not handled by the service worker cache.
- Offline access is available for resources that have already been cached or downloaded.

---

## 🎨 Theming & Languages

| Feature | Support |
|---|---|
| Arabic | Full RTL interface support |
| English | Full LTR interface support |
| Light theme | Bright surfaces with brand accents |
| Dark theme | Dark appearance for low-light use |
| System theme | Follows the device appearance setting |
| Brand colors | Deep blue, turquoise, and refined gold accents |

---

## 🧪 Testing & Validation

The repository includes automated test suites and validation scripts.

```bash
# Run automated tests
npm test

# Validate project structure and lesson data
npm run validate

# Validate lesson content only
npm run validate:lessons
```

Validation tooling checks project structure, lesson content, and duplicate content. Review the command output and resolve failures before merging changes.

---

## 🔁 CI/CD & Deployment

GitHub Actions workflows automate validation, testing, website deployment, and Android packaging.

| Workflow | Purpose |
|---|---|
| [Deploy to GitHub Pages](.github/workflows/deploy.yml) | Validates and tests the project, then deploys the website |
| [Android APK](.github/workflows/android.yml) | Tests the project, builds the web app, generates a temporary Android project, and packages a debug APK |
| [Validate](.github/workflows/validate.yml) | Runs validation and automated tests |

The Android workflow uses Node.js 20 and Temurin JDK 21. The generated Android project is created during CI rather than maintained as committed Gradle, Kotlin, or Java source files.

Useful links:

- [GitHub Actions runs](https://github.com/anamiir2-collab/Lingo.Step/actions)
- [GitHub Releases](https://github.com/anamiir2-collab/Lingo.Step/releases)
- [Open an issue](https://github.com/anamiir2-collab/Lingo.Step/issues)

---

## 🏗️ Building for Production

### Web application

```bash
npm run build
```

The configured build outputs the web bundle to `www/`, ready for the Capacitor workflow.

### Android APK

The Android APK workflow performs the following steps:

1. Installs the project dependencies.
2. Builds the web application.
3. Generates a temporary Capacitor Android project.
4. Syncs the web assets with Capacitor.
5. Builds the debug APK.
6. Uploads the APK as a GitHub Actions artifact.

See [docs/ANDROID-APK.md](docs/ANDROID-APK.md) for additional instructions.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch for your feature or fix.
3. Keep the mobile-first design and existing project architecture consistent.
4. Preserve existing lessons, exercises, progress, and learning behavior.
5. Run validation and tests:

   ```bash
   npm run validate
   npm test
   ```

6. Open a pull request with a clear description of your changes.

Please avoid unnecessary dependencies, duplicate files, and changes that remove existing learning content or functionality.

---

## 📄 License

See the [LICENSE](LICENSE) file for the applicable license and usage terms.

---

<div align="center">

**Built with ❤️ for Arabic-speaking English learners.**

⭐ If you find LingoStep useful, consider starring the repository!

</div>

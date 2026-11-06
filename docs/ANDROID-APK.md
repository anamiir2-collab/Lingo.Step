# Building the LingoStep Android APK (Capacitor 8)

The repository intentionally contains **no `android/` directory** — no Gradle,
Kotlin or Java files are committed. The Android project is generated on demand
in a temporary location and only the finished APK is delivered.

- CI: the **Android APK** workflow (`.github/workflows/android.yml`) runs the
  validation gates, builds the web bundle, runs `npx cap add android` +
  `npx cap sync android` in the CI workspace, assembles the debug APK and
  uploads it as an artifact (and publishes a Release on main).
- Locally: follow the steps below.

## Prerequisites

- Node.js ≥ 18
- JDK 21 (Temurin recommended)
- Android SDK: command-line tools with platform 35/36 + build-tools (or Android Studio)

## Local build (temporary project, nothing committed)

```bash
npm install                 # installs Capacitor 8 + plugins
npm run android:prepare     # web bundle → www/, then generates android/ + syncs it
cd android
./gradlew assembleDebug     # → app/build/outputs/apk/debug/app-debug.apk (installable)
```

On Linux without Android Studio:

```bash
export ANDROID_HOME=~/android-sdk          # cmdline-tools + platforms;android-35 + build-tools
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

`android/` is ignored by `.gitignore`, so the generated project never reaches
the repository. Delete it any time after taking the APK (`rm -rf android`).

## Install the APK on a phone

1. Copy `app-debug.apk` to the phone.
2. Allow *Install unknown apps* for your file manager/browser.
3. Open the APK and install. LingoStep works offline after the lessons load once.

The PWA installation (Chrome → *Install app*) keeps working as an alternative.

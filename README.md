# RPG Stepper

A step tracker for iOS and Android with RPG elements — your real-world steps power up your character.

Steps are read from Apple HealthKit / Google Fit, synced through Firebase, and turned into progress you can watch level up.

## Tech stack

- **Expo / React Native** with TypeScript and expo-router
- **NativeWind** (Tailwind CSS for React Native)
- **TanStack Query** for server state
- **Firebase** for auth and data
- **HealthKit / Google Fit** via expo-sensors and native health modules

## Running locally

```bash
yarn install
yarn ios     # or: yarn android
```

Requires an Expo dev client and a Firebase project configured in `firebase.config.js`.

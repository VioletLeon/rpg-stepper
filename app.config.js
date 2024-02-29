import 'dotenv/config';

export default {
  expo: {
    name: 'rpg-stepper',
    slug: 'rpg-stepper',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'myapp',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      googleServicesFile: './GoogleService-Info.plist',
      bundleIdentifier: 'rpgstepper.android'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'rpgstepper.android',
      googleServicesFile: './google-services.json',
    },
    web: {
      favicon: './assets/favicon.png',
      output: 'server',
    },
    plugins: ['expo-router', 'react-native-health'],
    extra: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
      googleSignIn: {
        iosClientId: process.env.GOOGLE_SIGNIN_IOS_CLIENT_ID,
        webClientId: process.env.GOOGLE_SIGNIN_WEB_CLIENT_ID,
      },
    },
  },
};

// '@react-native-google-signin/google-signin'

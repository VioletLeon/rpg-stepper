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
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
      output: 'server',
    },
    plugins: ['expo-router'],
  },
};

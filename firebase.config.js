// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBEQclynG09XMRaH2hCZTxKy8TQmzcy9yo',
  authDomain: 'rpg-stepper.firebaseapp.com',
  projectId: 'rpg-stepper',
  storageBucket: 'rpg-stepper.appspot.com',
  messagingSenderId: '644378735917',
  appId: '1:644378735917:web:53512d6387fdf6af124fa4',
  measurementId: 'G-446VRF4TN0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Use initializeAuth instead of getAuth for custom persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };

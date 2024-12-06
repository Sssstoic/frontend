// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAMMQJzzMHX7050MlEFd4H2TSopr0_hnnA',
  authDomain: 'kplat-bb3ad.firebaseapp.com',
  projectId: 'kplat-bb3ad',
  storageBucket: 'kplat-bb3ad.firebasestorage.app',
  messagingSenderId: '548091370496',
  appId: '1:548091370496:web:a367ea12496440dc45cce5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Create providers for Google and Facebook
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };

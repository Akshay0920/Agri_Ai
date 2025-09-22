// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcC002HV2NHh3VccQyK2Bnh36bNeouvxM",
  authDomain: "agri-app-6ed81.firebaseapp.com",
  projectId: "agri-app-6ed81",
  storageBucket: "agri-app-6ed81.firebasestorage.app",
  messagingSenderId: "1001616074461",
  appId: "1:1001616074461:web:de23d6e6e315578fdc5d34",
  measurementId: "G-QKV4GSVEK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkIME_9l8jcvwOVj2dCbCTJOEHDOXkc88",
  authDomain: "mindmate-123.firebaseapp.com",
  projectId: "mindmate-123",
  storageBucket: "mindmate-123.firebasestorage.app",
  messagingSenderId: "346556796718",
  appId: "1:346556796718:web:dab2d248eecbde52baf4bf",
  measurementId: "G-LETJCPR1QX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

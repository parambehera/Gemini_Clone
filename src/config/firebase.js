
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "geminiclone-48a5f.firebaseapp.com",
  projectId: "geminiclone-48a5f",
  storageBucket: "geminiclone-48a5f.firebasestorage.app",
  messagingSenderId: "2973082035",
  appId: "1:2973082035:web:46d82a5360669bae1b2bc6",
  measurementId: "G-1DRG3MMMHP"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
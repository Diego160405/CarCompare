// Učitavanje potrebnih funkcija
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Firebase Konfiguracija
const firebaseConfig = {
  apiKey: "AIzaSyDeFlIRCVVjNGau-F7Z4Q_bUuNJh_hq5iw",
  authDomain: "carcompare-706f5.firebaseapp.com",
  projectId: "carcompare-706f5",
  storageBucket: "carcompare-706f5.firebasestorage.app",
  messagingSenderId: "177164564559",
  appId: "1:177164564559:web:faa385bb727b3a0532523a"
};

// Firebase inicijalizacija
const app = initializeApp(firebaseConfig);

// Inicijalizacija servisa
const auth = getAuth(app); // auth instanca
const db = getFirestore(app); // database instanca

// Izvoz servisa
export { auth, db };

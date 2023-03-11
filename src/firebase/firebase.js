// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA2b5dLNmgb9vpsRhEaQCRTioGioMoijlo",
  authDomain: "enoch-177d6.firebaseapp.com",
  projectId: "enoch-177d6",
  storageBucket: "enoch-177d6.appspot.com",
  messagingSenderId: "1054761900182",
  appId: "1:1054761900182:web:124ebcc5e0f9ac9bf58ab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

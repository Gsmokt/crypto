// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKdwvUAIB64iDvSkGUlPcFWDCjsBQ9-i0",
  authDomain: "cryptotraker-df190.firebaseapp.com",
  projectId: "cryptotraker-df190",
  storageBucket: "cryptotraker-df190.appspot.com",
  messagingSenderId: "993538147853",
  appId: "1:993538147853:web:20d79c77a85b408a717744"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
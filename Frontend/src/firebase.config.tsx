// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRxT3mhdhzbnDjPb_A9_RPaeS5CGRe8ko",
  authDomain: "homestylehaven.firebaseapp.com",
  projectId: "homestylehaven",
  storageBucket: "homestylehaven.appspot.com",
  messagingSenderId: "927849058457",
  appId: "1:927849058457:web:5bdaeb568f7f6adb83e808",
  measurementId: "G-VLJ2KP9V5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage
export default app
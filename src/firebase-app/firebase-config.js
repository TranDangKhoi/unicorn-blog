// Paste the SDK codes in here
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCz7uHmgFgHSGDmCf-ww35oH8JJMJ3OZU4",
  authDomain: "blog-project-firebase-30183.firebaseapp.com",
  projectId: "blog-project-firebase-30183",
  storageBucket: "blog-project-firebase-30183.appspot.com",
  messagingSenderId: "1014262468498",
  appId: "1:1014262468498:web:711cfa4aa8feff5e203b4b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZlUDORqKWO1BztO2Sdf_wqqkUp2Qa8dU",
  authDomain: "react-markdown-notes-ec5d5.firebaseapp.com",
  projectId: "react-markdown-notes-ec5d5",
  storageBucket: "react-markdown-notes-ec5d5.appspot.com",
  messagingSenderId: "267426142219",
  appId: "1:267426142219:web:1ddfec710ef6f1d6760f0e",
  measurementId: "G-HDQ4X2FJSN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notescollection = collection(db);

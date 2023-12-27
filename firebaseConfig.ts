import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyApT4EvL45jzwAMeWMinTQFFCKFiR8CBQs",
    authDomain: "todolistapp-d3034.firebaseapp.com",
    projectId: "todolistapp-d3034",
    storageBucket: "todolistapp-d3034.appspot.com",
    messagingSenderId: "1047032987526",
    appId: "1:1047032987526:web:8948fc12b55e6517c63607"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

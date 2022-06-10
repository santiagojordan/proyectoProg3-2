import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCwuZsf-i9MvCuzV_v4MXJUPypgQErE7fg",
    authDomain: "practica-firebase-be3b5.firebaseapp.com",
    projectId: "practica-firebase-be3b5",
    storageBucket: "practica-firebase-be3b5.appspot.com",
    messagingSenderId: "663815682634",
    appId: "1:663815682634:web:1c364a0e87fe28587384b3"
  };
  
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

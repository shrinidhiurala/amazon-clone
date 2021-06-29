import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA05IAIssuKskfdYMEI_bD-zeZEghPP9So",
  authDomain: "clone-c087c.firebaseapp.com",
  projectId: "clone-c087c",
  storageBucket: "clone-c087c.appspot.com",
  messagingSenderId: "505627769271",
  appId: "1:505627769271:web:714803e9c585bbc0eb9032"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
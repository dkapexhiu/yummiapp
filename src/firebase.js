import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyBBLtowINagLFahEUJQiQGnFF-TjHvcuaU",
    authDomain: "yummipizza-123.firebaseapp.com",
    databaseURL: "https://yummipizza-123.firebaseio.com",
    projectId: "yummipizza-123",
    storageBucket: "yummipizza-123.appspot.com",
    messagingSenderId: "164333989850",
    appId: "1:164333989850:web:d63a8dd63f3f872d901ae3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
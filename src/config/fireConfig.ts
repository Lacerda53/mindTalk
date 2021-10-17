import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

export const fireConfig = {
    apiKey: "AIzaSyCgqE4nyEu25TObuq5X0IFpX6-stV8XLq0",
    authDomain: "mind-talk.firebaseapp.com",
    projectId: "mind-talk",
    storageBucket: "mind-talk.appspot.com",
    messagingSenderId: "195658943310",
    appId: "1:195658943310:web:472c4fa123d20f4e73ec1f"
};

firebase.initializeApp(fireConfig);

const auth = firebase.auth();

const database = firebase.database();

const firestore = firebase.firestore();

const storage = firebase.storage();

export type DatabaseFirebase = firebase.database.Database;

export { firebase, auth, firestore, database, storage }
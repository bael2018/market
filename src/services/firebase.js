import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCUvwZ6ZYut4Iz7IrUjr3lPo4xDTMF9__Y",
    authDomain: "market-daa4b.firebaseapp.com",
    databaseURL: "https://market-daa4b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "market-daa4b",
    storageBucket: "market-daa4b.appspot.com",
    messagingSenderId: "72329938136",
    appId: "1:72329938136:web:bc3391611af9e3b19483ad"
};

export const fire = firebase
export const provider = new firebase.auth.GoogleAuthProvider()
fire.initializeApp(firebaseConfig)
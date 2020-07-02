import firebase from 'firebase'

require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBokt0iOe3Y_LRvQk7T_83zg-d5iDkHQy0",
    authDomain: "todo-6624b.firebaseapp.com",
    databaseURL: "https://todo-6624b.firebaseio.com",
    projectId: "todo-6624b",
    storageBucket: "todo-6624b.appspot.com",
    messagingSenderId: "930785139536",
    appId: "1:930785139536:web:be3c18fcb3d93683616a55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
export default db
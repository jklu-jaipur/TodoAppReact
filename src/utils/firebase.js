import firebase from "firebase";

// import firestore
import "firebase/firestore";
import "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA4OK0gJOHcCrZcFGJzbWnWtG1e8jUf8cg",
  authDomain: "todo-app-react-1.firebaseapp.com",
  projectId: "todo-app-react-1",
  storageBucket: "todo-app-react-1.appspot.com",
  messagingSenderId: "401816575189",
  appId: "1:401816575189:web:1aab35c3713885bc5e165c",
  measurementId: "G-18G2SZPQE4",
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Required firebase modules
export const auth = firebase.auth;
export const firestore = firebase.firestore;

// export firebas object
export default firebase;

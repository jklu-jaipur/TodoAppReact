import firebase from 'firebase';

// Import the modules that you want to use

// Import firestore module
import "firebase/firestore";
// import authentication module
import "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf15Cr4OTLHWDk6xQDMXsFQ3_tqWpWoTc",
    authDomain: "todotest-1dc3a.firebaseapp.com",
    projectId: "todotest-1dc3a",
    storageBucket: "todotest-1dc3a.appspot.com",
    messagingSenderId: "981952092003",
    appId: "1:981952092003:web:82b9f6f8a66f5c49aca556",
    measurementId: "G-W1Q712MHXR"
};

//  Initialize firebase
firebase.initializeApp(firebaseConfig);

// export the authentication module
export const auth = firebase.auth;

// export the firestore module
export const firestore = firebase.firestore;

// export firebase object by default
export default firebase;
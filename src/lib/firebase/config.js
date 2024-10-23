// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6LutMSjx9WAo53DrcJTywSeCXDH_lOwI",
    authDomain: "ebbp-72d51.firebaseapp.com",
    projectId: "ebbp-72d51",
    storageBucket: "ebbp-72d51.appspot.com",
    messagingSenderId: "94984142560",
    appId: "1:94984142560:web:a6706c721f91c509cc5a85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fbdb = getFirestore(app)

export { app, auth, fbdb }
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBZzi0n6VYA92MiUXnvzVz5Wct0ja1vvjo',
    authDomain: 'netflix-clone-39940.firebaseapp.com',
    projectId: 'netflix-clone-39940',
    storageBucket: 'netflix-clone-39940.appspot.com',
    messagingSenderId: '12931601475',
    appId: '1:12931601475:web:501e5fb8e628ddc316b0f6',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };

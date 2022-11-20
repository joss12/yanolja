// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdiu1wj-Eo_ipAds1O6KL_GNbYVv3610g",
  authDomain: "yanolja-4cf34.firebaseapp.com",
  projectId: "yanolja-4cf34",
  storageBucket: "yanolja-4cf34.appspot.com",
  messagingSenderId: "728679412907",
  appId: "1:728679412907:web:d5c919dd6cbd48ccfe33ee"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()
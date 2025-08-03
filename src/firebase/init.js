
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUO5fPSCX6D3RKol6peo5Ai2iP0HBSIbM",
  authDomain: "lab-7-35523107-juncheng-peng.firebaseapp.com",
  projectId: "lab-7-35523107-juncheng-peng",
  storageBucket: "lab-7-35523107-juncheng-peng.firebasestorage.app",
  messagingSenderId: "622241880827",
  appId: "1:622241880827:web:a06ca8e217656ab21c6e5e"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBM842ZTZp15sMTeEz0AzKCAY4Nzegkqc",
  authDomain: "semanatec-bb1c0.firebaseapp.com",
  databaseURL: "https://semanatec-bb1c0-default-rtdb.firebaseio.com",
  projectId: "semanatec-bb1c0",
  storageBucket: "semanatec-bb1c0.appspot.com",
  messagingSenderId: "262286240758",
  appId: "1:262286240758:web:68ccdb211a56305d6235d7",
  measurementId: "G-QP7EMP2B64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);   

export const db = getFirestore(app);
export const rtdb = getDatabase(app);    
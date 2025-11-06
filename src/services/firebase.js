// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmfJS-4Ax4dbGX03z-ZP1wNzIVpTcT510",
  authDomain: "fireclouds-softwaresolution.firebaseapp.com",
  projectId: "fireclouds-softwaresolution",
  storageBucket: "fireclouds-softwaresolution.firebasestorage.app",
  messagingSenderId: "602033098289",
  appId: "1:602033098289:web:448f4e68581ddccd2acf10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
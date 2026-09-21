import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5Bmv646AIT3c-uqvEkJP3ubduXnVPHnE",
  authDomain: "task-p4-cb682.firebaseapp.com",
  projectId: "task-p4-cb682",
  storageBucket: "task-p4-cb682.firebasestorage.app",
  messagingSenderId: "413959452650",
  appId: "1:413959452650:web:ff5c0f6ed51817866c2493"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
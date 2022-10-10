import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBbeRRiFZcg9Sy5CNMRZ_2fzG777PlmXY",
  authDomain: "watches-shop-f641f.firebaseapp.com",
  projectId: "watches-shop-f641f",
  storageBucket: "watches-shop-f641f.appspot.com",
  messagingSenderId: "57877801719",
  appId: "1:57877801719:web:3b2bba07ecd923542601f2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

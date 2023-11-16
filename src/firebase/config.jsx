import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDxhsqXvTKVjmAvvdwaB13T9ur5fOua1eA",
  authDomain: "food-delivery-ab4f3.firebaseapp.com",
  projectId: "food-delivery-ab4f3",
  storageBucket: "food-delivery-ab4f3.appspot.com",
  messagingSenderId: "1026776646683",
  appId: "1:1026776646683:web:2bcbfbab4af744c40424be"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
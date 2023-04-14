import * as firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/react-native";
// import "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3XOvuLw97XSYRYjn6H18Z5HgYRnlShfo",
  authDomain: "native-photoposts.firebaseapp.com",
  projectId: "native-photoposts",
  storageBucket: "native-photoposts.appspot.com",
  messagingSenderId: "596940990114",
  appId: "1:596940990114:web:ca92bf9a259e69a0dc99fb",
  measurementId: "G-GB0D8BG9H6",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

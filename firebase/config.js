import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/react-native";
// import "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJvP_R_EsFB0Uan9HKZ2MCqerOjEU9jJE",
  authDomain: "react-native-postphoto.firebaseapp.com",
  projectId: "react-native-postphoto",
  storageBucket: "react-native-postphoto.appspot.com",
  messagingSenderId: "373666767938",
  appId: "1:373666767938:web:46ba832067b34ea22ef9db",
  measurementId: "G-ZDNBPPVMDR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

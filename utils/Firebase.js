import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginmaxx-9bd8b.firebaseapp.com",
  projectId: "loginmaxx-9bd8b",
  storageBucket: "loginmaxx-9bd8b.firebasestorage.app",
  messagingSenderId: "193618098916",
  appId: "1:193618098916:web:69304217baade17c84caf1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth, provider }
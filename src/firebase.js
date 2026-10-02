import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB4ykW0wAxpMVgOT8bE9hu-1zcyak1i3P4",
  authDomain: "fatma-aydin.firebaseapp.com",
  projectId: "fatma-aydin",
  storageBucket: "fatma-aydin.firebasestorage.app",
  messagingSenderId: "757530408566",
  appId: "1:757530408566:web:8cdba80488575fe3019157",
  measurementId: "G-2D9Y1RJXED"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

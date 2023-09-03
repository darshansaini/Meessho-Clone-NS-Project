import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDFrvdWhN_YfLtcHhdDZnwLn8nHBrxHxmg",
  authDomain: "meesho-clone-68199.firebaseapp.com",
  projectId: "meesho-clone-68199",
  storageBucket: "meesho-clone-68199.appspot.com",
  messagingSenderId: "1040289686446",
  appId: "1:1040289686446:web:215f1ef9dbdd5c7f51de3f",
  measurementId: "G-1TG1V9DHK5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
import {app} from "./firebase.js";
import {getAuth, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword, 
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
        onAuthStateChanged } from "firebase/auth";
const auth = getAuth(app);


export async function registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    }
    catch(error) {
      console.log(error);
      return null;
    }
  }

  export async function loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    }
    catch(error) {
      console.log(error);
      return null;
    }
  }

export async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        return user;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}
export async function logoutUser() {
    try {
        await signOut(auth);
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}

export async function getAuthStatus(cb) {
   let unsubscribe = () => console.log("unsubscribed");
    try {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          cb(user);
        } else {
          cb(null);
        }
      });
      return unsubscribe;
    }
    catch(error) {
        console.log(error);
    }
}
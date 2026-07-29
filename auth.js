import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7ynpgm9BCNuQhmNtfunCvK8rebZ3lZcM",
  authDomain: "pool-master-hydraulic.firebaseapp.com",
  projectId: "pool-master-hydraulic",
  storageBucket: "pool-master-hydraulic.firebasestorage.app",
  messagingSenderId: "674715767328",
  appId: "1:674715767328:web:cb3b67e0c949216cb0a245"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Fonctions exportées pour être utilisées dans index.html
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const verifyEmail = (user) => {
  return sendEmailVerification(user);
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Pour une utilisation dans app.html
export const checkAuth = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

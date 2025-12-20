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

window.login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(c => {
      if (!c.user.emailVerified) {
        error.innerText = "Veuillez vérifier votre email";
        signOut(auth);
        return;
      }
      location.href = "app.html";
    })
    .catch(e => error.innerText = e.message);
};

window.register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(c => {
      sendEmailVerification(c.user);
      alert("Compte créé. Vérifiez votre email.");
    })
    .catch(e => error.innerText = e.message);
};
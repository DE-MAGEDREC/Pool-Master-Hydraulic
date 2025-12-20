// 🔹 IMPORT MODULES FIREBASE V10
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔹 CONFIGURATION FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyA7ynpgm9BCNuQhmNtfunCvK8rebZ3lZcM",
  authDomain: "pool-master-hydraulic.firebaseapp.com",
  projectId: "pool-master-hydraulic",
  storageBucket: "pool-master-hydraulic.firebasestorage.app",
  messagingSenderId: "674715767328",
  appId: "1:674715767328:web:cb3b67e0c949216cb0a245",
  measurementId: "G-G0GJFMMVK4"
};

// 🔹 INITIALISATION FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 FONCTION DE CONNEXION
window.login = function() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  if (!email || !pass) {
    errorEl.innerText = "Veuillez entrer votre email et votre mot de passe.";
    return;
  }

  signInWithEmailAndPassword(auth, email, pass)
    .then(userCredential => {
      // Vérification de l'email
      if (!userCredential.user.emailVerified) {
        errorEl.innerText = "Veuillez vérifier votre email avant de vous connecter.";
        signOut(auth); 
        return;
      }

      // Connexion réussie
      localStorage.setItem("auth", "ok");
      window.location.href = "app.html";
    })
    .catch(err => {
      errorEl.innerText = err.message;
    });
};

// 🔹 FONCTION DE CREATION DE COMPTE
window.register = function() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  if (!email || !pass) {
    errorEl.innerText = "Veuillez entrer votre email et votre mot de passe.";
    return;
  }

  createUserWithEmailAndPassword(auth, email, pass)
    .then(userCredential => {
      // Envoi email de vérification
      sendEmailVerification(userCredential.user)
        .then(() => {
          alert("Compte créé ! Vérifiez votre email avant de vous connecter.");
        });
    })
    .catch(err => {
      errorEl.innerText = err.message;
    });
};

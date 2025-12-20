// ====== INITIALISATION FIREBASE ======
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuration Firebase de ton projet
const firebaseConfig = {
  apiKey: "AIzaSyA7ynpgm9BCNuQhmNtfunCvK8rebZ3lZcM",
  authDomain: "pool-master-hydraulic.firebaseapp.com",
  projectId: "pool-master-hydraulic",
  storageBucket: "pool-master-hydraulic.firebasestorage.app",
  messagingSenderId: "674715767328",
  appId: "1:674715767328:web:cb3b67e0c949216cb0a245"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ====== PROTECTION DE LA PAGE ======
onAuthStateChanged(auth, user => {
  if (!user || !user.emailVerified) {
    // Redirige vers la page de login si non connecté ou non vérifié
    window.location.href = "index.html";
  }
});

// ====== DECONNEXION ======
window.logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html"; // Retour à la page de login
    })
    .catch((error) => {
      console.error("Erreur lors de la déconnexion :", error);
      alert("Erreur lors de la déconnexion. Veuillez réessayer.");
    });
};

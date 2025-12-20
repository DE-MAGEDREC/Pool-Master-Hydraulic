import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

// Rediriger si utilisateur non connecté ou email non vérifié
onAuthStateChanged(auth, user => {
  if (!user || !user.emailVerified) {
    window.location.href = "index.html";
  }
});

// Déconnexion
window.logout = () => signOut(auth).then(() => location.href="index.html");

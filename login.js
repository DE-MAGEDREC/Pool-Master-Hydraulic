import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

loginBtn.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(()=>location.href="app.html")
    .catch(()=>error.innerText="Connexion impossible");
};

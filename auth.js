// Connexion
function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(user => {
      if (!user.user.emailVerified) {
        document.getElementById("error").innerText =
          "Veuillez vérifier votre email avant de vous connecter.";
        auth.signOut();
        return;
      }

      localStorage.setItem("auth", "ok");
      window.location.href = "app.html";
    })
    .catch(err => {
      document.getElementById("error").innerText = err.message;
    });
}

// Création de compte
function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(user => {
      user.user.sendEmailVerification();
      alert("Compte créé ! Vérifiez votre email avant de vous connecter.");
    })
    .catch(err => {
      document.getElementById("error").innerText = err.message;
    });
}

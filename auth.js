const USERS = {
  "client1": "Hydro2025",
  "client2": "PiscinePro",
  "admin": "PMH-Admin"
};

function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("password").value;

  if (USERS[user] && USERS[user] === pass) {
    localStorage.setItem("auth", "ok");
    localStorage.setItem("user", user);
    window.location.href = "app.html";
  } else {
    document.getElementById("error").innerText =
      "Identifiant ou mot de passe incorrect";
  }
}

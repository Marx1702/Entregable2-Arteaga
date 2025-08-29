// Cargar usuarios desde localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];

function loginUser(userFound) { 
  if (userFound) {
    alert(`Bienvenido, ${userFound.nombre}`);
    console.log(`Bienvenido, ${userFound.nombre}`);
    localStorage.setItem("activeUser", JSON.stringify(userFound));
    window.location.href = "index.html";
  } else {
    alert("Correo o contraseña incorrectos.");
    console.log("Correo o contraseña incorrectos.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const userFound = users.find(user => user.email === email && user.password === password);
    loginUser(userFound);
  });
});

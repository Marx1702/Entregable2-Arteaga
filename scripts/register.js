// Carga el array users desde localStorage o crea uno vacío
let users = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    registerUser(nombre, email, password);
  });
});

function registerUser(nombre, email, password) {
  // Validar que el email no exista en users
  const exists = users.some(user => user.email === email);

  if (exists) {
    alert("El correo ya está registrado.");
    console.log("Intento de registro con correo existente:", email);
    return;
  }

  // Crear nuevo usuario con id incremental
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    nombre,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuario registrado con éxito.");
  console.log("Usuario registrado con éxito:", newUser);
  window.location.href = "login.html";
}

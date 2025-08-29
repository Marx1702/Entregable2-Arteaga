document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const authLink = document.getElementById("authLink");

  // --- Menú hamburguesa ---
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  
  const getActiveUser = () => {
    try { return JSON.parse(localStorage.getItem("activeUser")); }
    catch { return null; }
  };

  const findLink = (href) =>
    navLinks ? navLinks.querySelector(`a[href="${href}"]`) : null;

  const removeExistingTurnos = () => {
    if (!navLinks) return;
    const existing = navLinks.querySelectorAll('a[href="turnos.html"]');
    existing.forEach(a => {
      const li = a.closest("li");
      (li || a).remove();
    });
  }; //Si no hay una sesion iniciada la opcion de turnos del navbar no se muestra

  const createLiLink = (href, text) => {
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.href = href;
    a.textContent = text;
    li.appendChild(a);
    return li;
  };

  const insertAfter = (newNode, referenceNode) => {
    if (!referenceNode || !referenceNode.parentNode) return;
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }; 

  // --- Lógica de sesión ---
  const user = getActiveUser();

  // Siempre limpiar cualquier "Turnos" que venga del HTML
  removeExistingTurnos();

  if (!authLink) return;

  if (user) {
    // Cambiar "Iniciar sesión" -> "Cerrar sesión"
    authLink.textContent = "Cerrar sesión";
    authLink.href = "#";
    authLink.classList.remove("login-button");
    // Evitar listeners duplicados reemplazando el nodo
    const clone = authLink.cloneNode(true);
    authLink.parentNode.replaceChild(clone, authLink);
    clone.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("activeUser");
      window.location.href = "index.html";
    }, { once: true });

    // Insertar "Turnos" justo después de "Servicios"
    const serviciosAnchor = findLink("services.html");
    const liTurnos = createLiLink("turnos.html", "Turnos");
    if (serviciosAnchor) {
      insertAfter(liTurnos, serviciosAnchor.closest("li") || serviciosAnchor);
    } else if (navLinks) {
      navLinks.insertBefore(liTurnos, clone.closest("li") || clone);
    }

  } else {
    // Usuario no logueado: asegurar "Iniciar sesión"
    const clone = authLink.cloneNode(true);
    clone.textContent = "Iniciar sesión";
    clone.href = "login.html";
    clone.classList.add("login-button");
    authLink.parentNode.replaceChild(clone, authLink);

    // Sin sesión: garantizar que no exista "Turnos"
    removeExistingTurnos();
  }
});

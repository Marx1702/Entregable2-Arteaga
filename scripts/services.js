// /scripts/services.js
document.addEventListener("DOMContentLoaded", () => {
  // Catálogo 
  const services = [
    { id: 1, name: "Mecánica General", description: "Reparaciones y mantenimiento de vehículos.", image: "/assets/images/services/mecanica general.jpg" },
    { id: 2, name: "Cambio de Aceite", description: "Servicio rápido y eficiente de lubricación.", image: "/assets/images/services/cambio de aceite.jpg" },
    { id: 3, name: "Alineación y Balanceo", description: "Optimización para mayor seguridad en ruta.", image: "/assets/images/services/alineacion y balanceo.jpg" }
  ];

  // Guardamos catálogo para reutilizar en turnos.js (si no existe)
  if (!localStorage.getItem("services_catalog")) {
    localStorage.setItem("services_catalog", JSON.stringify(services));
  }

  const list = document.getElementById("services-list");
  if (!list) return;

  // Render de tarjetas
  list.innerHTML = "";
  services.forEach(s => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.setAttribute("tabindex", "0"); // accesible con teclado

    card.innerHTML = `
      <img src="${s.image}" alt="${s.name}">
      <div class="service-card__body">
        <h2>${s.name}</h2>
        <p>${s.description}</p>
        <button class="btn btn-primary service-card__btn" data-id="${s.id}">Reservar</button>
      </div>
    `;

    // Click en tarjeta o botón → guardar selección y navegar
    const goToTurnos = () => {
      localStorage.setItem("selectedServiceId", String(s.id));
      window.location.href = "turnos.html";
    };

    // Toda la tarjeta clickeable
    card.addEventListener("click", (e) => {
      // Evitamos doble navegación si se hace click en el botón (que también navega)
      if (e.target.closest(".service-card__btn")) return;
      goToTurnos();
    });
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") goToTurnos();
    });

    // Botón "Reservar"
    card.querySelector(".service-card__btn").addEventListener("click", (e) => {
      e.stopPropagation();
      goToTurnos();
    });

    list.appendChild(card);
  });
});

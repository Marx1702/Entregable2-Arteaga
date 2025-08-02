const services = [
  { id: 1, nombre: "Cambio de aceite", demora: 30 },
  { id: 2, nombre: "Alineación", demora: 45 },
  { id: 3, nombre: "Balanceo", demora: 40 }
];

document.addEventListener("DOMContentLoaded", () => {
  const btnServicios = document.getElementById("verServicios");

  if (btnServicios) {
    btnServicios.addEventListener("click", (e) => {
      e.preventDefault(); // evita que salte al anchor #servicios

      console.log("Servicios disponibles:");
      for (let i = 0; i < services.length; i++) {
        console.log(
          `ID: ${services[i].id}, Nombre: ${services[i].nombre}, Demora: ${services[i].demora} minutos`
        );
      }
    });
  }
});

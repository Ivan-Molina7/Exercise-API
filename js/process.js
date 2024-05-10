export const cardMusculos = document.querySelectorAll(".gmuscular-card");

export const levelSection = document.querySelector(".level-section");
export const gmusculares = document.querySelector(".gmusculares");

export const loader = document.querySelector(".loader");

cardMusculos.forEach((card) => {
  card.addEventListener("click", () => {
    // Mostrar el loader
    loader.style.display = "block";

    // Ocultar gmusculares después de mostrar el loader
    gmusculares.style.display = "none";

    // Simular una carga ficticia (por ejemplo, un retraso de 1 segundo)
    setTimeout(() => {
      // Ocultar el loader
      loader.style.display = "none";

      // Mostrar levelSection después de que el loader se haya ocultado
      levelSection.style.display = "block";
    }, 500); // 1000 milisegundos = 1 segundo (ajusta este valor según sea necesario)
  });
});

let acc = document.querySelectorAll(".faq__button");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let pannel = this.nextElementSibling;

    if (pannel.style.display === "block") {
      pannel.style.display = "none";
    } else {
      pannel.style.display = "block";
    }

    let icon = this.querySelector(".fa-chevron-down");
    if (this.classList.contains("active")) {
      icon.style.transform = "rotate(180deg)";
    } else {
      icon.style.transform = "rotate(0deg)";
    }

    // Cerrar los demás paneles abiertos
    let otherPanels = document.querySelectorAll(".pannel");
    for (let j = 0; j < otherPanels.length; j++) {
      if (otherPanels[j] !== pannel) {
        otherPanels[j].style.display = "none";
      }
    }

    // Cerrar los demás iconos rotados
    let otherIcons = document.querySelectorAll(".fa-chevron-down");
    for (let k = 0; k < otherIcons.length; k++) {
      if (otherIcons[k] !== icon) {
        otherIcons[k].style.transform = "rotate(0deg)";
      }
    }
  });
}
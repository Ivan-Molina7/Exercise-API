import {
  cargarEjerciciosAPI,
  getLocalStorage,
  setLocalStorage,
  filterParamMuscle2,
  filterParamMuscle3,
} from "./utils.js";
import { loader, levelSection, gmusculares } from "./process.js";

// Selectores de elementos del DOM
const espalda = document.querySelector(".espalda");
const pecho = document.querySelector(".pecho");
const brazos = document.querySelector(".brazos");
const pierna = document.querySelector(".pierna");
const beginner = document.querySelector(".beginner");
const intermediate = document.querySelector(".intermediate");
const reroll = document.querySelector(".btn-reroll");
const favoritosShow = document.querySelectorAll(".mostrarFavorite");
const btnFavoritosShow = document.querySelector(".btn-mostrarFavorite");
const modalBackground = document.querySelector(".modal__background");
const cardContainer = document.querySelector(".card__container");
const cardsMain = document.querySelector(".cards__main");

// Variables globales
let paramMuscle1, paramMuscle2, paramMuscle3, paramMuscle4;
let exerciseAmount = 0;
let resultParamMuscle1Filter = [];
let resultParamMuscle2Filter = [];
let resultParamMuscle3Filter = [];
let resultParamMuscle4Filter = [];
let routine = [];
const keyRutinas = "rutinasGuardadas";

pecho.addEventListener("click", () => {
  paramMuscle1 = "chest";
  paramMuscle2 = "shoulders";
});

brazos.addEventListener("click", () => {
  paramMuscle1 = "upper arms";
  paramMuscle2 = "upper arms";
});

espalda.addEventListener("click", () => {
  paramMuscle1 = "back";
  paramMuscle2 = "back";
});

pierna.addEventListener("click", () => {
  paramMuscle1 = "upper legs";
  paramMuscle2 = "hamstrings";
  paramMuscle3 = "glutes";
  paramMuscle4 = "lower legs";
});

beginner.addEventListener("click", () => {
  exerciseAmount = 4;
  if (paramMuscle4) {
    cargarEjerciciosPierna();
  } else if (paramMuscle2 == "shoulders") {
    cargarEjerciciosPecho();
  } else {
    cargarEjercicios();
  }
});

intermediate.addEventListener("click", () => {
  exerciseAmount = 6;

  if (paramMuscle4) {
    cargarEjerciciosPierna();
  } else if (paramMuscle2 == "shoulders" && exerciseAmount == 6) {
    cargarEjerciciosPecho();
  } else {
    cargarEjercicios();
  }
});

reroll.addEventListener("click", () => {
  rutinaAleatoria();
});

favoritosShow.forEach((btn) => {
  btn.addEventListener("click", () => {
    const rutinasGuardadas = getLocalStorage(keyRutinas) || [];
    mostrarFavoritos(rutinasGuardadas);
  });
});

btnFavoritosShow.addEventListener("click", () => {
  const rutinasGuardadas = getLocalStorage(keyRutinas) || [];
  mostrarFavoritos(rutinasGuardadas);
});

function randomExercises(array, numCant) {
  let exercisesPerMuscle;

  if (array != undefined) {
    if (paramMuscle4 && exerciseAmount == 6) {
      console.log("Entre a la función");
      let contador = 0;
      while (contador < numCant) {
        const exerciseIndex = Math.floor(Math.random() * array.length);
        routine.push(array[exerciseIndex]);
        array.splice(exerciseIndex, 1);
        contador++;
      }
    } else if (paramMuscle2 == "shoulders" && exerciseAmount == 6) {
      let contador = 0;

      while (contador < numCant) {
        const exerciseIndex = Math.floor(Math.random() * array.length);
        console.log(array[exerciseIndex]);
        routine.push(array[exerciseIndex]);
        array.splice(exerciseIndex, 1);

        contador++;
      }
    } else if (
      paramMuscle2 &&
      paramMuscle2 != "shoulders" &&
      paramMuscle2 != "back" &&
      paramMuscle2 != "upper arms" &&
      exerciseAmount == 4
    ) {
      exercisesPerMuscle = exerciseAmount / 4;
      console.log("Funciono 1");
      //Selecciona 2 ejercicios aleatorios
      for (let i = 0; i < exercisesPerMuscle; i++) {
        const exerciseIndex = Math.floor(Math.random() * array.length);
        routine.push(array[exerciseIndex]);
        array.splice(exerciseIndex, 1); //Elimina el ejercicio seleccionado para evitar duplicados
      }
    } else if (paramMuscle2) {
      exercisesPerMuscle = exerciseAmount / 2;
      // Selecciona 2 ejercicios aleatorios
      for (let i = 0; i < exercisesPerMuscle; i++) {
        const exerciseIndex = Math.floor(Math.random() * array.length);
        routine.push(array[exerciseIndex]);
        array.splice(exerciseIndex, 1); // Elimina el ejercicio seleccionado para evitar duplicados
      }
    } else {
      exercisesPerMuscle = exerciseAmount;
      console.log("Pecho beginner");
      // Selecciona 2 ejercicios aleatorios
      for (let i = 0; i < exercisesPerMuscle; i++) {
        const exerciseIndex = Math.floor(Math.random() * array.length);
        routine.push(array[exerciseIndex]);
        array.splice(exerciseIndex, 1); // Elimina el ejercicio seleccionado para evitar duplicados
      }
    }
  }
}

const cargarEjercicios = async () => {
  routine = [];
  cardContainer.innerHTML = ``;

  try {
    const resultParamMuscle = await cargarEjerciciosAPI(paramMuscle1);

    if (resultParamMuscle && resultParamMuscle.length > 0) {
      if (paramMuscle1 === "upper arms") {
        resultParamMuscle1Filter = filterParamMuscle3(
          resultParamMuscle,
          "barbell",
          "cable",
          "biceps"
        );
        resultParamMuscle2Filter = filterParamMuscle3(
          resultParamMuscle,
          "barbell",
          "cable",
          "triceps"
        );
      } else if (paramMuscle1 === "back") {
        resultParamMuscle1Filter = filterParamMuscle3(
          resultParamMuscle,
          "barbell",
          "cable",
          "upper back"
        );
        resultParamMuscle2Filter = filterParamMuscle3(
          resultParamMuscle,
          "barbell",
          "cable",
          "lats"
        );
      } else {
        console.log("Hubo un error y no sabemos que paso");
      }
    } else {
      console.error(
        "No se encontraron ejercicios para el grupo muscular: ",
        paramMuscle1
      );
    }
  } catch (error) {
    console.error("Error al cargar ejercicios:", error);
  }

  randomExercises(resultParamMuscle1Filter);
  randomExercises(resultParamMuscle2Filter);
  mostrarEjercicios(routine);
};

const cargarEjerciciosPierna = async () => {
  try {
    const resultParamMuscle = await cargarEjerciciosAPI(paramMuscle1);

    if (resultParamMuscle && resultParamMuscle.length > 0) {
      if (paramMuscle1 === "upper legs") {
        resultParamMuscle1Filter = filterParamMuscle3(
          resultParamMuscle,
          "barbell",
          "cable",
          "quads"
        );
        resultParamMuscle2Filter = resultParamMuscle.filter(
          (ejercicio) => ejercicio.target === "hamstrings"
        );

        resultParamMuscle3Filter = filterParamMuscle3(
          resultParamMuscle,
          "barbell",
          "cable",
          "glutes"
        );

        try {
          const resultParamMuscle4 = await cargarEjerciciosAPI(paramMuscle4);

          if (resultParamMuscle && resultParamMuscle.length > 0) {
            resultParamMuscle4Filter = filterParamMuscle3(
              resultParamMuscle4,
              "barbell",
              "cable",
              "calves"
            );
          } else if (respuesta.status === 401) {
            console.log("Error de credenciales");
          } else if (respuesta.status === 404) {
            console.log("No existe");
          } else {
            console.log("Hubo un error y no sabemos que paso");
          }
        } catch (error) {
          console.error("Error al cargar ejercicios:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error al cargar ejercicios:", error);
  }

  randomExercises(resultParamMuscle1Filter, 2);
  randomExercises(resultParamMuscle2Filter, 2);
  randomExercises(resultParamMuscle3Filter, 1);
  randomExercises(resultParamMuscle4Filter, 1);
  mostrarEjercicios(routine);
};

const cargarEjerciciosPecho = async () => {
  try {
    const resultParamMuscle = await cargarEjerciciosAPI(paramMuscle1);

    if (resultParamMuscle && resultParamMuscle.length > 0) {
      if (paramMuscle1 === "chest") {
        resultParamMuscle1Filter = filterParamMuscle2(
          resultParamMuscle,
          "barbell",
          "cable"
        );
      }
    }
  } catch (error) {
    console.error("Error al cargar ejercicios:", error);
  }

  try {
    const resultParamMuscle2 = await cargarEjerciciosAPI(paramMuscle2);

    if (resultParamMuscle2 && resultParamMuscle2.length > 0) {
      resultParamMuscle2Filter = filterParamMuscle2(
        resultParamMuscle2,
        "barbell",
        "cable"
      );
    } else if (respuesta.status === 401) {
      console.log("Error de credenciales");
    } else if (respuesta.status === 404) {
      console.log("No existe");
    } else {
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    console.error("Error al cargar ejercicios:", error);
  }

  if (exerciseAmount == 6) {
    randomExercises(resultParamMuscle1Filter, 4);
    randomExercises(resultParamMuscle2Filter, 2);
    mostrarEjercicios(routine);
  } else {
    randomExercises(resultParamMuscle1Filter, 2);
    randomExercises(resultParamMuscle2Filter, 2);
    mostrarEjercicios(routine);
  }
};

function rutinaAleatoria() {
  routine = [];
  cardContainer.innerHTML = ``;

  if (paramMuscle4) {
    randomExercises(resultParamMuscle1Filter, 2);
    randomExercises(resultParamMuscle2Filter, 2);
    randomExercises(resultParamMuscle3Filter, 1);
    randomExercises(resultParamMuscle4Filter, 1);

    mostrarEjercicios(routine);
  } else if (paramMuscle2 == "shoulders" && exerciseAmount == 6) {
    // console.log("Funciona el pecho random");
    randomExercises(resultParamMuscle1Filter, 4);
    randomExercises(resultParamMuscle2Filter, 2);
    mostrarEjercicios(routine);
  } else {
    randomExercises(resultParamMuscle1Filter);
    randomExercises(resultParamMuscle2Filter);
    mostrarEjercicios(routine);
  }
}
function mostrarEjercicios(array) {
  loader.style.display = "block";
  cardsMain.style.display = "none";
  levelSection.style.display = "none";

  setTimeout(() => {
    loader.style.display = "none";
    cardsMain.style.display = "flex";

    const titleDiv = document.createElement("div");
    titleDiv.className = "routine__titles";
    titleDiv.innerHTML = `
      <h2 class="text-xl">Your ${array[0].target} Routine</h2>
      <a href="#" class="button btn-favorite">Add to favorites <i class="fa-solid fa-heart"></i></a>
    `;

    const routineDiv = document.createElement("div");
    routineDiv.className = "routine";
    routineDiv.appendChild(titleDiv);

    let btnFavorite = titleDiv.querySelector(".btn-favorite");
    btnFavorite.addEventListener("click", () => {
      agregarGuardada();
    });

    array.forEach((ejercicio) => {
      if (ejercicio != undefined) {
        const exerciseDiv = document.createElement("div");
        exerciseDiv.className = "card";
        exerciseDiv.innerHTML = `
          <figure class="card__thumbnail">
            <img src="${ejercicio.gifUrl}" alt="${ejercicio.name}" class="card__img">    
          </figure>
          <div class="information">
            <p class="">${ejercicio.equipment}</p>
            <p class="">${ejercicio.target}</p>
          </div>
          <h3 class="text-xl">${ejercicio.name}</h3>
        `;
        exerciseDiv.addEventListener("click", () =>
          expandirEjercicio(ejercicio)
        );
        routineDiv.appendChild(exerciseDiv);
      }
    });
    cardContainer.appendChild(routineDiv);
  }, 500);
}

function expandirEjercicio(ejercicio) {
  const cardExpand = document.createElement("div");

  // Crear el div para los músculos secundarios
  let secondaryMuscles = document.createElement("div");
  secondaryMuscles.className = "secondary-muscles";

  // Llenar secondaryMuscles con cada músculo secundario
  ejercicio.secondaryMuscles.forEach((muscle) => {
    secondaryMuscles.innerHTML += `<p>${muscle}</p>`;
  });

  cardExpand.className = "card__expand";
  cardExpand.innerHTML = ` 
  <i class="fa-solid fa-xmark cerrar"></i>
  <figure class="card__expand-thumbnail">
    <img src="${ejercicio.gifUrl}" alt="${ejercicio.name}" class="card__expand-img">    
  </figure>
  <h3 class="text-xl">${ejercicio.name}</h3>
    <div class="card__expand-information">
      <div class="expand-information__group">
        <h4>Target:</h4>
        <div  class="expand-information__muscles">    
            <p class="target">${ejercicio.target}</p>
            ${secondaryMuscles.outerHTML}
          </div>
      </div>
      <div class="expand-information__group">
        <h4>Equipment:</h4>
        <p class="">${ejercicio.equipment}</p>
      </div>
    </div>
    <div class="card__expand-instructions">
      <p>${ejercicio.instructions}</p>
    </div>`;

  const cerrar = cardExpand.querySelector(".cerrar");
  cerrar.addEventListener("click", () => {
    cardExpand.remove();
    cardContainer.style.opacity = "1";
    modalBackground.style.display = "none";
  });

  modalBackground.appendChild(cardExpand);
  modalBackground.style.display = "flex";
}

function mostrarFavoritos(array) {
  loader.style.display = "block";
  cardsMain.style.display = "none";

  gmusculares.style.display = "none";

  // Ocultar gmusculares después de mostrar el loader
  levelSection.style.display = "none";

  // Simular una carga ficticia (por ejemplo, un retraso de 1 segundo)
  setTimeout(() => {
    // Ocultar el loader
    loader.style.display = "none";
    cardsMain.style.display = "flex";

    btnFavoritosShow.style.display = "none";
    reroll.style.display = "none";

    cardContainer.innerHTML = "";

    const cardTitle = document.querySelector(".card-title");
    cardTitle.textContent = "Saved Routines";

    if (array.length === 0) {
      let noRoutines = document.createElement("div");
      noRoutines.className = "no-routines";
      noRoutines.innerHTML = `
  <h2 class="text-xl">No routines saved</h2> 
  <a href="" class="button button--green">New routine</a>

  `;

      cardContainer.appendChild(noRoutines);
    } else {
      array.forEach((rutina) => {
        // Crear un div para contener todos los ejercicios de esta rutina

        cardsMain.style.display = "flex";

        const titleDiv = document.createElement("div");
        titleDiv.className = "routine__titles";
        titleDiv.innerHTML = `
      <h2 class="text-xl">Your ${rutina[0].target} Routine</h2>
      <a href="#" class="button btn-delete">Delete favorites <i class="fa-solid fa-trash"></i></a>
    `;

        levelSection.style.display = "none";

        const routineDiv = document.createElement("div");
        routineDiv.className = "routine";

        routineDiv.appendChild(titleDiv);

        const btnDelete = routineDiv.querySelector(".btn-delete");
        btnDelete.addEventListener("click", () => eliminarGuardada(rutina));

        // Iterar sobre cada ejercicio en la rutina
        rutina.forEach((ejercicio) => {
          // Crear un div para cada ejercicio, configurando su estructura HTML
          const exerciseDiv = document.createElement("div");
          exerciseDiv.className = "card";
          exerciseDiv.innerHTML = `
      <figure class="card__thumbnail">
      <img src="${ejercicio.gifUrl}" alt="${ejercicio.name}" class="card__img">    
    </figure>
      <div class="information">
        <p class="">${ejercicio.equipment}</p>
        <p class="">${ejercicio.target}</p>
      </div>
      <h3 class="text-xl">${ejercicio.name}</h3>
      `;

          // Añadir el div del ejercicio al div de la rutina
          exerciseDiv.addEventListener("click", () =>
            expandirEjercicio(ejercicio)
          );
          routineDiv.appendChild(exerciseDiv);
        });

        // Añadir el div de la rutina completa al contenedor principal

        cardContainer.appendChild(routineDiv);
      });
    }
  }, 500);
}

// Función para eliminar una rutina de favoritos y del local storage
const eliminarGuardada = (rutinaEliminar) => {
  // Ir a buscar al local storage las rutinas guardadas
  let rutinasGuardadas = getLocalStorage(keyRutinas);
  // Filtrar las rutinas guardadas para eliminar la que se quiere eliminar
  let filtradas = rutinasGuardadas.filter((rutina) => {
    // Convertir las rutinas a cadena para compararlas
    return JSON.stringify(rutina) !== JSON.stringify(rutinaEliminar);
  });
  // Volver a guardar las rutinas filtradas en el local storage
  setLocalStorage(keyRutinas, filtradas);

  mostrarFavoritos(filtradas);
};

const agregarGuardada = () => {
  let rutinaElegida = routine;
  const btnFavorite = document.querySelector(".btn-favorite");
  btnFavorite.disabled = true;
  btnFavorite.style.backgroundColor = "gray";
  btnFavorite.style.color = "var(--text-colorPrimary)";
  btnFavorite.style.opacity = 0.5;
  btnFavorite.textContent = "Added";
  btnFavorite.style.border = "2px solid grey";

  // Ir a buscar al local storage las rutinas guardadas
  let rutinasGuardadas = getLocalStorage(keyRutinas) || [];

  // Verificar si la rutina elegida ya existe en las rutinas guardadas
  const rutinaExistente = rutinasGuardadas.some(
    (rutina) => JSON.stringify(rutina) === JSON.stringify(rutinaElegida)
  );

  // Si la rutina elegida ya existe, mostrar un mensaje o realizar alguna acción
  if (rutinaExistente) {
    console.log("¡La rutina ya está en favoritos!");
    // Puedes mostrar un mensaje al usuario o realizar otra acción apropiada
  } else {
    // Agregar la rutina elegida a la lista de rutinas guardadas en primer lugar
    rutinasGuardadas.unshift(rutinaElegida);
    // Guardar la lista de rutinas actualizada en el local storage
    setLocalStorage(keyRutinas, rutinasGuardadas);
    console.log("¡Rutina agregada a favoritos!");

    favoritosShow.forEach((element) => {
      element.style.color = "red";
    
      setTimeout(() => {
        element.style.color = "white";
      }, 300);
    });
  }
};

import { imprimir } from "./utils.js";
import { getLocalStorage, setLocalStorage } from "./utils.js";

let espalda = document.querySelector(".espalda");
let pecho = document.querySelector(".pecho");
let brazos = document.querySelector(".brazos");
let pierna = document.querySelector(".pierna");

let beginner = document.querySelector(".beginner");
let intermediate = document.querySelector(".intermediate");
let reroll = document.querySelector(".reroll");

let FavoritosShow = document.querySelector(".mostrarFavorite");
let btnEliminar = document.querySelector(".btn-eliminar");

let paramMuscle1;
let paramMuscle2;
let paramMuscle3;
let paramMuscle4;

let exerciseAmount = 0;

let resultParamMuscle1Filter = [];
let resultParamMuscle2Filter = [];
let resultParamMuscle3Filter = [];
let resultParamMuscle4Filter = [];

let ParamMuscle1BackUp = [];
let ParamMuscle2BackUp = [];
let ParamMuscle3BackUp = [];
let ParamMuscle4BackUp = [];

let routine = [];

let favoritesRoutines = [];

let idRoutines = 0;

let keyRutinas = "rutinasGuardadas";



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
  } else if (paramMuscle2 == "shoulders" ) {
    cargarEjerciciosPecho();
  }else{
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

FavoritosShow.addEventListener("click", () => {
  const rutinasGuardadas = getLocalStorage(keyRutinas) || [];
  mostrarFavoritos(rutinasGuardadas);
});

function randomExercises(array, numCant) {
  let exercisesPerMuscle;

 if(array != undefined){
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
  document.querySelector(".card__container").innerHTML = ``;

  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${paramMuscle1}?limit=150`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4b35abef29msh6ea800350e10f12p142172jsna34ed5f2e203",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const resultParamMuscle = await response.json();

    if (response.status === 200) {
      if (paramMuscle1 === "upper arms") {
        resultParamMuscle1Filter = resultParamMuscle.filter(
          (ejercicio) =>
            (ejercicio.equipment === "barbell" ||
              ejercicio.equipment === "cable") &&
            ejercicio.target === "biceps"
        );
        resultParamMuscle2Filter = resultParamMuscle.filter(
          (ejercicio) =>
            (ejercicio.equipment === "barbell" ||
              ejercicio.equipment === "cable") &&
            ejercicio.target === "triceps"
        );

        ParamMuscle1BackUp = resultParamMuscle1Filter;
        ParamMuscle2BackUp = resultParamMuscle2Filter;
      } else if (paramMuscle1 === "chest") {
        resultParamMuscle1Filter = resultParamMuscle.filter(
          (ejercicio) =>
            ejercicio.equipment === "barbell" || ejercicio.equipment === "cable"
        );
        ParamMuscle1BackUp = resultParamMuscle1Filter;
      } else if (paramMuscle1 === "back") {
        resultParamMuscle1Filter = resultParamMuscle.filter(
          (ejercicio) =>
            (ejercicio.equipment === "barbell" ||
              ejercicio.equipment === "cable") &&
            ejercicio.target === "upper back"
        );
        resultParamMuscle2Filter = resultParamMuscle.filter(
          (ejercicio) =>
            (ejercicio.equipment === "barbell" ||
              ejercicio.equipment === "cable") &&
            ejercicio.target === "lats"
        );

        ParamMuscle1BackUp = resultParamMuscle1Filter;
        ParamMuscle2BackUp = resultParamMuscle2Filter;
      } else if (paramMuscle1 === "upper legs") {
        resultParamMuscle1Filter = resultParamMuscle.filter(
          (ejercicio) =>
            ejercicio.equipment === "barbell" || ejercicio.equipment === "cable"
        );

        ParamMuscle1BackUp = resultParamMuscle1Filter;
      } else {
        console.log("Hubo un error y no sabemos que paso");
      }
    } else {
    }
  } catch (error) {
    console.log(error);
  }

  randomExercises(resultParamMuscle1Filter);
  randomExercises(resultParamMuscle2Filter);
  mostrarEjercicios(routine);

  // resultParamMuscle1Filter = [];
  // resultParamMuscle2Filter = [];
  // resultParamMuscle3Filter = [];
  // resultParamMuscle4Filter = [];
  // Si activo esto no me va a funcionar el random Exercises
};

const cargarEjerciciosPierna = async () => {
  let url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${paramMuscle1}?limit=150`;
  let options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4b35abef29msh6ea800350e10f12p142172jsna34ed5f2e203",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const resultParamMuscle = await response.json();

    if (response.status === 200) {
      if (paramMuscle1 === "upper legs") {
        resultParamMuscle1Filter = resultParamMuscle.filter(
          (ejercicio) =>
            (ejercicio.equipment === "barbell" ||
              ejercicio.equipment === "cable") &&
            ejercicio.target === "quads"
        );
        resultParamMuscle2Filter = resultParamMuscle.filter(
          (ejercicio) => ejercicio.target === "hamstrings"
        );

        resultParamMuscle3Filter = resultParamMuscle.filter(
          (ejercicio) =>
            (ejercicio.equipment === "barbell" ||
              ejercicio.equipment === "cable") &&
            ejercicio.target === "glutes"
        );

        let url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${paramMuscle4}?limit=150`;
        let options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "4b35abef29msh6ea800350e10f12p142172jsna34ed5f2e203",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const resultParamMuscle4 = await response.json();

          if (response.status === 200) {
            resultParamMuscle4Filter = resultParamMuscle4.filter(
              (ejercicio) =>
                (ejercicio.equipment === "barbell" ||
                  ejercicio.equipment === "cable") &&
                ejercicio.target === "calves"
            );
          } else if (respuesta.status === 401) {
            console.log("Pusiste la llave mal");
          } else if (respuesta.status === 404) {
            console.log("No existe");
          } else {
            console.log("Hubo un error y no sabemos que paso");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {}

  randomExercises(resultParamMuscle1Filter, 2);
  randomExercises(resultParamMuscle2Filter, 2);
  randomExercises(resultParamMuscle3Filter, 1);
  randomExercises(resultParamMuscle4Filter, 1);
  mostrarEjercicios(routine);
};

const cargarEjerciciosPecho = async () => {
  console.log("Entre cargarEjerciciosPecho");
  let url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${paramMuscle1}?limit=150`;
  let options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4b35abef29msh6ea800350e10f12p142172jsna34ed5f2e203",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const resultParamMuscle = await response.json();

    if (response.status === 200) {
      if (paramMuscle1 === "chest") {
        resultParamMuscle1Filter = resultParamMuscle.filter(
          (ejercicio) =>
            ejercicio.equipment === "barbell" || ejercicio.equipment === "cable"
        );
      }
    }
  } catch (error) {}

  let url2 = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${paramMuscle2}?limit=150`;
  let options2 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4b35abef29msh6ea800350e10f12p142172jsna34ed5f2e203",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response2 = await fetch(url2, options2);
    const resultParamMuscle2 = await response2.json();

    if (response2.status === 200) {
      resultParamMuscle2Filter = resultParamMuscle2.filter(
        (ejercicio) =>
          ejercicio.equipment === "barbell" || ejercicio.equipment === "cable"
      );
    } else if (respuesta.status === 401) {
      console.log("Pusiste la llave mal");
    } else if (respuesta.status === 404) {
      console.log("No existe");
    } else {
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    console.log(error);
  }

  if(exerciseAmount == 6){
    randomExercises(resultParamMuscle1Filter, 4);
    randomExercises(resultParamMuscle2Filter, 2);
    mostrarEjercicios(routine);
  }else{
    randomExercises(resultParamMuscle1Filter, 2);
    randomExercises(resultParamMuscle2Filter, 2);
    mostrarEjercicios(routine);
  }
 
  
};

function rutinaAleatoria() {
  routine = [];
  document.querySelector(".card__container").innerHTML = ``;

  if (paramMuscle4) {
    // console.log("Filter 1");
    // console.log(resultParamMuscle1Filter);
    // console.log("Filter 2");
    // console.log(resultParamMuscle2Filter);
    // console.log("Filter 3");
    // console.log(resultParamMuscle3Filter);
    // console.log("Filter 4");
    // console.log(resultParamMuscle4Filter);

    randomExercises(resultParamMuscle1Filter, 2);
    randomExercises(resultParamMuscle2Filter, 2);
    randomExercises(resultParamMuscle3Filter, 1);
    randomExercises(resultParamMuscle4Filter, 1);

    mostrarEjercicios(routine);
  } else if (paramMuscle2 == "shoulders" && exerciseAmount == 6) {
    console.log("Funciona el pecho random");
    randomExercises(resultParamMuscle1Filter, 4);
    randomExercises(resultParamMuscle2Filter, 2);
    mostrarEjercicios(routine);
  }else {
    randomExercises(resultParamMuscle1Filter);
    randomExercises(resultParamMuscle2Filter);
    mostrarEjercicios(routine);
  }
}
function mostrarEjercicios(array) {
  console.log(array);

  const cardContainer = document.querySelector(".card__container");
  cardContainer.innerHTML = "";

  const btnFavorite = document.createElement("button");
  btnFavorite.textContent = "Favoritos";
  btnFavorite.className = "btn-favorite";
  btnFavorite.addEventListener("click", () => {
    agregarGuardada();
  });


  const routineDiv = document.createElement("div");
  routineDiv.className = "routine";

  routineDiv.appendChild(btnFavorite);

  array.forEach((ejercicio) => {
      if(ejercicio != undefined){
        const exerciseDiv = document.createElement("div");
      exerciseDiv.className = "card";
      exerciseDiv.innerHTML = `
        <img src="${ejercicio.gifUrl}" alt="${ejercicio.name}">
        <h3>${ejercicio.name}</h3>
        <h3>${ejercicio.target}</h3>
      `;
      routineDiv.appendChild(exerciseDiv);
      }
  });
  cardContainer.appendChild(routineDiv);
}

function mostrarFavoritos(rutinasFavoritos) {
  // Seleccionar el contenedor principal y limpiar su contenido previo
  const cardContainer = document.querySelector(".card__container");
  cardContainer.innerHTML = "";

  // Iterar sobre cada rutina en la lista de rutinas favoritas
  rutinasFavoritos.forEach((rutina) => {
    // Crear un div para contener todos los ejercicios de esta rutina
    const routineDiv = document.createElement("div");
    routineDiv.className = "routine";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarGuardada(rutina));

  
    // Iterar sobre cada ejercicio en la rutina
    rutina.forEach((ejercicio) => {
      // Crear un div para cada ejercicio, configurando su estructura HTML
      const exerciseDiv = document.createElement("div");
      exerciseDiv.className = "card";
      exerciseDiv.innerHTML = `
        <img src="${ejercicio.gifUrl}" alt="${ejercicio.name}">
        <h3>${ejercicio.name}</h3>
        <h3>${ejercicio.target}</h3>
       
      `;

    
      // Añadir el div del ejercicio al div de la rutina
      routineDiv.appendChild(exerciseDiv);
    });

    // Añadir el div de la rutina completa al contenedor principal
    routineDiv.appendChild(btnEliminar);
    cardContainer.appendChild(routineDiv);
  });
  document.querySelectorAll(".btn-eliminar").forEach((button)=> button.addEventListener("click", ()=> eliminarGuardada(rutina)))
}

const agregarGuardada = () => {
  let rutinaElegida = routine;
  // Ir a buscar al local storage las rutinas guardadas
  let rutinasGuardadas = getLocalStorage(keyRutinas) || [];

  // Verificar si la rutina elegida ya existe en las rutinas guardadas
  const rutinaExistente = rutinasGuardadas.some((rutina) =>
    JSON.stringify(rutina) === JSON.stringify(rutinaElegida)
  );

  // Si la rutina elegida ya existe, mostrar un mensaje o realizar alguna acción
  if (rutinaExistente) {
    console.log("¡La rutina ya está en favoritos!");
    // Puedes mostrar un mensaje al usuario o realizar otra acción apropiada
  } else {
    // Agregar la rutina elegida a la lista de rutinas guardadas
    rutinasGuardadas.push(rutinaElegida);
    // Guardar la lista de rutinas actualizada en el local storage
    setLocalStorage(keyRutinas, rutinasGuardadas);
    console.log("¡Rutina agregada a favoritos!");
  }
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

  mostrarFavoritos(filtradas)
}


// function agregarFavoritos() {
//   routine;
//   favoritesRoutines.push(routine);
//   console.log(favoritesRoutines);
//}

// const agregarGuardada = () =>{
//   let rutinaElegida = routine;
//   // ir a buscar al localstorage cuales ciudades hay ahora 
//   let rutinasGuardadas = getLocalStorage(keyRutinas) || [];
//   // agregar mi ciudad a la lista
//   rutinasGuardadas.push(rutinaElegida)        
//   // ciudadesGuardadas.push(ciudadElegida)
//   // publicar la lista nuevamente
//   setLocalStorage(keyRutinas,rutinasGuardadas)
 
// }

// const eliminarGuardada = (rutinaEliminar) => {
//   // Ir a buscar al local storage las rutinas guardadas
//   let rutinasGuardadas = getLocalStorage(keyRutinas);

//   // Filtrar las rutinas guardadas para eliminar la que se quiere eliminar
//   let filtradas = rutinasGuardadas.filter((rutina) => rutina !== rutinaEliminar);

//   // Volver a guardar las rutinas filtradas en el local storage
//   setLocalStorage(keyRutinas, filtradas);
// }

// Función para agregar una rutina a favoritos y almacenarla en el local storage
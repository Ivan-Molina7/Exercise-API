let espalda = document.querySelector(".espalda");
let pecho = document.querySelector(".pecho");
let brazos = document.querySelector(".brazos");
let pierna = document.querySelector(".pierna");

let beginner = document.querySelector(".beginner");
let intermediate = document.querySelector(".intermediate");

let paramMuscle1;
let paramMuscle2;
let paramMuscle3;
let paramMuscle4;

let exerciseAmount = 0;

let resultParamMuscle1Filter = [];
let resultParamMuscle2Filter = [];
let resultParamMuscle3Filter = [];
let resultParamMuscle4Filter = [];



let results = [];

pecho.addEventListener("click", () => {
  paramMuscle1 = "chest";
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
  } else {
    cargarEjercicios();
  }
});

intermediate.addEventListener("click", () => {
  exerciseAmount = 6;

  if (paramMuscle4) {
    cargarEjerciciosPierna();
  } else {
    cargarEjercicios();
  }
});

function randomExercises(array, numCant) {
  let exercisesPerMuscle;

  if (paramMuscle4 && exerciseAmount == 6) {

    console.log("Entre a la función");
    let contador = 0;
    while (contador < numCant) {
      const exerciseIndex = Math.floor(Math.random() * array.length);
      results.push(array[exerciseIndex]);
      array.splice(exerciseIndex, 1);
      contador++;
    }
  } else if (paramMuscle4 && exerciseAmount == 4) {
    exercisesPerMuscle = exerciseAmount / 4;
    console.log("Funciono");
    // Selecciona 2 ejercicios aleatorios
    for (let i = 0; i < exercisesPerMuscle; i++) {
      const exerciseIndex = Math.floor(Math.random() * array.length);
      results.push(array[exerciseIndex]);
      array.splice(exerciseIndex, 1); // Elimina el ejercicio seleccionado para evitar duplicados
    }
  } else if (paramMuscle2) {
    exercisesPerMuscle = exerciseAmount / 2;
    // Selecciona 2 ejercicios aleatorios
    for (let i = 0; i < exercisesPerMuscle; i++) {
      const exerciseIndex = Math.floor(Math.random() * array.length);
      results.push(array[exerciseIndex]);
      array.splice(exerciseIndex, 1); // Elimina el ejercicio seleccionado para evitar duplicados
    }
  } else {
    exercisesPerMuscle = exerciseAmount;
    // Selecciona 2 ejercicios aleatorios
    for (let i = 0; i < exercisesPerMuscle; i++) {
      const exerciseIndex = Math.floor(Math.random() * array.length);
      results.push(array[exerciseIndex]);
      array.splice(exerciseIndex, 1); // Elimina el ejercicio seleccionado para evitar duplicados
    }
  }
}

const cargarEjercicios = async () => {
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
      if (paramMuscle1 === "upper arms" ) {
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
      } else if (paramMuscle1 === "chest") {
        resultParamMuscle1Filter = resultParamMuscle.filter(
          (ejercicio) =>
            ejercicio.equipment === "barbell" || ejercicio.equipment === "cable"
        );
      } else if (paramMuscle1 === "back" ) {
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
      } else if (paramMuscle1 === "upper legs") {
        resultParamMuscle1Filter = resultParamMuscle.filter(
          (ejercicio) =>
            ejercicio.equipment === "barbell" || ejercicio.equipment === "cable"
        );
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
  mostrarEjercicios(results);
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
          (ejercicio) =>
            (ejercicio.equipment === "barbell" ||
              ejercicio.equipment === "cable") &&
            ejercicio.target === "hamstrings"
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
  mostrarEjercicios(results);
};

function mostrarEjercicios(array) {
  array.forEach((ejercicio) => {
    document.querySelector(".ejercicios").innerHTML += `
			<div class="card">
			<img src="${ejercicio.gifUrl}" alt="">
			<h3>${ejercicio.name}</h3>
			<h3>${ejercicio.target}</h3>
			<p>${ejercicio.instructions}</p>
		
			</div>`;
  });
}

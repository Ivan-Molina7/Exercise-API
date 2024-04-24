

let espalda = document.querySelector('.espalda');
let pecho = document.querySelector('.pecho');
let brazos = document.querySelector('.brazos');
let pierna = document.querySelector('.pierna');

let beginner = document.querySelector('.beginner');
let intermediate = document.querySelector('.intermediate');


let paramMuscle1  ;
let paramMuscle2  ;
let paramMuscle3 = '';
let paramMuscle4 = '';


let resultParamMuscle1Filter = [];
let resultParamMuscle2Filter = [];

let exerciseAmount = 0;

let results = [];

brazos.addEventListener('click', () => {
	 paramMuscle1 = 'upper arms';
	 paramMuscle2 = 'upper arms';
})

beginner.addEventListener('click', () => {
	exerciseAmount = 4;
	cargarEjercicios()
})


function randomExercises(array) {

	const exercisesPerMuscle = (exerciseAmount / 2);

		  // Selecciona 2 ejercicios aleatorios de bíceps
	  for (let i = 0; i < exercisesPerMuscle; i++) {
		const exerciseIndex = Math.floor(Math.random() * array.length);
		results.push(array[exerciseIndex]);
		array.splice(exerciseIndex, 1); // Elimina el ejercicio seleccionado para evitar duplicados
	  }

  }
  




const cargarEjercicios2 = async () => {
	const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${paramMuscle2}?limit=150`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '4b35abef29msh6ea800350e10f12p142172jsna34ed5f2e203',
			'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
		}
	};
	
	try {
		const response = await fetch(url, options);
		const resultParamMuscle2 = await response.json();

	  if (response.status === 200) {


		 resultParamMuscle2Filter = resultParamMuscle2.filter(ejercicio => (ejercicio.equipment === 'barbell' || ejercicio.equipment === 'cable') && (ejercicio.target === 'triceps'));


	  } else if (respuesta.status === 401) {
		console.log("Pusiste la llave mal");
	  } else if (respuesta.status === 404) {
		console.log("La película que buscas no existe");
	  } else {
		console.log("Hubo un error y no sabemos que paso");
	  }
	} catch (error) {
	  console.log(error);
	}

	mostrarEjercicios();
  }


const cargarEjercicios = async () => {

	const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${paramMuscle1}?limit=150`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '4b35abef29msh6ea800350e10f12p142172jsna34ed5f2e203',
			'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
		}
	};
	
	try {
		const response = await fetch(url, options);
		const resultParamMuscle1 = await response.json();

	  if (response.status === 200) {


		 resultParamMuscle1Filter = resultParamMuscle1.filter(ejercicio => (ejercicio.equipment === 'barbell' || ejercicio.equipment === 'cable') && (ejercicio.target === 'biceps'));


	  } else if (respuesta.status === 401) {
		console.log("Pusiste la llave mal");
	  } else if (respuesta.status === 404) {
		console.log("La película que buscas no existe");
	  } else {
		console.log("Hubo un error y no sabemos que paso");
	  }
	} catch (error) {
	  console.log(error);
	}
	cargarEjercicios2();
	
  };

  function mostrarEjercicios(){
	randomExercises(resultParamMuscle1Filter)
	randomExercises(resultParamMuscle2Filter)

	results.forEach((ejercicio) => {
			document.querySelector('.ejercicios').innerHTML += `
			<div class="card">
			<img src="${ejercicio.gifUrl}" alt="">
			<h3>${ejercicio.name}</h3>
			<p>${ejercicio.target}</p>
		
			</div>`
  });
}

 

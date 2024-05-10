export const cargarEjerciciosAPI = async (grupoMuscular, limite = 150) => {
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${grupoMuscular}?limit=${limite}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "432cdc51ecmsh35a38ca3bee445bp19f01bjsn1905aeb55b0c",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error en la solicitud: ", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error al cargar ejercicios:", error);
    return [];
  }
};

// funcion para setear valor en localStorage con clave y valor
//si es un objeto, lo convierto a string con JSON.stringify
export const setLocalStorage = (clave, valor) => {
  if (typeof valor === "object") {
    valor = JSON.stringify(valor);
  }
  localStorage.setItem(clave, valor);
};

// funcion para obtener valor de localStorage por clave
//si es un objeto, lo convierto a objeto con JSON.parse
export const getLocalStorage = (clave) => {
  let valor = localStorage.getItem(clave);
  try {
    return JSON.parse(valor);
  } catch (error) {
    return valor;
  }
};

export function filterParamMuscle2(array, Equipment, Equipment2) {
  return array.filter(
    (ejercicio) =>
      ejercicio.equipment === Equipment || ejercicio.equipment === Equipment2
  );
}
export function filterParamMuscle3(array, Equipment, Equipment2, Target) {
  return array.filter(
    (ejercicio) =>
      (ejercicio.equipment === Equipment ||
        ejercicio.equipment === Equipment2) &&
      ejercicio.target === Target
  );
}

const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header__nav");
hamburger.onclick = function () {
  headerNav.classList.toggle("active1");
  hamburger.classList.toggle("active1");
};

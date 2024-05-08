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
  
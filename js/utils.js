//funcion para imprimir en el html, recibe el id del elemento y el contenido a imprimir
export const imprimir = (elemento, contenido) => {
    document.querySelector(`#${elemento}`).innerHTML = contenido;
  };
  
  //funcion para agregar un event listener a un elemento, recibe el id del elemento y la funcion a ejecutar
  export const click = (elemento, callback) => {
    document.querySelector(`#${elemento}`).addEventListener("click", callback);
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
  
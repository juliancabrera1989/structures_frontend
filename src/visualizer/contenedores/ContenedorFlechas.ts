// import  {crearFlecha} from "../elementosGraficos/Flecha.ts"

// const root = document.documentElement as HTMLElement;
// let flechas: HTMLCollectionOf<Element>;

// function agregarFlecha(metodo: number): void {
            
//     var n = 0;
//     var m = 1;
//     let flecha = crearFlecha();
//     const contenedor_flechas = document.getElementById("contenedor_flechas") as HTMLDivElement;
//     root.style.setProperty('--flecha-left',`-25px`); 
//     if(metodo == 0) 
//   //    // flecha.classList.add("ultima");
       
//        contenedor_flechas.append(flecha);

//     else {
//         contenedor_flechas.prepend(flecha);
//         n = 1;
//         m = contenedor_flechas.childElementCount;
//     }
    




//     const listaFlechas = getFlechas();

 
//         for(let i = (0 + n); i < (listaFlechas.length - (1 - n)); i++) {
//         listaFlechas[i].classList.add("no-mover__flecha");
//         }

       

// setTimeout(() => {
//       const flechaTarget = listaFlechas[listaFlechas.length - m];
//       if (flechaTarget) {
//           // Convertimos a array los hijos para usar of
//           for(let elemento of Array.from(flechaTarget.children) as HTMLElement[]){
//             elemento.removeAttribute("style");
//           }
//       }
//     }, 100);

// }











// function sacarFlecha(indice : number) : void{
//   const contenedor_flechas = document.getElementById("contenedor_flechas") as HTMLDivElement;


//   // contenedor_flechas.removeChild(flechas[indice]);
//   const listaFlechas = getFlechas();

//    if (listaFlechas[indice]) {
//     contenedor_flechas.removeChild(listaFlechas[indice]);

//     const flechasActualizadas = getFlechas();
//     if (listaFlechas.length > 0) {
//       root.style.setProperty('--flecha-left',`-25px`); 
//     for(let i = 0; i < flechasActualizadas.length; i++){
//        flechasActualizadas[i].classList.add("no-mover__flecha");
//     }
//   }

// }

// };





// function getFlechas() : HTMLCollectionOf<HTMLElement> {
//   const contenedor_flechas = document.getElementById("contenedor_flechas") as HTMLDivElement;

//       if (!contenedor_flechas) return document.getElementsByClassName("empty") as HTMLCollectionOf<HTMLElement>;
    
//     return contenedor_flechas.getElementsByClassName("arrow") as HTMLCollectionOf<HTMLElement>;

// }



// export {agregarFlecha};

// export {sacarFlecha};

// export {getFlechas};


import { crearFlecha } from "../elementosGraficos/Flecha.ts";
import { contenedorFlechas, verificarDOM } from "../elementosDOM.ts";

const root = document.documentElement;

/**
 * Obtiene la colección actualizada de flechas en el DOM.
 * Retorna un HTMLCollectionOf<Element> o un array vacío simulado si el DOM no está listo.
 */
function getFlechas(): HTMLCollectionOf<Element> | Element[] {
  if (!verificarDOM() || !contenedorFlechas) {
    return [];
  }
  return contenedorFlechas.getElementsByClassName("arrow");
}

function agregarFlechaN(indice: number): void {

  const flecha = crearFlecha();
  
  root.style.setProperty('--flecha-left', `-25px`);


  const flechas = getFlechas();
  
  // Si el índice es válido dentro del rango actual de flechas
  if (indice < flechas.length && flechas[indice]) {
    flechas[indice].insertAdjacentElement("afterend", flecha);
  }



        for (let i = 0; i < flechas.length; i++) {
        if (i !== (indice - 2)) {
          flechas[i].classList.add("no-mover__flecha");
        }
      }

      setTimeout(() => {
        const objetivo = flechas[indice - 1];
        if (objetivo) {
          for (const elemento of objetivo.children) {
            (elemento as HTMLElement).removeAttribute("style");
          }
        }
      }, 100);
}

function agregarFlecha(metodo: number): void {
  if (!verificarDOM() || !contenedorFlechas) return;

  let n = 0;
  let m = 1;
  const flecha = crearFlecha();
  
  root.style.setProperty('--flecha-left', `-25px`);

  // 1. Inserción en el DOM según el método
  switch (metodo) {
    case 0: {
      contenedorFlechas.append(flecha);
      break;
    }
    case 1: {
      contenedorFlechas.prepend(flecha);
      n = 1;
      m = contenedorFlechas.childElementCount;
      break;
    }
    // default: {
    //   agregarFlechaN(flecha, indice - 2);
    //   break;
    // }
  }

  const flechas = getFlechas();

  // 2. Aplicación de clases de animación/estado según el método
  switch (metodo) {
    case 0:
    case 1: {
      for (let i = (0 + n); i < (flechas.length - (1 - n)); i++) {
        flechas[i].classList.add("no-mover__flecha");
      }

      setTimeout(() => {
        const objetivo = flechas[flechas.length - m];
        if (objetivo) {
          for (const elemento of objetivo.children) {
            (elemento as HTMLElement).removeAttribute("style");
          }
        }
      }, 100);
      break;
    }

    // default: {
    //   for (let i = 0; i < flechas.length; i++) {
    //     if (i !== (indice - 2)) {
    //       flechas[i].classList.add("no-mover__flecha");
    //     }
    //   }

    //   setTimeout(() => {
    //     const objetivo = flechas[indice - 1];
    //     if (objetivo) {
    //       for (const elemento of objetivo.children) {
    //         (elemento as HTMLElement).removeAttribute("style");
    //       }
    //     }
    //   }, 100);
    //   break;
    // }
  }
}

function sacarFlecha(indice: number): void {
  if (!verificarDOM() || !contenedorFlechas) return;

  const flechasAntes = getFlechas();
  const flechaAEliminar = flechasAntes[indice];

  if (flechaAEliminar) {
    contenedorFlechas.removeChild(flechaAEliminar);
  }

  // Volvemos a consultar la lista actualizada post-eliminación
  const flechasDespues = getFlechas();
  if (flechasDespues.length > 0) {
    root.style.setProperty('--flecha-left', `-25px`);
    for (let i = 0; i < flechasDespues.length; i++) {
      flechasDespues[i].classList.add("no-mover__flecha");
    }
  }
}

export { agregarFlecha, agregarFlechaN, sacarFlecha, getFlechas };
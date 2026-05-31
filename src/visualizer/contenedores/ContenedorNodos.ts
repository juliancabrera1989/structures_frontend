


// import {crearNodo} from "../elementosGraficos/Nodo.ts"
// import {borrarUltimoNodo, borrarNodoAlComienzo, borrarNodoAlFinal} from "../controladores/RenderSacarNodo.ts"


// // let nodos: HTMLCollectionOf<Element>;




// function agregarNodo(valor: string, metodo: number): void {
//     const elemento = crearNodo(valor);
//     const contenedor_nodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
//     elemento.addEventListener('click', ()=>{
//    //  var indice = nodos.indexOf(elemento.getValor());
//    //  nodoSeleccionado(indice);
//    nodoSeleccionado(valor);
//     });
 
 
//    //  const opcion = new Option(valor);
      
//     switch(metodo){
 
//       case 0: {
//          contenedor_nodos.append(elemento);
         
//          // sNodos.append(opcion);
//          break;
 
//       }
//       case 1: {
//           contenedor_nodos.prepend(elemento);
//          // sNodos.prepend(opcion);
//          break;
//       }
//    //    default: {
         
//    //    }
//      }
 

 
//  };






// function nodoSeleccionado(data : string) : void{
//       const contenedor_flechas = document.getElementById("contenedor_flechas") as HTMLDivElement;

//          if (!contenedor_flechas) return;
//       let result = window.confirm('¿Desea eliminar el nodo?');
//       if (result == true) { 
         
//          const cantidad_flechas = contenedor_flechas.childElementCount;
//          switch(cantidad_flechas){
//             case 0:
//             {

//                borrarUltimoNodo();
//                break;
//             }

//             default:{
//                var indice = indexOf(data);
//                switch (indice){
//                   case 0:{
//                      borrarNodoAlComienzo(data);
//                      break;
//                   }
//                   case (cantidad_flechas): {
//                      borrarNodoAlFinal(data);
//                      break;
//                   }
//                   default :{
//                      break;
//                   }

//                }
//                break;
//             }
//          }
//       }        
//       else {
//          console.log("no se borrara el nodo")
//       }
      
// }

// function sacarNodo(data: string): void {
//    const contenedor_nodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
//     const listaNodos = getNodos();
//    // var valor;
//    // for (let i =0; i < nodos.length; i++) {

//    //    // valor = nodos[i].getElementsByClassName("valor-nodo")[0].innerHTML;
//    //    const nodoActual = listaNodos[i] as HTMLElement;
//    //    const valorElemento = nodoActual.getElementsByClassName("valor-nodo")[0] as HTMLElement;
//    //    if (valor === data) {

//    //        contenedor_nodos.removeChild(nodos[i]);

//    //    }
//    // }
//       for (let i = 0; i < listaNodos.length; i++) {
//       // Tipamos el elemento hijo para acceder a innerHTML sin errores
//       const nodoActual = listaNodos[i] as HTMLElement;
//       const valorElemento = nodoActual.getElementsByClassName("valor-nodo")[0] as HTMLElement;
      
//       if (valorElemento && valorElemento.innerHTML === data) {
//           contenedor_nodos.removeChild(nodoActual);
//       }
//    }
// };












// function indexOf(valor: string): number {
//     const listaNodos = getNodos();
//     for (let i = 0; i < listaNodos.length; i++) {
//         // Necesitamos castear a HTMLElement para acceder a .innerText
//         const divValor = listaNodos[i].getElementsByClassName("valor-nodo")[0] as HTMLElement;
//         if (divValor && divValor.innerText === valor) {
//             return i;
//         }
//     }
//     return -1; // Siempre devolver algo si no se encuentra
// }





// function getNodos(): HTMLCollectionOf<HTMLElement> {
//     // getElementsByClassName ya devuelve una colección tipada
//     return document.getElementsByClassName("caja-nodo") as HTMLCollectionOf<HTMLElement>;
// }


// export {agregarNodo};
// export {sacarNodo};
// export {getNodos};



import { crearNodo } from "../elementosGraficos/Nodo.ts";
// import { 
//   borrarUltimoNodo, 
//   borrarNodoAlComienzo, 
//   borrarNodoIntermedio, 
//   borrarNodoAlFinal 
// } from "../controladores/RenderSacarNodo.ts";
import { nodoSeleccionado } from "../controladores/ControladorEventosNodos.ts";
import { contenedorNodos, verificarDOM } from "../elementosDOM.ts";

/**
 * Obtiene la colección actualizada de nodos en el DOM.
 */
function getNodos(): HTMLCollectionOf<Element> | Element[] {
  if (!verificarDOM() || !contenedorNodos) return [];
  return contenedorNodos.getElementsByClassName("caja-nodo");
}

/**
 * Encuentra el índice de un nodo basándose en su valor de texto interno.
 */
function indexOf(valor: string): number {
  const nodos = getNodos();
  for (let i = 0; i < nodos.length; i++) {
    const contenedorValor = nodos[i].getElementsByClassName("valor-nodo")[0] as HTMLElement | undefined;
    const aux = contenedorValor?.innerText;

    if (aux === valor) {
      return i;
    }
  }
  return -1; // Retornamos -1 si no se encuentra (estándar en JS/TS)
}

function agregarNodoN(valor: string, indice: number): void {

   const elemento = crearNodo(valor);

  // Evento con tipado correcto y seguro
  elemento.addEventListener('click', () => {
    nodoSeleccionado(valor);
  });


  const nodos = getNodos();
  // Validación de rango seguro antes de insertar
  if (indice < nodos.length && nodos[indice]) {
    nodos[indice].insertAdjacentElement("beforebegin", elemento);
  }
}

// function nodoSeleccionado(data: string): void {
//   if (!verificarDOM() || !contenedorFlechas) return;

//   const result = window.confirm('¿Desea eliminar el nodo?');
//   if (!result) {
//     console.log("no se borrara el nodo");
//     return;
//   }

//   const cantidad_flechas = contenedorFlechas.childElementCount;

//   switch (cantidad_flechas) {
//     case 0: {
//       borrarUltimoNodo();
//       break;
//     }
//     default: {
//       const indice = indexOf(data);
//       if (indice === -1) return; // Si no se encuentra el nodo, abortamos de forma segura

//       switch (indice) {
//         case 0: {
//           borrarNodoAlComienzo(data);
//           break;
//         }
//         case cantidad_flechas: {
//           borrarNodoAlFinal(data);
//           break;
//         }
//         default: {
//           borrarNodoIntermedio(data, indice);
//           break;
//         }
//       }
//       break;
//     }
//   }
// }

function agregarNodo(valor: string, metodo: number): void {
  if (!verificarDOM() || !contenedorNodos) return;

  const elemento = crearNodo(valor);

  // Evento con tipado correcto y seguro
  elemento.addEventListener('click', () => {
    nodoSeleccionado(valor);
  });

  switch (metodo) {
    case 0: {
      contenedorNodos.append(elemento);
      break;
    }
    case 1: {
      contenedorNodos.prepend(elemento);
      break;
    }
   //  default: {
   //    console.log("Entró aqui para agregar un nodo intermedio");
   //    agregarNodoN(elemento, indice - 1);
   //    break;
   //  }
  }
}

function sacarNodo(data: string): void {
  if (!verificarDOM() || !contenedorNodos) return;

  const nodos = getNodos();
  
  // Recorremos al revés al eliminar elementos de una colección en vivo 
  // para evitar problemas con la mutación de los índices
  for (let i = nodos.length - 1; i >= 0; i--) {
    const contenedorValor = nodos[i].getElementsByClassName("valor-nodo")[0] as HTMLElement | undefined;
    const valor = contenedorValor?.innerHTML;

    if (valor === data) {
      contenedorNodos.removeChild(nodos[i]);
    }
  }
}

export { agregarNodo, agregarNodoN, sacarNodo, getNodos, indexOf };





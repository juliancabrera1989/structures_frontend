// import { setPuntero , setFlechaFinal , setFlechaInicial } from "./ControladorInicializador.ts";
// import {sacarNodo, getNodos} from "../contenedores/ContenedorNodos.ts"
// import {sacarFlecha, getFlechas} from "../contenedores/ContenedorFlechas.ts"
// import { setFlechasNodos } from "./RenderFlechasNodos.ts";


// const root = document.documentElement;
// var necesitaTransicion : number , s1, s2;

// function handler(e : Event) {
//    e.stopPropagation();
//    e.preventDefault();
//  }
 

// function borrarUltimoNodo() : void{


//             const agregar_primero = document.getElementById("agregar_1er_nodo") as HTMLButtonElement;
//             const agregar_comienzo = document.getElementById("agregar_comienzo") as HTMLButtonElement;
//             const agregar_final = document.getElementById("agregar_final")as HTMLButtonElement ;


//   const contenedor_nodos = document.getElementById("contenedor_nodos") as HTMLDivElement;




//   const str = document.getElementById("str") as HTMLDivElement;
//   const flecha_puntero_inicial = document.getElementById("flecha_puntero_inicial") as HTMLDivElement;
 
//   const flecha_puntero_final = document.getElementById("flecha_puntero_final") as HTMLDivElement;

   
//             const firstChild = contenedor_nodos.firstElementChild as HTMLElement; 
//             const lastChild = contenedor_nodos.lastElementChild as HTMLElement;

//              if (!lastChild || !firstChild) return;

//    document.addEventListener("click", handler, true);

//    setFlechaFinal(false, 1);
 
 
//    flecha_puntero_final.getElementsByClassName("underline")[0].addEventListener("transitionend",function fbpn(){
      
 
//         setFlechaInicial(false, 1)
 
//         flecha_puntero_final.getElementsByClassName("underline")[0].removeEventListener("transitionend", fbpn);
 
 
 
//       });
 
//       flecha_puntero_inicial.getElementsByClassName("underline")[0].addEventListener("transitionend",function f2(){
        
 
//          flecha_puntero_inicial.getElementsByClassName("underline")[0].classList.remove("arrowend-first-ul");
//          flecha_puntero_inicial.getElementsByClassName("linea-s")[0].classList.remove("arrowend-first");
//          flecha_puntero_inicial.getElementsByClassName("linea-i")[0].classList.remove("arrowend-first");



 
//          var angulo = 0;
//          var flecha_puntero_inicial_left = 0.05 * contenedor_nodos.offsetWidth + str.offsetWidth  ;
//          var flecha_puntero_inicial_width = contenedor_nodos.offsetWidth -  2 * (flecha_puntero_inicial_left) ;
//          root.style.setProperty('--rotation-angle-fpi', `${angulo}deg`);
//          root.style.setProperty('--linea-flecha-inicial-width', `${flecha_puntero_inicial_width}px`);
//          root.style.setProperty('--punta-flecha-inicial-width', `20px`);
//          root.style.setProperty('--punta-flecha-inicial-top', `-100px`);
//          root.style.setProperty('--punta-flecha-inicial-left', `${flecha_puntero_inicial_left + flecha_puntero_inicial_width}px`);
 
//          setTimeout(()=>{
//             firstChild.style.opacity = "0";
//           },1000);
 
//            flecha_puntero_inicial.getElementsByClassName("underline")[0].removeEventListener("transitionend", f2);
 
//          });
         
         
//          firstChild.addEventListener("transitionend", function f1(){

//             const input = document.getElementById("nodo") as HTMLDivElement;

//             sacarNodo(input.innerText);
 
//             setPuntero(0);
 
//          });
 
 
//          str.addEventListener("transitionend", function f1(){
 

//             // const agregar_primero = document.getElementById("agregar_1er_nodo");
//             // const agregar_comienzo = document.getElementById("agregar_comienzo");
//             // const agregar_final = document.getElementById("agregar_final");

//             // const str = document.getElementById("str") as ;

//             agregar_primero.removeAttribute("hidden");
//             agregar_comienzo.setAttribute("hidden","hidden");
//             // agregarFinal.setAttribute("id","agregar_final");
//             agregar_final.setAttribute("hidden","hidden");
 
//             str.removeEventListener("transitioned",  f1);
//          });
 
//       document.removeEventListener("click", handler);
 
//  };

// function borrarNodoAlComienzo(data : string) : void {
 
//    const nodos = getNodos();
//    const flechas = getFlechas();

//    const agregar_comienzo = document.getElementById("agregar_comienzo") as HTMLButtonElement;
//    const agregar_final = document.getElementById("agregar_final") as HTMLButtonElement;
//    const contenedor_nodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
   
//    const flecha_puntero_inicial = document.getElementById("flecha_puntero_inicial") as HTMLDivElement;

//       const firstChild = contenedor_nodos.firstElementChild as HTMLElement; 
//       const lastChild = contenedor_nodos.lastElementChild as HTMLElement;

//       if (!lastChild || !firstChild) return;

//    document.addEventListener("click", handler, true);
//    agregar_comienzo.disabled = true;
//    agregar_final.disabled = true;
 
//    necesitaTransicion = 1;
                          
   
//    const ul = flechas[0].getElementsByClassName("underline")[0] as HTMLElement;
//    const ls = flechas[0].getElementsByClassName("linea-s")[0] as HTMLElement;
//    const li = flechas[0].getElementsByClassName("linea-i")[0] as HTMLElement;

//    //  const ul = flechas[0].getElementsByClassName("underline")[0];
//    //  const ls = flechas[0].getElementsByClassName("linea-s")[0]
//    //  const li = flechas[0].getElementsByClassName("linea-i")[0]
//     ul.classList.remove("inmediato");
//     ls.classList.remove("inmediato");
//     li.classList.remove("inmediato");
 
//     ul.classList.add("arrowend-first-ul");
//     ls.classList.add("arrowend-first");
//     li.classList.add("arrowend-first");
 
//     setTimeout(()=>{
       
//        ul.style.width = 0+'px';
//        ls.style.width = 0+'px';
//        li.style.width = 0+'px';
 
//     },100);
     
 
 
//     ul.addEventListener("transitionend", function fu(){
 
       
 
//        necesitaTransicion = 1;
//        setFlechaInicial(false,necesitaTransicion);
              

//        ul.removeEventListener("transitionend", fu );                   
 
    
//     });

    
//     flecha_puntero_inicial.getElementsByClassName("underline")[0].addEventListener("transitionend", function fpu(){
    
 
//      setTimeout(()=>{
//        firstChild.style.opacity = "0";
 
 
//      },1100);
     
 
//      firstChild.addEventListener("transitionend", function fn(){
 
 
//     s1 = ((contenedor_nodos.offsetWidth - (nodos.length) * lastChild.offsetWidth) / (nodos.length+1));
//     s2 = (contenedor_nodos.offsetWidth - (nodos.length-1) * lastChild.offsetWidth) / (nodos.length);

 
//     setFlechaFinal(true , necesitaTransicion, s2);

//     setFlechasNodos(1,1,s1,s2);
 

//       firstChild.removeEventListener("transitionend", fn);
 
 
//      });
 
    
 
//     flecha_puntero_inicial.getElementsByClassName("underline")[0].removeEventListener("transitionend",  fpu);
 
//   });
 
 
 
//        lastChild.addEventListener("transitionend", function fnf(){
//           sacarNodo(data);


//           for(var i=0; i < nodos.length; i++){
//              nodos[i].classList.add("no-mover");
//              nodos[i].style.left = 0+'px';
//           }  
 
//           sacarFlecha(0);
 
//           setTimeout(() => {
             
             
//              setFlechaInicial(true, necesitaTransicion);
 
//              for(var i=0; i < nodos.length; i++)
//                 nodos[i].classList.remove("no-mover");
 
         
//              // sNodos.remove(data)
//              // calcular(contenedor_nodos);
//              }, 1000);

//              li.addEventListener("transitionend", function g(){

//                document.removeEventListener("click", handler,true);
//                agregar_comienzo.disabled = false;
//                agregar_final.disabled = false;
      
//                li.removeEventListener("transitionend", g);
//             });
 
//              lastChild.removeEventListener("transitionend", fnf);

//        });
 


// }
 



// function borrarNodoAlFinal(data : string ) : void{
 
//    const nodos = getNodos();
//    const flechas = getFlechas();




//    const agregar_comienzo = document.getElementById("agregar_comienzo") as HTMLButtonElement;
//    const agregar_final = document.getElementById("agregar_final") as HTMLButtonElement;
//    const contenedor_nodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
   
//    const flecha_puntero_final = document.getElementById("flecha_puntero_final") as HTMLDivElement;

//   const underline = flecha_puntero_final.getElementsByClassName("underline")[0] as HTMLElement;
//   const lineaI = flecha_puntero_final.getElementsByClassName("linea-i")[0] as HTMLElement;


//       // const flecha_puntero_inicial = document.getElementById("flecha_puntero_inicial") as HTMLDivElement;

//       const firstChild = contenedor_nodos.firstElementChild as HTMLElement; 
//       const lastChild = contenedor_nodos.lastElementChild as HTMLElement;

//       if (!lastChild || !firstChild) return;




         
//    const ul = flechas[flechas.length-1].getElementsByClassName("underline")[0] as HTMLElement;
//    const ls = flechas[flechas.length-1].getElementsByClassName("linea-s")[0] as HTMLElement;
//    const li = flechas[flechas.length-1].getElementsByClassName("linea-i")[0] as HTMLElement;


//    document.addEventListener("click", handler, true);
//    agregar_comienzo.disabled = true;
//    agregar_final.disabled = true;
   
//     necesitaTransicion = 1; 
//     setFlechaFinal(false,necesitaTransicion);


//       underline.addEventListener("transitionend", function fpu(){
 
         
//          // const flechas = getFlechas();
//          //  const ul = flechas[flechas.length-1].getElementsByClassName("underline")[0];
//          //  ul.classList.remove("inmediato");
//          //  const ls = flechas[flechas.length-1].getElementsByClassName("linea-s")[0];
//          //  ul.classList.remove("inmediato");
//          //  const li = flechas[flechas.length-1].getElementsByClassName("linea-i")[0];
//          //  ul.classList.remove("inmediato");
          
//           setTimeout(()=>{
 
//              ul.style.width = 0+'px';
//              ls.style.width = 0+'px';
//              li.style.width = 0+'px';
//              ul.classList.add("arrowend-first-ul")
//              ls.classList.add("arrowend-first")
//              li.classList.add("arrowend-first")
//           },100);
 
 
//           ul.addEventListener("transitionend", function fu(){

//              setTimeout(()=>{
//                 lastChild.style.opacity = "0";
    
//              },1100);
 
              
//              ul.removeEventListener("transitionend", fu );                   
 
//           });
 
//           flecha_puntero_final.getElementsByClassName("underline")[0].removeEventListener("transitionend",  fpu);
 
          
//        });
    

 
//           lastChild.addEventListener("transitionend", function fn(){
 
//              const nodos = contenedor_nodos.children;
//              s1 = ((contenedor_nodos.offsetWidth - (nodos.length) * lastChild.offsetWidth) / (nodos.length+1));
//              s2 = (contenedor_nodos.offsetWidth - (nodos.length-1) * lastChild.offsetWidth) / (nodos.length);
             
                 
//                 setFlechaInicial(true , necesitaTransicion, s2)  

//                 setFlechasNodos(1 , 0, s1, s2)
    
 
//                 flecha_puntero_final.getElementsByClassName("underline")[0].classList.add("no-desplazar"); 
 
 
//        lastChild.removeEventListener("transitionend", fn);
 
 
//     });
 
 
 
//        firstChild.addEventListener("transitionend", function fnf(){
          
//           const nodos = getNodos();
//          const flechas = getFlechas();
         
//           sacarNodo(data);
//           for(var i=0; i < nodos.length; i++){
//              nodos[i].classList.add("no-mover");
//              nodos[i].style.left = 0+'px';
//           }  
 
//           sacarFlecha(flechas.length-1);
          
//           setTimeout(() => {
              
//              setFlechaFinal(true, necesitaTransicion);
 
 
//              for(var i=0; i < nodos.length; i++)
//                 nodos[i].classList.remove("no-mover");
 
 
//              }, 100);
 
//              lineaI.addEventListener("transitionend", function g(){

//                document.removeEventListener("click", handler,true);
//                agregar_comienzo.disabled = false;
//                agregar_final.disabled = false;
//                flecha_puntero_final.getElementsByClassName("underline")[0].classList.remove("no-desplazar"); 
//                lineaI.removeEventListener("transitionend", g);
//             });
            
//              firstChild.removeEventListener("transitionend", fnf);


 
//        });


   

// }


// export {borrarNodoAlComienzo};
// export {borrarNodoAlFinal};
// export {borrarUltimoNodo};



// RenderSacarNodo.ts
import { setPuntero, setFlechaFinal, setFlechaInicial } from "./ControladorInicializador.ts";
import { sacarNodo, getNodos } from "../contenedores/ContenedorNodos.ts";
import { sacarFlecha, getFlechas } from "../contenedores/ContenedorFlechas.ts";
import { setFlechasNodos, setFlechasNodos2 } from "./RenderFlechasNodos.ts";
import { renderizar } from "./ControladorBarraSuperior.ts";
import * as DOM from "../elementosDOM.ts"; // Tu core centralizado



const root = document.documentElement;

let necesitaTransicion: number;
let s1: number;
let s2: number;

/**
 * Handler seguro para capturar y congelar eventos durante las animaciones
 */
function handler(e: Event): void {
  e.stopPropagation();
  e.preventDefault();
}

/**
 * Helper para extraer sub-elementos internos de las flechas de forma estricta sin nulls
 */
function obtenerSubElemento(padre: HTMLElement, clase: string): HTMLElement {
  const el = padre.getElementsByClassName(clase)[0];
  if (!el) {
    throw new Error(`Error Estructural: No se encontró la clase .${clase} dentro del elemento.`);
  }
  return el as HTMLElement;
}

/* ==========================================================================
   1. BORRAR ÚLTIMO NODO (Cuando queda solo 1 en la lista)
   ========================================================================== */
export function borrarUltimoNodo(): void {
  if (!DOM.verificarDOM()) return;




  DOM.botonAgregar1erNodo.removeAttribute("hidden");
  DOM.botonAgregar1erNodo.disabled = true;
  DOM.agregarComienzo.setAttribute("hidden", "hidden");
  DOM.agregarFinal.setAttribute("hidden", "hidden");

  const ancho = DOM.principal.offsetWidth;
  DOM.principal.style.width = ancho + 'px';

  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    const altura = DOM.principal.offsetHeight; 
    root.style.setProperty("--principal-height", `${altura}px`);
  }

  document.addEventListener("click", handler, true);
  setFlechaFinal(false, 1);

  const ulFinal = obtenerSubElemento(DOM.flechaPunteroFinal, "underline");
  const ulInicial = obtenerSubElemento(DOM.flechaPunteroInicial, "underline");

  ulFinal.addEventListener("transitionend", function fbpn() {
    setFlechaInicial(false, 1);
    ulFinal.removeEventListener("transitionend", fbpn);
  });

  ulInicial.addEventListener("transitionend", function f2() {
    ulInicial.classList.remove("arrowend-first-ul");
    obtenerSubElemento(DOM.flechaPunteroInicial, "linea-s").classList.remove("arrowend-first");
    obtenerSubElemento(DOM.flechaPunteroInicial, "linea-i").classList.remove("arrowend-first");

    const angulo = 0;
    const fpiLeft = 0.05 * DOM.contenedorNodos.offsetWidth + DOM.str.offsetWidth;
    const fpiWidth = DOM.contenedorNodos.offsetWidth - 2 * fpiLeft;

    root.style.setProperty('--rotation-angle-fpi', `${angulo}deg`);
    root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
    root.style.setProperty('--punta-flecha-inicial-width', `20px`);
    root.style.setProperty('--punta-flecha-inicial-top', `-100px`);
    root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);

    setTimeout(() => {
      const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
      if (primerHijo) primerHijo.style.opacity = "0";
    }, 1000);

    ulInicial.removeEventListener("transitionend", f2);
  });

  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
  if (primerNodo) {
    primerNodo.addEventListener("transitionend", function f1() {
      sacarNodo(DOM.inputNodo.value);
      setPuntero(0);
      primerNodo.removeEventListener("transitionend", f1);
    });
  }

  DOM.str.addEventListener("transitionend", function f1() {
    DOM.botonAgregar1erNodo.disabled = false;
    document.removeEventListener("click", handler, true);
    renderizar();
    DOM.principal.removeAttribute("style");
    DOM.str.removeEventListener("transitionend", f1); // Corregido typo nativo 'transitioned'
  });
}

/* ==========================================================================
   2. BORRAR NODO AL COMIENZO
   ========================================================================== */
export function borrarNodoAlComienzo(data: string): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;


  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];

  const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  s1 = ((DOM.contenedorNodos.offsetWidth - (nodos.length) * ultimoHijo.offsetWidth) / (nodos.length + 1));
  s2 = ((DOM.contenedorNodos.offsetWidth - (nodos.length + 1) * ultimoHijo.offsetWidth) / (nodos.length + 2));

  if (DOM.contenedorNodos.childElementCount >= 5) {
    document.body.removeAttribute("style");
    renderizar();
  }

  const ancho = DOM.principal.offsetWidth;
  DOM.principal.style.width = ancho + 'px';

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;

  const flechaObjetivo = flechas[0];
  if (flechaObjetivo) {
    const ul = obtenerSubElemento(flechaObjetivo, "underline");
    const ls = obtenerSubElemento(flechaObjetivo, "linea-s");
    const li = obtenerSubElemento(flechaObjetivo, "linea-i");

    ul.classList.remove("inmediato");
    ls.classList.remove("inmediato");
    li.classList.remove("inmediato");
    ul.classList.add("arrowend-first-ul");
    ls.classList.add("arrowend-first");
    li.classList.add("arrowend-first");

    setTimeout(() => {
      ul.style.width = '0px';
      ls.style.width = '0px';
      li.style.width = '0px';
    }, 100);

    ul.addEventListener("transitionend", function fu() {
      necesitaTransicion = 1;
      setFlechaInicial(false, necesitaTransicion);
      ul.removeEventListener("transitionend", fu);
    });
  }

  const ulInicial = obtenerSubElemento(DOM.flechaPunteroInicial, "underline");
  ulInicial.addEventListener("transitionend", function fpu() {
    setTimeout(() => {
      const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
      if (primerHijo) {
        primerHijo.classList.remove("inmediato-nodo");
        primerHijo.style.opacity = "0";
      }
    }, 1100);

    const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
    if (primerHijo) {
      primerHijo.addEventListener("transitionend", function fn() {
        const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
        s1 = ((DOM.contenedorNodos.offsetWidth - (nodos.length) * nodoUltimo.offsetWidth) / (nodos.length + 1));
        s2 = (DOM.contenedorNodos.offsetWidth - (nodos.length - 1) * nodoUltimo.offsetWidth) / (nodos.length);

        setFlechaFinal(true, necesitaTransicion, s2);
        setFlechasNodos(necesitaTransicion, 1, s1, s2);
        primerHijo.removeEventListener("transitionend", fn);
      });
    }
    ulInicial.removeEventListener("transitionend", fpu);
  });

  const ultimoHijoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  if (ultimoHijoNodo) {
    ultimoHijoNodo.addEventListener("transitionend", function fnf() {
      sacarNodo(data);

      for (let i = 0; i < nodos.length; i++) {
        nodos[i].classList.add("no-mover");
        nodos[i].style.left = '0px';
      }

      sacarFlecha(0);

      setTimeout(() => {
        setFlechaInicial(true, necesitaTransicion);
        for (let i = 0; i < nodos.length; i++) {
          nodos[i].classList.remove("no-mover");
        }
      }, 1000);

      const ulInicialLast = DOM.flechaPunteroInicial.lastElementChild as HTMLElement;
      if (ulInicialLast) {
        ulInicialLast.addEventListener("transitionend", function g() {
          document.removeEventListener("click", handler, true);
          DOM.agregarComienzo.disabled = false;
          DOM.agregarFinal.disabled = false;

          if (window.innerWidth !== (DOM.principal.offsetWidth + 33)) {
            DOM.principal.removeAttribute("style");
            renderizar();
          } else {
            DOM.principal.removeAttribute("style");
          }

          if (DOM.contenedorNodos.childElementCount > 1) {
            if (DOM.selectorPares.lastChild) {
              DOM.selectorPares.removeChild(DOM.selectorPares.lastChild);
            }
          }
          ulInicialLast.removeEventListener("transitionend", g);
        });
      }
      ultimoHijoNodo.removeEventListener("transitionend", fnf);
    });
  }
}

/* ==========================================================================
   3. BORRAR NODO INTERMEDIO
   ========================================================================== */
export function borrarNodoIntermedio(data: string, indice: number): void {
  
  if (!DOM.verificarDOM()) return;


  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];

  const flechaActual = flechas[indice];
  const flechaPrevia = flechas[indice - 1];

  if (!flechaActual || !flechaPrevia) return;

  const ul = obtenerSubElemento(flechaActual, "underline");
  const ls = obtenerSubElemento(flechaActual, "linea-s");
  const li = obtenerSubElemento(flechaActual, "linea-i");

  ul.classList.remove("inmediato");
  ls.classList.remove("inmediato");
  li.classList.remove("inmediato");

  const ul2 = obtenerSubElemento(flechaPrevia, "underline");
  const ls2 = obtenerSubElemento(flechaPrevia, "linea-s");
  const li2 = obtenerSubElemento(flechaPrevia, "linea-i");

  ul2.classList.remove("inmediato");
  ls2.classList.remove("inmediato");
  li2.classList.remove("inmediato");

  setTimeout(() => {
    ul.style.width = '0px';
    ls.style.width = '0px';
    li.style.width = '0px';
    ul.classList.add("arrowend-first-ul");
    ls.classList.add("arrowend-first");
    li.classList.add("arrowend-first");
  }, 100);

  ul.addEventListener("transitionend", function jj() {
    setTimeout(() => {
      ul2.style.width = '0px';
      ls2.style.width = '0px';
      ls2.style.width = '0px';
      ul2.classList.add("arrowend-first-ul");
      ls2.classList.add("arrowend-first");
      li2.classList.add("arrowend-first");
    }, 100);

    ul2.addEventListener("transitionend", function jj2() {
      const listaNodos = DOM.contenedorNodos.children;
      setTimeout(() => {
        const nodoObjetivo = listaNodos[indice] as HTMLElement;
        if (nodoObjetivo) {
          nodoObjetivo.classList.remove("inmediato-nodo");
          nodoObjetivo.style.opacity = "0";
        }
      }, 1100);
      ul2.removeEventListener("transitionend", jj2);
    });
    ul.removeEventListener("transitionend", jj);
  });

  const nodoIndexado = nodos[indice];
  if (nodoIndexado) {
    nodoIndexado.addEventListener("transitionend", function fn() {
      const listaNodos = DOM.contenedorNodos.children;
      const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
      
      s1 = ((DOM.contenedorNodos.offsetWidth - (listaNodos.length) * ultimoNodo.offsetWidth) / (listaNodos.length + 1));
      s2 = (DOM.contenedorNodos.offsetWidth - (listaNodos.length - 1) * ultimoNodo.offsetWidth) / (listaNodos.length);

      setFlechaInicial(true, necesitaTransicion, s2);
      setFlechaFinal(true, necesitaTransicion, s2);
      setFlechasNodos2(indice + 2, s1, s2);

      obtenerSubElemento(DOM.flechaPunteroFinal, "underline").classList.add("no-desplazar");
      nodoIndexado.removeEventListener("transitionend", fn);
    });
  }

  const primerHijoNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
  if (primerHijoNodo) {
    primerHijoNodo.addEventListener("transitionend", function nald() {
      sacarNodo(data);
      for (let i = 0; i < nodos.length; i++) {
        nodos[i].classList.add("no-mover");
        nodos[i].style.left = '0px';
      }

      sacarFlecha(indice);

      for (const flecha of flechas) {
        if (flecha.style.left !== "") flecha.removeAttribute("style");
      }

      setTimeout(() => {
        ul2.removeAttribute("style");
        ls2.removeAttribute("style");
        li2.removeAttribute("style");
        ul2.classList.remove("arrowend-first-ul");
        ls2.classList.remove("arrowend-first");
        li2.classList.remove("arrowend-first");

        for (let i = 0; i < nodos.length; i++) {
          nodos[i].classList.remove("no-mover");
        }
      }, 100);

      if (DOM.contenedorNodos.childElementCount > 1) {
        if (DOM.selectorPares.lastChild) {
          DOM.selectorPares.removeChild(DOM.selectorPares.lastChild);
        }
      }
      primerHijoNodo.removeEventListener("transitionend", nald);
    });
  }
}

/* ==========================================================================
   4. BORRAR NODO AL FINAL
   ========================================================================== */
export function borrarNodoAlFinal(data: string): void {
  if (!DOM.verificarDOM()) return;


  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];

  const ancho = DOM.principal.offsetWidth;
  DOM.principal.style.width = ancho + 'px';

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaFinal(false, necesitaTransicion);

  const ulFinal = obtenerSubElemento(DOM.flechaPunteroFinal, "underline");
  ulFinal.addEventListener("transitionend", function fpu() {
    const flechaUltima = flechas[flechas.length - 1];
    if (flechaUltima) {
      const ul = obtenerSubElemento(flechaUltima, "underline");
      const ls = obtenerSubElemento(flechaUltima, "linea-s");
      const li = obtenerSubElemento(flechaUltima, "linea-i");

      ul.classList.remove("inmediato");

      setTimeout(() => {
        ul.style.width = '0px';
        ls.style.width = '0px';
        li.style.width = '0px';
        ul.classList.add("arrowend-first-ul");
        ls.classList.add("arrowend-first");
        li.classList.add("arrowend-first");
      }, 100);

      ul.addEventListener("transitionend", function fu() {
        setTimeout(() => {
          const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
          if (ultimoHijo) {
            ultimoHijo.classList.remove("inmediato-nodo");
            ultimoHijo.style.opacity = "0";
          }
        }, 1100);
        ul.removeEventListener("transitionend", fu);
      });
    }
    ulFinal.removeEventListener("transitionend", fpu);
  });

  const ultimoHijoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  if (ultimoHijoNodo) {
    ultimoHijoNodo.addEventListener("transitionend", function fn() {
      const listaNodos = DOM.contenedorNodos.children;
      const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

      s1 = ((DOM.contenedorNodos.offsetWidth - (listaNodos.length) * nodoUltimo.offsetWidth) / (listaNodos.length + 1));
      s2 = (DOM.contenedorNodos.offsetWidth - (listaNodos.length - 1) * nodoUltimo.offsetWidth) / (listaNodos.length);

      setFlechaInicial(true, necesitaTransicion, s2);
      setFlechasNodos(1, 0, s1, s2);

      obtenerSubElemento(DOM.flechaPunteroFinal, "underline").classList.add("no-desplazar");
      ultimoHijoNodo.removeEventListener("transitionend", fn);
    });
  }

  const primerHijoNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
  if (primerHijoNodo) {
    primerHijoNodo.addEventListener("transitionend", function fnf() {
      sacarNodo(data);
      for (let i = 0; i < nodos.length; i++) {
        nodos[i].classList.add("no-mover");
        nodos[i].style.left = '0px';
      }

      sacarFlecha(flechas.length - 1);

      setTimeout(() => {
        setFlechaFinal(true, necesitaTransicion);
        for (let i = 0; i < nodos.length; i++) {
          nodos[i].classList.remove("no-mover");
        }
      }, 100);

      const fpfLast = DOM.flechaPunteroFinal.lastElementChild as HTMLElement;
      if (fpfLast) {
        fpfLast.addEventListener("transitionend", function g() {
          document.removeEventListener("click", handler, true);
          DOM.agregarComienzo.disabled = false;
          DOM.agregarFinal.disabled = false;
          obtenerSubElemento(DOM.flechaPunteroFinal, "underline").classList.remove("no-desplazar");

          if (window.innerWidth !== (DOM.principal.offsetWidth + 33)) {
            DOM.principal.removeAttribute("style");
            renderizar();
          } else {
            DOM.principal.removeAttribute("style");
          }

          if (DOM.contenedorNodos.childElementCount > 1) {
            if (DOM.selectorPares.lastChild) {
              DOM.selectorPares.removeChild(DOM.selectorPares.lastChild);
            }
          }
          fpfLast.removeEventListener("transitionend", g);
        });
      }
      primerHijoNodo.removeEventListener("transitionend", fnf);
    });
  }
}
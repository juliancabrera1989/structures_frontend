function crearFlecha() : HTMLDivElement {
    const flecha = document.createElement("div");
    const linea = document.createElement("div");
    const flecha_s = document.createElement("div");
    const flecha_i = document.createElement("div");
    flecha.className = "arrow"
    linea.className = "underline";
    flecha_s.className = "linea-s";
    flecha_i.className = "linea-i";
    linea.style.width = 0+'px';
    flecha_s.style.width = 0+'px';
    flecha_i.style.width = 0+'px';
    flecha.appendChild(linea);
    flecha.appendChild(flecha_s);
    flecha.appendChild(flecha_i);
    return flecha;
 }




// function getFlechas(): HTMLCollectionOf<Element> {
//   // Si React no montó el DOM todavía (por seguridad), tiramos un array vacío o cortamos
//   if (!verificarDOM() || !contenedorFlechas) {
//     return document.getElementsByClassName("empty-collection"); 
//   }

//   // Como ya sabemos al 100% que existe gracias a la centralización,
//   // la CPU va directo a las flechas sin buscar el contenedor otra vez.
//   return contenedorFlechas.getElementsByClassName("arrow");
// }

 export { crearFlecha }


//  export {getFlechas} 
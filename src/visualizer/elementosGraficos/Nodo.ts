
function crearNodo(
   data: string 
): HTMLDivElement {
    const elemento = document.createElement("div") ;
    const valorNodo = document.createElement("div");
    const circulo = document.createElement("div");
    elemento.classList.add("caja-nodo");
    valorNodo.className = "valor-nodo";
    circulo.className = "circle";
    valorNodo.innerText = data;  
    elemento.appendChild(valorNodo);
    elemento.appendChild(circulo);
    elemento.style.left=0+'px';
    elemento.style.opacity = "0";

    return elemento;
 }



 export { crearNodo }
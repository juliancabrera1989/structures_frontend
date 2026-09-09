
// function crearNodo(
//    data: string 
// ): HTMLDivElement {
//     const elemento = document.createElement("div") ;
//     const valorNodo = document.createElement("div");
//     const circulo = document.createElement("div");
//     elemento.classList.add("caja-nodo");
//     valorNodo.className = "valor-nodo";
//     circulo.className = "circle";
//     valorNodo.innerText = data;  
//     elemento.appendChild(valorNodo);
//     elemento.appendChild(circulo);
//     elemento.style.left=0+'px';
//     elemento.style.opacity = "0";

//     return elemento;
//  }



//  export { crearNodo }


// function crearNodo(
//     data: string 
// ): HTMLDivElement {
//     const elemento = document.createElement("div");
//     const valorNodo = document.createElement("div");
//     const circulo = document.createElement("div");
    
//     elemento.classList.add("caja-nodo");
//     valorNodo.className = "valor-nodo";
//     circulo.className = "circle";
    
//     valorNodo.innerText = data; 
    
//     // 💡 CONDICIONAL: Solo asigna tooltip/hover si el string supera los 8 caracteres 
//     // (evita sobrecarga en números, chars o strings cortos)
//     if (data && data.length > 8) {
//         valorNodo.title = data;
//         valorNodo.style.cursor = "help"; // Opcional: indica visualmente que hay más información
//     }
    
//     elemento.appendChild(valorNodo);
//     elemento.appendChild(circulo);
//     elemento.style.left = '0px';
//     elemento.style.opacity = "0";

//     return elemento;
// }

// export { crearNodo };


// function crearNodo(
//     data: string 
// ): HTMLDivElement {
//     const elemento = document.createElement("div");
//     const valorNodo = document.createElement("div");
//     const textoSpan = document.createElement("span"); // 👈 Contenedor para animación marquee
//     const circulo = document.createElement("div");
    
//     elemento.classList.add("caja-nodo");
//     valorNodo.className = "valor-nodo";
//     textoSpan.className = "texto-marquee";
//     circulo.className = "circle";
    
//     textoSpan.innerText = data;
//     valorNodo.appendChild(textoSpan);

//     // Si el texto es largo, activamos el tooltip y la clase de animación marquee
//     if (data && data.length > 8) {
//         valorNodo.title = data;
//         textoSpan.classList.add("animar-marquee");
//     }
    
//     elemento.appendChild(valorNodo);
//     elemento.appendChild(circulo);
//     elemento.style.left = '0px';
//     elemento.style.opacity = "0";

//     return elemento;
// }

// export { crearNodo };


function crearNodo(data: string): HTMLDivElement {
    const elemento = document.createElement("div");
    const valorNodo = document.createElement("div");
    const textoSpan = document.createElement("span");
    const circulo = document.createElement("div");
    
    elemento.classList.add("caja-nodo");
    valorNodo.className = "valor-nodo";
    textoSpan.className = "texto-marquee";
    circulo.className = "circle";
    
    textoSpan.innerText = data;
    valorNodo.appendChild(textoSpan);

    // 💡 EL HOVER NATIVO SE MANTIENE ACÁ:
    if (data && data.length > 8) {
        valorNodo.title = data; // 👈 Muestra el tooltip con el texto completo
        textoSpan.classList.add("animar-marquee");
    }
    
    elemento.appendChild(valorNodo);
    elemento.appendChild(circulo);
    elemento.style.left = '0px';
    elemento.style.opacity = "0";

    return elemento;
}

export { crearNodo };
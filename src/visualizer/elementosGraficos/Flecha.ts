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



 export { crearFlecha }



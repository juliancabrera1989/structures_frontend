function ElementManager() {
  return (
    <div id="barra_superior">
      <button type="button" id="inicializar">Inicializar lista enlazada</button>
      <span hidden id="texto">Elija el id del siguiente nodo de la lista a agregar ----</span>
      
      <input type="text" name="nodo" id="nodo" hidden />
      <button type="button" id="agregar_1er_nodo" hidden>Agregar primer nodo</button>
      <button type="button" id="agregar_comienzo" hidden>Agregar al comienzo</button>
      <button type="button" id="agregar_final" hidden>Agregar al final</button>
      <button type="button" id="borrar_comienzo" hidden>Borrar al comienzo</button>
      <button type="button" id="borrar_final" hidden>Borrar al final</button>
      <br />
      <span id="texto-selector" hidden>Puede agregar un nodo en algun lugar intermedio de la lista, ¿en donde lo desea agregar?: </span>
      <select name="" id="selector-pares" hidden></select>
      <button type="button" id="agregar_intermedio" hidden>Agregar</button>
    </div>
  );
}

export default ElementManager;


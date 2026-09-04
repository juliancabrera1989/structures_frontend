import "../../visualizer/estilos/clasesEspeciales.css";
import "../../visualizer/estilos/principal.css";


function VisualizationTool() {
  return (
    <>
      <div id="principal_wrapper"> 
        <div id="principal">
            <div id="contenedor_nodos"></div>
            <div id="inicializador">
                <div id="str"  hidden="hidden">StrPtr</div>
                <div id="flecha_puntero_inicial"></div>
                <div id="flecha_puntero_previo"></div>
                <div id="flecha_puntero_actual"></div>
                <div id="flecha_puntero_nuevo"></div>
                <div id="flecha_puntero_final"></div>
                <div id="nulo" hidden="hidden">NULL</div>
            </div>
            <div id="contenedor_flechas"></div>
            <div id="contenedor_flechas_curvas"></div>
        </div>
    </div>
    </>
  );
}

export default VisualizationTool;

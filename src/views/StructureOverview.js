// import React, { useState } from 'react';
// import StructureList from '../components/structureOverview/StructureList';
// import StructureVisualizer from '../components/structureOverview/StructureVisualizer';

// const StructureOverview = () => {
//     const [selectedStructure, setSelectedStructure] = useState(null);

//     const structures = [
//         { name: 'Linked List', elements: [1, 2, 3] },
//         { name: 'Stack', elements: [4, 5, 6] },
//     ];

//     return (
//         <div>
//             <h1>Structure Overview</h1>
//             <StructureList 
//                 structures={structures} 
//                 onSelect={setSelectedStructure} 
//             />
//             {selectedStructure && (
//                 <StructureVisualizer structure={selectedStructure} />
//             )}
//         </div>
//     );
// };

// export default StructureOverview;



import React from 'react';
import { Container } from 'react-bootstrap';
import StructureList from '../components/structureOverview/StructureList';

const StructureOverview = () => {
  return (
    <Container className="mt-5 text-light">
      <div className="border-bottom border-secondary pb-3 mb-5 text-center">
        <h2 className="fw-bold text-info">Catálogo de Estructuras</h2>
        <p className="text-secondary mb-0">
          Selecciona una plantilla para inicializarla directamente en el lienzo del visualizador interactivo.
        </p>
      </div>

      <StructureList />
    </Container>
  );
};

export default StructureOverview;
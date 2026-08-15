// import React from 'react';

// const ResourceCenter = () => {
//     return (
//         <div>
//             <h1>Resource Center</h1>
//             <p>Documentation, video tutorials, and external resources will be available here.</p>
//             {/* Implement resource lists and details as needed */}
//         </div>
//     );
// };

// export default ResourceCenter;


// import React from "react";
// import DocumentationList from "../components/resourceCenter/DocumentationList";
// import VideoTutorialList from "../components/resourceCenter/VideoTutorialList";
// import ExternalResourceList from "../components/resourceCenter/ExternalResourceList";

// const ResourceCenter = () => {
//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Resource Center</h2>

//       <div className="mb-5">
//         <h4 className="mb-3">📘 Documentation</h4>
//         <DocumentationList />
//       </div>

//       <div className="mb-5">
//         <h4 className="mb-3">🎥 Video Tutorials</h4>
//         <VideoTutorialList />
//       </div>

//       <div className="mb-5">
//         <h4 className="mb-3">🌍 External Resources</h4>
//         <ExternalResourceList />
//       </div>
//     </div>
//   );
// };

// export default ResourceCenter;


import React from "react";
import DocumentationList from "../components/resourceCenter/DocumentationList";
import VideoTutorialList from "../components/resourceCenter/VideoTutorialList";
import ExternalResourceList from "../components/resourceCenter/ExternalResourceList";

const ResourceCenter = () => {
  return (
    <div className="container mt-5 text-light">
      <div className="border-bottom border-secondary pb-3 mb-5 text-center">
        <h2 className="fw-bold text-info">Resource Center</h2>
        <p className="text-secondary mb-0">
          Aprende los fundamentos teóricos, aplicaciones reales en compiladores/grafos y tutoriales de apoyo.
        </p>
      </div>

      <div className="mb-5">
        <h4 className="mb-3 text-warning">📘 Documentación & Guías Teóricas</h4>
        <DocumentationList />
      </div>

      <div className="mb-5">
        <h4 className="mb-3 text-warning">🎥 Video Tutoriales</h4>
        <VideoTutorialList />
      </div>

      <div className="mb-5">
        <h4 className="mb-3 text-warning">🌍 Recursos Externos & Documentación Oficial</h4>
        <ExternalResourceList />
      </div>
    </div>
  );
};

export default ResourceCenter;
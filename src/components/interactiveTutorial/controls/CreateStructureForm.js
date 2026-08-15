// import React, { useState } from 'react';

// const CreateStructureForm = ({ onCreate }) => {
//     const [structureName, setStructureName] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onCreate(structureName);
//         setStructureName('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Name your Data Structure:</label>
//                 <input 
//                     type="text" 
//                     value={structureName} 
//                     onChange={(e) => setStructureName(e.target.value)} 
//                 />
//             </div>
//             <button type="submit">Create</button>
//         </form>
//     );
// };

// export default CreateStructureForm;


// import React, { useState } from 'react';

// const CreateStructureForm = ({ onCreate }) => {
//   const [structureName, setStructureName] = useState('');
//   const [structureType, setStructureType] = useState('linkedlist');
//   const [dataType, setDataType] = useState('number');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onCreate({
//       name: structureName,
//       type: structureType,
//       dataType: dataType,
//     });

//     // Reset form
//     setStructureName('');
//     setStructureType('linkedlist');
//     setDataType('number');
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
//       <div>
//         <label>Name your Data Structure: </label>
//         <input
//           type="text"
//           value={structureName}
//           onChange={(e) => setStructureName(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Choose Structure Type: </label>
//         <select
//           value={structureType}
//           onChange={(e) => setStructureType(e.target.value)}
//         >
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>
//       </div>

//       <div>
//         <label>Choose Data Type: </label>
//         <select
//           value={dataType}
//           onChange={(e) => setDataType(e.target.value)}
//         >
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>
//       </div>

//       <button type="submit">Create</button>
//     </form>
//   );
// };

// export default CreateStructureForm;


// import React, { useState } from "react";

// const CreateStructureForm = ({ onInitialize }) => {
//   const [structureName, setStructureName] = useState("");
//   const [structureType, setStructureType] = useState("linkedlist");
//   const [dataType, setDataType] = useState("number");

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   onInitialize({
//   //     name: structureName,
//   //     type: structureType,
//   //     dataType: dataType,
//   //   });

//   //   setStructureName("");
//   //   setStructureType("linkedlist");
//   //   setDataType("number");
//   // };


//   const handleInitialize = (e) => {
//     e.preventDefault();
//     if (onInitialize) onInitialize(); // tells the visualizer to init
//   };

//   return (
//     //<form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
//     <form onSubmit={handleInitialize} style={{ marginBottom: "1rem" }}>
//       <div>
//         <label>Name your Data Structure: </label>
//         <input
//           type="text"
//           value={structureName}
//           onChange={(e) => setStructureName(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Choose Structure Type: </label>
//         <select
//           value={structureType}
//           onChange={(e) => setStructureType(e.target.value)}
//         >
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>
//       </div>

//       <div>
//         <label>Choose Data Type: </label>
//         <select
//           value={dataType}
//           onChange={(e) => setDataType(e.target.value)}
//         >
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>
//       </div>

//       <button type="submit">Initialize Structure</button>
//     </form>
//   );
// };

// export default CreateStructureForm;



// import React, { useState } from "react";

// const CreateStructureForm = ({ onInitialize }) => {
//   const [structureName, setStructureName] = useState("");
//   const [structureType, setStructureType] = useState("linkedlist");
//   const [dataType, setDataType] = useState("number");

//   const handleInitialize = (e) => {
//     e.preventDefault();
//     if (onInitialize) {
//       onInitialize({ structureType, dataType, name: structureName });
//     }
//   };

//   return (
//     <form onSubmit={handleInitialize} style={{ marginBottom: "1rem" }}>
//       <div>
//         <label>Name your Data Structure: </label>
//         <input
//           type="text"
//           value={structureName}
//           onChange={(e) => setStructureName(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Choose Structure Type: </label>
//         <select
//           value={structureType}
//           onChange={(e) => setStructureType(e.target.value)}
//         >
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>
//       </div>

//       <div>
//         <label>Choose Data Type: </label>
//         <select
//           value={dataType}
//           onChange={(e) => setDataType(e.target.value)}
//         >
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>
//       </div>

//       <button type="submit">Initialize Structure</button>
//     </form>
//   );
// };

// export default CreateStructureForm;





// // CreateStructureForm.js
// import React, { useState } from "react";

// const CreateStructureForm = ({ onInitialize }) => {
//   const [structureName, setStructureName] = useState("");
//   const [structureType, setStructureType] = useState("linkedlist");
//   const [dataType, setDataType] = useState("number");

//   const handleInitialize = (e) => {
//     e.preventDefault();
//     if (onInitialize) onInitialize({ structureType, dataType, structureName });
//   };

//   return (
//     <form onSubmit={handleInitialize} style={{ marginBottom: "1rem" }}>
//       <div>
//         <label>Name your Data Structure: </label>
//         <input
//           type="text"
//           value={structureName}
//           onChange={(e) => setStructureName(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Choose Structure Type: </label>
//         <select
//           value={structureType}
//           onChange={(e) => setStructureType(e.target.value)}
//         >
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>
//       </div>

//       <div>
//         <label>Choose Data Type: </label>
//         <select
//           value={dataType}
//           onChange={(e) => setDataType(e.target.value)}
//         >
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>
//       </div>

//       <button type="submit">Initialize Structure</button>
//     </form>
//   );
// };

// export default CreateStructureForm;





// import React, { useState } from "react";

// const CreateStructureForm = ({ onInitialize }) => {
//   const [structureName, setStructureName] = useState("");
//   const [structureType, setStructureType] = useState("linkedlist");
//   const [dataType, setDataType] = useState("number");

//   const handleInitialize = (e) => {
//     e.preventDefault();
//     if (onInitialize) onInitialize(); // triggers visualization
//   };

//   return (
//     <form onSubmit={handleInitialize} style={{ marginBottom: "1rem" }}>
//       <div>
//         <label>Name your Data Structure: </label>
//         <input
//           type="text"
//           value={structureName}
//           onChange={(e) => setStructureName(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Choose Structure Type: </label>
//         <select
//           value={structureType}
//           onChange={(e) => setStructureType(e.target.value)}
//         >
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>
//       </div>

//       <div>
//         <label>Choose Data Type: </label>
//         <select
//           value={dataType}
//           onChange={(e) => setDataType(e.target.value)}
//         >
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>
//       </div>

//       <button type="submit">Initialize Structure</button>
//     </form>
//   );
// };

// export default CreateStructureForm;






// import React, { useState } from "react";

// const CreateStructureForm = ({ onInitialize }) => {
//   const [structureName, setStructureName] = useState("");
//   const [structureType, setStructureType] = useState("linkedlist");
//   const [dataType, setDataType] = useState("number");

//   const handleInitialize = (e) => {
//     e.preventDefault();
//     if (onInitialize) onInitialize(); // triggers visualization
//   };

//   return (
//     <form onSubmit={handleInitialize} style={{ marginBottom: "1rem" }}>
//       <div>
//         <label>Name your Data Structure: </label>
//         <input
//           type="text"
//           value={structureName}
//           onChange={(e) => setStructureName(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Choose Structure Type: </label>
//         <select
//           value={structureType}
//           onChange={(e) => setStructureType(e.target.value)}
//         >
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>
//       </div>

//       <div>
//         <label>Choose Data Type: </label>
//         <select
//           value={dataType}
//           onChange={(e) => setDataType(e.target.value)}
//         >
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>
//       </div>

//       <button type="submit">Initialize Structure</button>
//     </form>
//   );
// };

// export default CreateStructureForm;





// import React, { useState } from "react";

// const CreateStructureForm = ({ onInitialize }) => {
//   const [structureName, setStructureName] = useState("");
//   const [structureType, setStructureType] = useState("linkedlist");
//   const [dataType, setDataType] = useState("number");

//   const handleInitialize = (e) => {
//     e.preventDefault();
//     if (onInitialize) onInitialize(); // triggers the button behavior
//   };

//   return (
//     <form onSubmit={handleInitialize} style={{ marginBottom: "1rem" }}>
//       <div>
//         <label>Name your Data Structure: </label>
//         <input
//           type="text"
//           value={structureName}
//           onChange={(e) => setStructureName(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Choose Structure Type: </label>
//         <select
//           value={structureType}
//           onChange={(e) => setStructureType(e.target.value)}
//         >
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>
//       </div>

//       <div>
//         <label>Choose Data Type: </label>
//         <select
//           value={dataType}
//           onChange={(e) => setDataType(e.target.value)}
//         >
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>
//       </div>

//       <button type="submit">Initialize Structure</button>
//     </form>
//   );
// };

// export default CreateStructureForm;


import React, { useState } from "react";

const CreateStructureForm = () => {
  const [structureName, setStructureName] = useState("");
  const [structureType, setStructureType] = useState("linkedlist");
  const [dataType, setDataType] = useState("number");

  // no submit handler — the actual "initialize" button lives in ElementManager
  return (
    <form style={{ marginBottom: "1rem" }}>
      <div>
        <label>Name your Data Structure: </label>
        <input
          type="text"
          value={structureName}
          onChange={(e) => setStructureName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Choose Structure Type: </label>
        <select
          value={structureType}
          onChange={(e) => setStructureType(e.target.value)}
        >
          <option value="linkedlist">Linked List</option>
          <option value="doublylinkedlist">Doubly Linked List</option>
          <option value="stack">Stack</option>
          <option value="queue">Queue</option>
          <option value="deque">Double-Ended Queue</option>
        </select>
      </div>

      <div>
        <label>Choose Data Type: </label>
        <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
          <option value="number">Numbers</option>
          <option value="letter">Letters</option>
          <option value="string">Strings</option>
        </select>
      </div>

      {/* no initialize button here — it is the vanilla controller's job */}
    </form>
  );
};

export default CreateStructureForm;

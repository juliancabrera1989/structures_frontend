// import React from 'react';
// import { useAuth } from '../../context/authContext';
// import UserProfile from './UserProfile';
// import SavedDataStructures from './SavedDataStructures';


// const Dashboard = ({ dataStructures }) => {
//   const { auth , logout} = useAuth();
//   console.log(auth.token);
//   console.log(dataStructures);
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <div>Puta madre</div>
//       <UserProfile user={auth.token} />
//       <SavedDataStructures dataStructures={dataStructures} />
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

// export default Dashboard;


// import React from 'react';
// import { useAuth } from '../../context/authContext';
// import UserProfile from './UserProfile';
// import SavedDataStructures from './SavedDataStructures';
// import { Container, Button } from 'react-bootstrap';

// const Dashboard = ({ dataStructures }) => {
//   const { auth, logout } = useAuth();

//   return (
//     <Container className="py-4 text-light">
//       <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
//         <h2 className="mb-0 fw-bold">Dashboard</h2>
//         <Button variant="outline-danger" size="sm" onClick={logout}>
//           Cerrar Sesión
//         </Button>
//       </div>

//       <UserProfile user={auth?.token} />
//       <SavedDataStructures dataStructures={dataStructures} />
//     </Container>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/authContext';
// import UserProfile from './UserProfile';
// import SavedDataStructures from './SavedDataStructures';
// import { Container, Button, Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const { auth, logout } = useAuth();
//   const [dataStructures, setDataStructures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStructures = async () => {
//       try {
//         // Ajustá la URL según tu puerto y endpoint del Backend
//         const response = await fetch('http://localhost:5000/api/structures', {
//           headers: {
//             'Authorization': `Bearer ${auth.token}`
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setDataStructures(data);
//         }
//       } catch (error) {
//         console.error("Error al cargar estructuras:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (auth?.token) {
//       fetchStructures();
//     }
//   }, [auth]);

//   // Función para redirigir al visualizador con la estructura seleccionada
//   const handleLoadStructure = (id) => {
//     navigate(`/interactive-tutorial?id=${id}`);
//   };

//   // Función para eliminar una estructura
//   const handleDeleteStructure = async (id) => {
//     if (!window.confirm("¿Seguro que querés eliminar esta estructura?")) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/structures/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${auth.token}`
//         }
//       });

//       if (response.ok) {
//         // Filtramos del estado local para que desaparezca al instante de la tabla
//         setDataStructures(prev => prev.filter(s => (s._id || s.id) !== id));
//       }
//     } catch (error) {
//       console.error("Error al eliminar la estructura:", error);
//     }
//   };

//   return (
//     <Container className="py-4 text-light">
//       <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
//         <h2 className="mb-0 fw-bold">Dashboard</h2>
//         <Button variant="outline-danger" size="sm" onClick={logout}>
//           Cerrar Sesión
//         </Button>
//       </div>

//       <UserProfile user={auth?.token} />

//       {loading ? (
//         <div className="text-center my-5">
//           <Spinner animation="border" variant="info" />
//           <p className="mt-2 text-secondary">Cargando tus estructuras...</p>
//         </div>
//       ) : (
//         <SavedDataStructures 
//           dataStructures={dataStructures} 
//           onLoad={handleLoadStructure}
//           onDelete={handleDeleteStructure}
//         />
//       )}
//     </Container>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/authContext';
// import UserProfile from './UserProfile';
// import SavedDataStructures from './SavedDataStructures';
// import { Container, Button, Spinner } from 'react-bootstrap';

// const Dashboard = () => {
//   const { auth, logout } = useAuth();
//   const [dataStructures, setDataStructures] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStructures = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/structures', {
//           headers: {
//             'Authorization': `Bearer ${auth.token}`
//           }
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setDataStructures(data);
//         }
//       } catch (error) {
//         console.error("Error al obtener estructuras:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (auth?.token) {
//       fetchStructures();
//     }
//   }, [auth]);

//   return (
//     <Container className="py-4 text-light">
//       <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
//         <h2 className="mb-0 fw-bold">Dashboard</h2>
//         <Button variant="outline-danger" size="sm" onClick={logout}>
//           Cerrar Sesión
//         </Button>
//       </div>

//       <UserProfile user={auth?.token} />

//       {loading ? (
//         <div className="text-center my-4">
//           <Spinner animation="border" variant="info" />
//         </div>
//       ) : (
//         <SavedDataStructures dataStructures={dataStructures} />
//       )}
//     </Container>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SavedDataStructures from './SavedDataStructures';

// function Dashboard() {
//   const [dataStructures, setDataStructures] = useState([]);
//   const navigate = useNavigate();

//   // 1. Manejador para cargar la estructura en el visualizador
//   const handleLoad = (id) => {
//     // Buscamos la estructura completa por su ID dentro de nuestro estado
//     const structureToLoad = dataStructures.find((item) => (item._id || item.id) === id);

//     if (structureToLoad) {
//       // Redirigimos al InteractiveTutorial enviando el tipo y los nodos guardados en MongoDB
//       navigate('/interactive-tutorial', {
//         state: {
//           type: structureToLoad.type,
//           nodes: structureToLoad.nodes || structureToLoad.data || [] // Ajustá según el nombre de tu propiedad en DB
//         }
//       });
//     }
//   };

//   // 2. Manejador para eliminar la estructura de MongoDB
//   const handleDelete = async (id) => {
//     // Tu lógica de eliminación (fetch/axios DELETE...)
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Dashboard</h2>
      
//       {/* 🟢 CORRECCIÓN DEL ORIGEN: Pasamos las funciones explícitamente */}
//       <SavedDataStructures 
//         dataStructures={dataStructures} 
//         onLoad={handleLoad} 
//         onDelete={handleDelete} 
//       />
//     </div>
//   );
// }

// export default Dashboard;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos useNavigate
import { useAuth } from '../../context/authContext';
import UserProfile from './UserProfile';
import SavedDataStructures from './SavedDataStructures';
import { Container, Button, Spinner } from 'react-bootstrap';

const Dashboard = () => {
  const { auth, logout } = useAuth();
  const [dataStructures, setDataStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 2. Inicializamos navigate

  useEffect(() => {
    const fetchStructures = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/structures', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setDataStructures(data);
        }
      } catch (error) {
        console.error("Error al obtener estructuras:", error);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      fetchStructures();
    }
  }, [auth]);

  // 3. Función para cargar en el visualizador al hacer clic en "Cargar en Visualizador"
  const handleLoad = (id) => {
    const structureToLoad = dataStructures.find((item) => (item._id || item.id) === id);

    if (structureToLoad) {
      navigate('/interactive-tutorial', {
        state: {
          type: structureToLoad.type,
          nodes: structureToLoad.nodes || structureToLoad.data || []
        }
      });
    }
  };

  // 4. Función para eliminar la estructura (podés completar tu llamada al backend acá)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/structures/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });

      if (response.ok) {
        // Filtramos el estado local para quitar la estructura eliminada al instante
        setDataStructures((prev) => prev.filter((item) => (item._id || item.id) !== id));
      }
    } catch (error) {
      console.error("Error al eliminar la estructura:", error);
    }
  };

  return (
    <Container className="py-4 text-light">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
        <h2 className="mb-0 fw-bold">Dashboard</h2>
        <Button variant="outline-danger" size="sm" onClick={logout}>
          Cerrar Sesión
        </Button>
      </div>

      <UserProfile user={auth?.token} />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        /* 5. Le pasamos onLoad y onDelete que faltaban */
        <SavedDataStructures 
          dataStructures={dataStructures} 
          onLoad={handleLoad} 
          onDelete={handleDelete} 
        />
      )}
    </Container>
  );
};

export default Dashboard;
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

  //  Función para cargar en el visualizador al hacer clic en "Cargar en Visualizador"
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

 
const handleDelete = async (id) => {
  const targetId = String(id);
  
    try {
      const response = await fetch(`http://localhost:5000/api/structures/${targetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      });

      if (response.ok) {
        setDataStructures((prev) => 
          prev.filter((item) => String(item._id || item.id) !== targetId)
        );
      } else {
        const errData = await response.json().catch(() => ({}));
        console.error("Detalle del error al eliminar:", response.status, errData);
        alert(`Error ${response.status}: ${errData.message || "No se pudo eliminar de la base de datos."}`);
      }
    } catch (error) {
      console.error("Error de red al eliminar:", error);
    }
  };
  return (
    <Container className="py-4 text-light">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
        <h2 className="mb-0 fw-bold">Dashboard</h2>
        <Button variant="outline-danger" size="sm" onClick={logout}>
          Log out
        </Button>
      </div>

      <UserProfile user={auth?.token} />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        /*  Le pasamos onLoad y onDelete que faltaban */
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
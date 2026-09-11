const API_URL = (import.meta as any).env?.VITE_API_URL || "https://structures-backend.onrender.com/api";

export const estructuraService = {
  guardar: async (nombre: string, tipo: string, tipoDato: string, valores: any[]) => {
    try {
      const token = localStorage.getItem("token"); 

      if (!token) {
        throw new Error("No hay token de sesión. Volvé a iniciar sesión.");
      }

      // Aseguramos que valores sea un array válido
      const listaValores = Array.isArray(valores) ? valores : [];

      const response = await fetch(`${API_URL}/structures`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          name: nombre, 
          type: tipo.toLowerCase(), // Uniformamos el tipo a minúsculas ("linkedlist", "stack", etc.)
          dataType: tipoDato,
          size: listaValores.length,
          length: listaValores.length,
          nodes: listaValores 
          // 🎯 ENVIAMOS LOS DATOS REALES DE LOS NODOS AL BACKEND
        }) 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al guardar en el backend:", error);
      throw error;
    }
  }
};
// const API_URL = "http://localhost:5000/api/structures"; // La URL de tu servidor Express

// export const estructuraService = {
//   /**
//    * Guarda una estructura completa en la base de datos
//    */
//   guardar: async (nombre: string, tipo: string, tipoDato: string, valores: any[]) => {
//     try {
//       const response = await fetch(`${API_URL}/guardar`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nombre, tipo, tipoDato, valores })
//       });
//       return await response.json();
//     } catch (error) {
//       console.error("Error al guardar en el backend:", error);
//       throw error;
//     }
//   },

//   /**
//    * Trae una estructura guardada por su ID
//    */
//   obtenerPorId: async (id: string) => {
//     try {
//       const response = await fetch(`${API_URL}/${id}`);
//       return await response.json();
//     } catch (error) {
//       console.error("Error al obtener la estructura:", error);
//       throw error;
//     }
//   }
// };


// export const estructuraService = {
//   guardar: async (nombre: string, tipo: string, tipoDato: string, valores: any[]) => {
//     try {
//       // 🔑 CAPTURAMOS EL TOKEN (Ajustá 'token' por el nombre exacto con el que lo guardás en tu Login)
//       // const token = localStorage.getItem("token"); 

//       const response = await fetch(`http://localhost:5000/api/structures`, {
//         method: "POST",
//         // headers: { 
//         //   "Content-Type": "application/json",
//         //   // ─── LE PASAMOS EL CANDADO AL BACKEND ───
//         //   "x-auth-token": token || "" // O "Authorization": `Bearer ${token}` según cómo esté tu backend
//         // },
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nombre, tipo, tipoDato, valores })
//       });
//       return await response.json();
//     } catch (error) {
//       console.error("Error al guardar en el backend:", error);
//       throw error;
//     }
//   },
//   // ... obtenerPorId
// };



// export const estructuraService = {
//   guardar: async (nombre: string, tipo: string, tipoDato: string, valores: any[]) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/structures`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           name: nombre, 
//           type: tipo, 
//           dataType: tipoDato, 
//           values: valores 
//         }) 
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Error del servidor: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("Error al guardar en el backend:", error);
//       throw error;
//     }
//   }
// };



// export const estructuraService = {
//   guardar: async (nombre: string, tipo: string, tipoDato: string, valores: any[]) => {
//     try {
//       // 🔑 1. Recuperamos el token que guardó tu Login
//       const token = localStorage.getItem("token"); 

//       const response = await fetch(`http://localhost:5000/api/structures`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           // 🛡️ 2. Le pasamos el token al backend por los headers
//           "Authorization": `Bearer ${token}`
//         },
//         // 📦 3. Mandamos los campos exactos y del tipo correcto (Numbers) que pide tu modelo
//         body: JSON.stringify({ 
//           name: nombre, 
//           type: tipo, 
//           size: valores.length,  // Mongoose pide Number obligatorio
//           length: valores.length // Mongoose pide Number obligatorio
//         }) 
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Error del servidor: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("Error al guardar en el backend:", error);
//       throw error;
//     }
//   }
// };



export const estructuraService = {
  guardar: async (nombre: string, tipo: string, tipoDato: string, valores: any[]) => {
    try {
      const token = localStorage.getItem("token"); 

      if (!token) {
        throw new Error("No hay token de sesión. Volvé a iniciar sesión.");
      }

      // Aseguramos que valores sea un array válido
      const listaValores = Array.isArray(valores) ? valores : [];

      const response = await fetch(`http://localhost:5000/api/structures`, {
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
import { useEffect, useState } from "react";


export const useFetch = (url) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  
  const obtenerDatos = async () => {
    setCargando(true);
    setError(null);

    try {
      const respuesta = await fetch(url, {
        credentials: "include", 
      });

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const resultado = await respuesta.json();
      setDatos(resultado);
    } catch (err) {
      setError(err.message || "Error al obtener los datos");
    } finally {
      setCargando(false);
    }
  };

  
  useEffect(() => {
    obtenerDatos();
  }, [url]);

  return { datos, cargando, error };
};
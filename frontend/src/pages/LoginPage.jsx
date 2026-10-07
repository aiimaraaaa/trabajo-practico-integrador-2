import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";


export const LoginPage = () => {
  const navegar = useNavigate();

  const { formulario, manejarCambio } = useForm({
    username: "",
    password: "",
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(formulario),
      });

      const datos = await respuesta.json();

      
      if (respuesta.status === 401) {
        setError("Credenciales incorrectas");
        return;
      }

      
      if (respuesta.status === 400) {
        setError("Datos inválidos, revisá los campos");
        return;
      }

      
      if (!respuesta.ok) {
        setError("Ocurrió un error en el servidor");
        return;
      }

      
      localStorage.setItem("isLogged", "true");
      navegar("/");
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Iniciar sesión
      </h1>

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Usuario</span>
          <input
            type="text"
            name="username"
            value={formulario.username}
            onChange={manejarCambio}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Contraseña</span>
          <input
            type="password"
            name="password"
            value={formulario.password}
            onChange={manejarCambio}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        ¿No tenés cuenta?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Registrate
        </Link>
      </p>
    </div>
  );
};
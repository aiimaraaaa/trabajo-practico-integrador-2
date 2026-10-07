import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";


export const RegisterPage = () => {
  const navegar = useNavigate();

  const { formulario, manejarCambio, reiniciarFormulario } = useForm({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
 
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [erroresValidacion, setErroresValidacion] = useState([]);

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError("");
    setErroresValidacion([]);
    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://localhost:3001/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formulario),
        }
      );

      const datos = await respuesta.json();

      
      if (respuesta.status === 400) {
        if (Array.isArray(datos)) {
          setErroresValidacion(datos);
        } else {
          setError("Datos inválidos, revisá los campos");
        }
        return;
      }

      if (!respuesta.ok) {
        setError("Ocurrió un error en el servidor");
        return;
      }

      
      reiniciarFormulario();
      navegar("/login");
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Registrarse
      </h1>

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Nombre</span>
          <input
            type="text"
            name="name"
            value={formulario.name}
            onChange={manejarCambio}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Apellido</span>
          <input
            type="text"
            name="lastname"
            value={formulario.lastname}
            onChange={manejarCambio}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

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
          <span className="text-sm text-gray-600">Email</span>
          <input
            type="email"
            name="email"
            value={formulario.email}
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

        {/* Errores de validación devueltos por express-validator */}
        {erroresValidacion.length > 0 && (
          <ul className="text-red-500 text-sm list-disc pl-5">
            {erroresValidacion.map((err, indice) => (
              <li key={indice}>{err}</li>
            ))}
          </ul>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {cargando ? "Registrando..." : "Registrarme"}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
};
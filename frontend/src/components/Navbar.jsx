import { Link, useNavigate } from "react-router";


export const Navbar = () => {
  const navegar = useNavigate();

  
  const manejarCierreSesion = async () => {
    try {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      
    }

    localStorage.removeItem("isLogged");
    navegar("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <Link to="/" className="text-xl font-semibold text-gray-800">
        Blog App
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-gray-900 px-2">
        Inicio
        </Link>
        <button
          onClick={manejarCierreSesion}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};
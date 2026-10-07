import { Navigate, Outlet } from "react-router";


export const PublicRoutes = () => {
  const estaLogueado = localStorage.getItem("isLogged");

  if (estaLogueado) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
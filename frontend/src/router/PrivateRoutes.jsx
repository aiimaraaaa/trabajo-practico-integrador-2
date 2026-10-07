import { Navigate, Outlet } from "react-router";


export const PrivateRoutes = () => {
  const estaLogueado = localStorage.getItem("isLogged");

  if (!estaLogueado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
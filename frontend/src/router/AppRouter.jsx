import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";


export const AppRouter = () => {
  const estaLogueado = localStorage.getItem("isLogged");

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas: solo si NO está logueado */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas privadas: solo si está logueado, con Navbar */}
        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
          >
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>

        {/* Ruta: redirige según el estado de sesión */}
        <Route
          path="*"
          element={<Navigate to={estaLogueado ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
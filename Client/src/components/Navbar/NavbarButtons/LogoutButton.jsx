import React from "react";
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro/a de que deseas cerrar sesión?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("userData");
      alert("Has cerrado sesión exitosamente");
    }
  };
  return (
    <Link onClick={handleLogout} to="/home" className="desconectarse">
      Cerrar sesión
    </Link>
  );
};

export default LogoutButton;

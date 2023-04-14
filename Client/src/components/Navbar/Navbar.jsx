import "./navbar.scss";
import { Link } from "react-router-dom";

import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const token = false;

  return (
    <div className="navbar">
      <div className="navbar__logo">ElectroShop</div>
      <div className="navbar__links">
        <Link to="/">Inicio</Link>
        <Link to="/home">Productos</Link>
        {token ? (
          <Link to="/login" className="desconectarse">
            Cerrar sesion
          </Link>
        ) : (
          <Link to="/login" className="ingresar">
            Iniciar sesion
          </Link>
        )}

        <DarkMode />
      </div>
    </div>
  );
};

export default Navbar;

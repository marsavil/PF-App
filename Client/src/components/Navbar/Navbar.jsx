import "./navbar.scss";
import { Link } from "react-router-dom";

import Cart from "../Cart/Cart";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">ElectroShop</div>
      <div className="navbar__links">
        <Link to="/home">Inicio</Link>
        <Link to="/home">Productos</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/contacto" className="ingresar">Ingresar</Link>
        <Cart />
        <DarkMode />
      </div>
    </div>
  );
};

export default Navbar;

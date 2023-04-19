import React from "react";
import "./profile.scss";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const {
    admin,
  } = JSON.parse(localStorage.getItem("userData")) ?? {};

  return (
    <div className="profile">
      <div className="data">
        <h2>{user.userName}</h2>
        <h3>Mis datos</h3>
        <div className="border">
          <h4>Nombre de usuario</h4>
          <p>{user.userName}</p>
        </div>
        <div className="border">
          <h4>Nombre</h4>
          <p>{user.name}</p>
        </div>
        <div className="border">
          <h4>Apellido</h4>
          <p>{user.lastName}</p>
        </div>
        <div className="border">
          <h4>E-mail</h4>
          <p>{user.email}</p>
        </div>
        <button>Modificar datos</button>
      </div>
      {admin ? null : (
        <div className="purchases">
          <h2>Historial de compras</h2>
        </div>
      )}

      {admin ? (
        <div className="panel-admin">
          <h2>Panel de Admin</h2>
          <Link to="/addProduct" className="links">
            Agregar Productos
          </Link>
          <Link to="/home" className="links">
            Administrar Usuarios
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

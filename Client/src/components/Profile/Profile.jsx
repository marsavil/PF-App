import React from "react";
import "./profile.scss";
import { useState } from "react";
import AddProduct from "../AddProduct/AddProduct";
import ManageUsers from "../ManageUsers/ManageUsers";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { userName, name, lastName, email } = user;
  const { admin } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const [showManageProducts, setShowManageProducts] = useState(false);
  const [showManageUsers, setShowManageUsers] = useState(false);

  const handleManageUsersClick = () => {
    setShowManageUsers(true);
    setShowManageProducts(false);
  };

  const handleManageProductsClick = () => {
    setShowManageProducts(true);
    setShowManageUsers(false);
  };

  const closeOptions = () => {
    setShowManageProducts(false);
    setShowManageUsers(false);
  };

  return (
    <div className="profile">
      <div className="data">
        <h2>{userName}</h2>
        <h3>Mis datos</h3>
        <div className="border">
          <h4>Nombre de usuario</h4>
          <p>{userName}</p>
        </div>
        <div className="border">
          <h4>Nombre</h4>
          <p>{name}</p>
        </div>
        <div className="border">
          <h4>Apellido</h4>
          <p>{lastName}</p>
        </div>
        <div className="border">
          <h4>E-mail</h4>
          <p>{email}</p>
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
          <h2>Panel de Administrador</h2>
          <div className="options-container">
            <button className="options" onClick={handleManageProductsClick}>
              Agregar Productos
            </button>
            <button className="options" onClick={handleManageUsersClick}>
              Administrar Usuarios
            </button>
            {showManageProducts && (
              <div className="option-set">
                <AddProduct />
                <button onClick={closeOptions}>Cerrar</button>
              </div>
            )}
            {showManageUsers && (
              <div className="option-set">
                <ManageUsers />
                <button onClick={closeOptions}>Cerrar</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

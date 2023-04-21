import React from "react";
import "./profile.scss";
import { useState } from "react";
import AddProduct from "./AddProduct/AddProduct";
import ManageUsers from "./ManageUsers/ManageUsers";
import { Modal } from "react-bootstrap";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { userName, name, lastName, email } = user;
  const { admin } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const [showProductModal, setshowProductModal] = useState(false);
  const [showUsersModal, setshowUsersModal] = useState(false);

  return (
    <div className="profile">
      <div className="data">
        <h2>{userName}</h2>
        <h3>Mis datos</h3>
        <div className="cards">
          <h4>Nombre de usuario</h4>
          <p>{userName}</p>
        </div>
        <div className="cards">
          <h4>Nombre</h4>
          <p>{name}</p>
        </div>
        <div className="cards">
          <h4>Apellido</h4>
          <p>{lastName}</p>
        </div>
        <div className="cards">
          <h4>E-mail</h4>
          <p>{email}</p>
        </div>
        <button>Modificar datos</button>
      </div>
      {admin ? null : (
        <div className="purchases">
          <h2>Historial de compras</h2>
          <h3>
            Aún no has realizado ninguna compra. ¡Visita nuestra tienda y
            comprá!
          </h3>
        </div>
      )}

      {admin ? (
        <div className="panel-admin">
          <h2>Panel de Administrador</h2>
          <div className="options-container">
            <button
              className="optionButton"
              onClick={() => {
                setshowProductModal(true);
              }}
            >
              Agregar Productos
            </button>
            <button
              className="optionButton"
              onClick={() => {
                setshowUsersModal(true);
              }}
            >
              Administrar Usuarios
            </button>
            {showProductModal && (
              <Modal
                show={showProductModal}
                onHide={() => setshowProductModal(false)}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <AddProduct />
              </Modal>
            )}
            {showUsersModal && (
              <Modal
                show={showUsersModal}
                onHide={() => setshowUsersModal(false)}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Administrar Usuarios</Modal.Title>
                </Modal.Header>
                <ManageUsers />
              </Modal>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

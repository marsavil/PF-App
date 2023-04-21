import React from "react";
import "./profile.scss";
import { useState } from "react";
import AddProduct from "./AddProduct/AddProduct";
import ManageUsers from "./ManageUsers/ManageUsers";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { userName, name, lastName, email } = user;
  const { admin } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const [editMode, setEditMode] = useState(false);
  const [showProductModal, setshowProductModal] = useState(false);
  const [showUsersModal, setshowUsersModal] = useState(false);

  const [editedUserName, setEditedUserName] = useState(userName);
  const [editedName, setEditedName] = useState(name);
  const [editedLastName, setEditedLastName] = useState(lastName);

  const saveChanges = async () => {
    const updatedUserData = {
      email: email,
      name: editedName,
      lastName: editedLastName,
      password: "",
    };

    try {
      const response = await axios.put(
        "http://localhost:3001/user/update",
        updatedUserData
      );
      if (response.status === 200) {
        setEditMode(false);
        setEditedName(editedName);
        setEditedLastName(editedLastName);
        toast.success("Datos actualizados correctamente");
      } else {
        console.error(
          "Error al realizar la solicitud PUT. Código de respuesta no exitoso:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="profile">
        <div className="data">
          <h2>{userName}</h2>
          <h3>Mis datos</h3>
          {editMode ? (
            <>
              <div className="cards">
                <h4>Nombre de usuario</h4>
                <input
                  className="input-readOnly"
                  type="text"
                  value={userName}
                  readOnly
                />
              </div>
              <div className="cards">
                <h4>E-mail</h4>
                <input
                  className="input-readOnly"
                  type="text"
                  value={email}
                  readOnly
                />
              </div>
              <div className="cards">
                <h4>Nombre</h4>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="cards">
                <h4>Apellido</h4>
                <input
                  type="text"
                  value={editedLastName}
                  onChange={(e) => setEditedLastName(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="cards">
                <h4>Nombre de usuario</h4>
                <p>{userName}</p>
              </div>
              <div className="cards">
                <h4>E-mail</h4>
                <p>{email}</p>
              </div>
              <div className="cards">
                <h4>Nombre</h4>
                <p>{name}</p>
              </div>
              <div className="cards">
                <h4>Apellido</h4>
                <p>{lastName}</p>
              </div>
            </>
          )}
          {editMode ? (
            <div className="hidden-buttons">
              <button onClick={() => saveChanges()}>Guardar</button>
              <button onClick={() => setEditMode(false)}>Cancelar</button>
            </div>
          ) : (
            <button onClick={() => setEditMode(true)}>Modificar datos</button>
          )}
        </div>
        {admin ? null : (
          <div className="purchases">
            <h2>Historial de compras</h2>
            <h3>
              Aún no has realizado ninguna compra. ¡Visita nuestra tienda y
              compra!
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
              <button className="optionButton">Enviar Cupones</button>

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
    </>
  );
};

export default Profile;

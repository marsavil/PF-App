import "./manageUsers.scss";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../redux/actions/actions";
import axios from "axios";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowAllUsers = async () => {
    try {
      const response = await dispatch(getAllUsers());
      const users = response.payload;
      setUsers(users);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      await axios.delete("http://localhost:3001/user/del", {
        data: { email },
      });
      handleDeleteModalClose();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleDeleteModalOpen = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para buscar usuario
  };

  return (
    <div className="manageUsers">
      <form className="admin-users" onSubmit={handleSubmit}>
        <p>Buscar usuario</p>
        <button onClick={handleShowAllUsers}>Ver todos los usuarios</button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              ID: {user.id}
              Nombre: {user.name}
              Apellido: {user.lastName}
              Email: {user.email}
              Nombre de usuario: {user.userName}
              <button onClick={() => handleDeleteModalOpen(user)}>
                Eliminar usuario
              </button>
            </li>
          ))}
        </ul>
        <input type="text" />
        <button>Buscar</button>
        <button>Modificar usuario</button>

        <Modal
          onRequestClose={handleDeleteModalClose}
          className="modal"
          overlayClassName="overlay"
          show={showDeleteModal}
        >
          <h2>Eliminar Usuario</h2>
          <p>
            ¿Estás seguro que deseas eliminar al usuario{" "}
            {selectedUser && selectedUser.userName}?
          </p>
          <button onClick={() => handleDeleteUser(selectedUser.email)}>
            Eliminar
          </button>
          <button onClick={handleDeleteModalClose}>Cancelar</button>
        </Modal>
      </form>
    </div>
  );
};

export default ManageUsers;

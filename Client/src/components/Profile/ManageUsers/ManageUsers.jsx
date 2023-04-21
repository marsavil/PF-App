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
  const [showBanModal, setShowBanModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setShowBanModal(false);
    setSelectedUser(null);
  };

  const handleDeleteModalOpen = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleBanModalOpen = (user) => {
    setSelectedUser(user);
    setShowBanModal(true);
  };

  const handleModModalOpen = (user) => {
    setSelectedUser(user);
    setShowModModal(true);
  };

  const showAllUsers = async () => {
    try {
      const response = await dispatch(getAllUsers());
      const users = response.payload;
      setUsers(users);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };

  const deleteUser = async (email) => {
    try {
      await axios.delete("http://localhost:3001/user/del", {
        data: { email },
      });
      handleModalClose();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const banUser = async (id) => {
    try {
      const response = await axios.put("http://localhost:3001/user/ban", {
        id,
      });
      console.log(response);
      handleModalClose();
    } catch (error) {
      console.error("Error baneando usuario:", error);
    }
  };

  // const unBanUser = async (id) => {
  //   try {
  //     await axios.put("http://localhost:3001/user/unban", { id });
  //     handleModalClose();
  //   } catch (error) {
  //     console.error("Error desbaneando usuario:", error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const searchQuery = event.target.elements.searchQuery.value; // Obtener el valor del input de búsqueda
    // try {
    //   const response = await axios.get(
    //     `http://localhost:3001/user/search?query=${searchQuery}`
    //   );
    //   const users = response.data;
    //   setSelectedUser(users);
    // } catch (error) {
    //   console.error("Error obteniendo usuario por búsqueda:", error);
    // }
  };

  return (
    <div className="manageUsers">
      <form className="admin-users" onSubmit={handleSubmit}>
        <button onClick={showAllUsers}>Ver todos los usuarios</button>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="user-card">
              <div className="user-data">
                <span>ID</span>
                <p>{user.id}</p>
                <span>Nombre</span>
                <p>{user.name}</p>
                <span>Apellido</span>
                <p>{user.lastName}</p>
                <span>Email:</span>
                <p>{user.email}</p>
                <span>Nombre de usuario</span>
                <p>{user.userName}</p>
              </div>
              <div className="button-section">
                <button onClick={() => handleModModalOpen(user)}>Modificar</button>
                <button onClick={() => handleBanModalOpen(user)}>Banear</button>
                <button onClick={() => handleDeleteModalOpen(user)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p>Buscar usuario</p>
        <input type="text" className="search-input" />
        <div className="button-group">
          <button className="search-button">Buscar</button>
          <button className="modify-button">Modificar usuario</button>
        </div>

        <Modal
          onRequestClose={handleModalClose}
          overlayClassName="overlay"
          show={showDeleteModal}
        >
          <h2>Eliminar Usuario</h2>
          <p>
            ¿Estás seguro que deseas eliminar al usuario{" "}
            {selectedUser && selectedUser.userName}?
          </p>
          <button onClick={() => deleteUser(selectedUser.email)}>
            Eliminar
          </button>
          <button onClick={handleModalClose}>Cancelar</button>
        </Modal>

        <Modal
          onRequestClose={handleModalClose}
          className="modal"
          overlayClassName="overlay"
          show={showBanModal}
        >
          <h2>Banear Usuario</h2>
          <p>
            ¿Estás seguro que deseas banear al usuario{" "}
            {selectedUser && selectedUser.userName}?
          </p>
          <button onClick={() => banUser(selectedUser.id)}>Banear</button>
          <button onClick={handleModalClose}>Cancelar</button>
        </Modal>

      </form>
    </div>
  );
};

export default ManageUsers;

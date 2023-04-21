import "./manageUsers.scss";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../redux/actions/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showUnbanModal, setShowUnbanModal] = useState(false);
  const [showAdmModal, setShowAdmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setShowBanModal(false);
    setShowUnbanModal(false);
    setShowAdmModal(false);
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

  const handleUnbanModalOpen = (user) => {
    setSelectedUser(user);
    setShowUnbanModal(true);
  };

  const handleAdmModalOpen = (user) => {
    setSelectedUser(user);
    setShowAdmModal(true);
  };

  useEffect(() => {
    showAllUsers();
  }, []);

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
      toast.success("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      toast.error("Error eliminando usuario");
    }
  };

  const banUser = async (id) => {
    try {
      await axios.put(`http://localhost:3001/user/ban/${id}`);
      toast.success("Usuario deshabilitado");
    } catch (error) {
      console.error("Error baneando usuario:", error);
      toast.error("Error deshabilitando usuario");
    }
  };

  const unBanUser = async (id) => {
    try {
      await axios.put(`http://localhost:3001/user/unban/${id}`);
      toast.success("Usuario habilitado");
    } catch (error) {
      console.error(error);
      toast.error("Error habilitando usuario");
    }
  };

  const makeAdmin = async (email) => {
    try {
      await axios.put("http://localhost:3001/user/setadmin", { email });
      toast.success("Permisos concedidos");
    } catch (error) {
      console.error(error);
    }
  };

  const removeAdmin = async (email) => {
    try {
      await axios.put("http://localhost:3001/user/removeadmin", { email });
      toast.success("Permisos revocados");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="manageUsers">
        <div className="admin-users">
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
                  <button onClick={() => handleModModalOpen(user)}>
                    Modificar
                  </button>

                  <button onClick={() => handleDeleteModalOpen(user)}>
                    Eliminar
                  </button>
                  {user.disabled ? (
                    <button onClick={() => handleUnbanModalOpen(user)}>
                      Habilitar
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleBanModalOpen(user);
                      }}
                    >
                      Deshabilitar
                    </button>
                  )}

                  {user.admin ? (
                    <button onClick={() => handleAdmModalOpen(user)}>
                      Quitar Admin
                    </button>
                  ) : (
                    <button onClick={() => handleAdmModalOpen(user)}>
                      Hacer Admin
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <Modal onRequestClose={handleModalClose} show={showDeleteModal}>
            <h2>Eliminar Usuario</h2>
            <p>
              ¿Estás seguro que deseas eliminar al usuario{" "}
              {selectedUser && selectedUser.userName}?
            </p>
            <button
              onClick={() => {
                deleteUser(selectedUser.email);
                handleModalClose();
              }}
            >
              Eliminar
            </button>
            <button onClick={handleModalClose}>Cancelar</button>
          </Modal>

          <Modal onRequestClose={handleModalClose} show={showBanModal}>
            <h2>Deshabilitar Usuario</h2>
            <p>
              ¿Estás seguro que deseas deshabilitar al usuario{" "}
              {selectedUser && selectedUser.userName}?
            </p>
            <button
              onClick={() => {
                banUser(selectedUser.id);
                handleModalClose();
              }}
            >
              Deshabilitar
            </button>
            <button onClick={handleModalClose}>Cancelar</button>
          </Modal>

          <Modal onRequestClose={handleModalClose} show={showUnbanModal}>
            <h2>Habilitar Usuario</h2>
            <p>
              ¿Estás seguro que deseas habilitar al usuario{" "}
              {selectedUser && selectedUser.userName}?
            </p>
            <button
              onClick={() => {
                unBanUser(selectedUser.id);
                handleModalClose();
              }}
            >
              Habilitar
            </button>
            <button onClick={handleModalClose}>Cancelar</button>
          </Modal>

          <Modal onRequestClose={handleModalClose} show={showAdmModal}>
            <h2>Actualizar Usuario</h2>
            <p>
              ¿Estás seguro que deseas actualizar al usuario{" "}
              {selectedUser && selectedUser.userName}?
            </p>
            <button
              onClick={() => {
                makeAdmin(selectedUser.email);
                handleModalClose();
              }}
            >
              Actualizar
            </button>
            <button onClick={handleModalClose}>Cancelar</button>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;

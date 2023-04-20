import "./manageUsers.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions/actions";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const handleShowAllUsers = async () => {
    try {
      const response = await dispatch(getAllUsers());
      const users = response.payload;
      setUsers(users);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
            </li>
          ))}
        </ul>
        <input type="text" />
        <button>Buscar</button>
        <button>Modificar usuario</button>
        <button>Eliminar usuario</button>
      </form>
    </div>
  );
};

export default ManageUsers;

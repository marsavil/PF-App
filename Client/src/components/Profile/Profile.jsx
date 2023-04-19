import React from "react";
import "./profile.scss";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="profile">
      <div className="data">
        <h2>{user.userName}</h2>
        <h3>Mis datos</h3>
        <h4>Usuario: {user.userName}</h4>
        <h4>Nombre: {user.name}</h4>
        <h4>Apellido: {user.lastName}</h4>
        <h4>E-mail: {user.email}</h4>
      </div>
      <div className="purchases">
        <h2>Historial de compras</h2>
      </div>
    </div>
  );
};

export default Profile;

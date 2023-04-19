import React from "react";
import "./profile.scss";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

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
      <div className="purchases">
        <h2>Historial de compras</h2>
      </div>
    </div>
  );
};

export default Profile;

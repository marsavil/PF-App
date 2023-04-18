import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="profile">
      <h1>Mis datos</h1>
      <h2>Usuario: {user.userName}</h2>
      <h2>Nombre: {user.name}</h2>
      <h2>Apellido: {user.lastName}</h2>
      <h2>Email: {user.email}</h2>
    </div>
  );
};

export default Profile;

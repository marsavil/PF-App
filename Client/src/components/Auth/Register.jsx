import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.scss";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="authDiv">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <input
          type="text"
          name="userName"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          value={dataRegister.userName}
        />
        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={dataRegister.name} />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          onChange={handleChange}
          value={dataRegister.lastName}
        />

        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={dataRegister.email} />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={dataRegister.password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          onChange={handleChange}
          value={dataRegister.confirmPassword}
        />
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

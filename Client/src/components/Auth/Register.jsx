import { useState } from "react";
import { Link } from "react-router-dom";
import { validateRegisterData } from "../../functions/validate";

import "./auth.scss";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = validateRegisterData(dataRegister);
    setErrors(errors);
    if (isValid) {
      // Enviar datos del formulario
    }
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
        {errors.userName ? <p className="error">{errors.userName}</p> : <p className="error"></p>}

        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={dataRegister.name} />
        {errors.name ? <p className="error">{errors.name}</p> : <p className="error"></p>}

        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          onChange={handleChange}
          value={dataRegister.lastName}
        />
        {errors.lastName ? <p className="error">{errors.lastName}</p> : <p className="error"></p>}

        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={dataRegister.email} />
        {errors.email ? <p className="error">{errors.email}</p> : <p className="error"></p>}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={dataRegister.password}
        />
        {errors.password ? <p className="error">{errors.password}</p> : <p className="error"></p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          onChange={handleChange}
          value={dataRegister.confirmPassword}
        />
        {errors.confirmPassword ? <p className="error">{errors.confirmPassword}</p> : <p className="error"></p>}

        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

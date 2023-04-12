import { useState } from "react";
import { Link } from "react-router-dom";
import { validateLoginData } from "../../functions/validate";
import "./auth.scss";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = validateLoginData(dataLogin);
    setErrors(errors);
    if (isValid) {
      // Enviar datos del formulario
    }
  };

  const handleChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="authDiv">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Iniciar sesion</h1>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={dataLogin.email} />
        {errors.email ? <p className="error">{errors.email}</p> : <p className="error"></p>}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={dataLogin.password}
        />
        {errors.password ? <p className="error">{errors.password}</p> : <p className="error"></p>}
        <button type="submit">Ingresar</button>
        <p>
          ¿No tienes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { validateLoginData } from "../../functions/validate";
import "./auth.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await dispatch(getUser(dataLogin));
      if (user === undefined) {
        console.error("El usuario no coincide con los datos ingresados");
      } else {
        alert("Bienvenido")
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
    const { errors } = validateLoginData({ ...dataLogin, [name]: value });
    setErrors(errors);
  };

  return (
    <div className="authDiv">
      <form className="authForm authFormLogin" onSubmit={handleSubmit}>
        <h1>Iniciar sesion</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={dataLogin.email}
        />
        {dataLogin.email !== "" && errors.email ? (
          <p className="error">{errors.email}</p>
        ) : (
          <p className="error">
            <br />
          </p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={dataLogin.password}
        />
        {dataLogin.password !== "" && errors.password ? (
          <p className="error">{errors.password}</p>
        ) : (
          <p className="error">
            <br />
          </p>
        )}
        <button type="submit">Ingresar</button>
        <p>
          ¿No tienes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

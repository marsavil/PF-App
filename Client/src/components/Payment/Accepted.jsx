import { useNavigate } from "react-router-dom";

const Rejected = () => {
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const API_URL = "http://localhost:3001/cart/";
  const handleEmptyCart = async () => {
    try {
      await axios.post(API_URL + `empty/${id}`);
      dispatch(getCart(id));
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div>
      <h1>Tu compra se ha completado exitosamente</h1>
      {handleEmptyCart()}
      {setTimeout(() => {
        navigate("/home");
      }, 3000)}
    </div>
  );
};

export default Rejected;
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Tu compra se ha realizado exitosamente</h1>
      {setTimeout(() => {
        navigate("/home");
      }, 3000)}
    </div>
  );
};

export default Payment;

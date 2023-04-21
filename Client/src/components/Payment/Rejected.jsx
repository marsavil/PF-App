import { useNavigate } from "react-router-dom";

const Rejected = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Tu pago ha sido rechazado</h1>
      {setTimeout(() => {
        navigate("/home");
      }, 3000)}
    </div>
  );
};

export default Rejected;
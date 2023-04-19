import React from "react";
import axios from "axios";

const PurchaseOrderButton = ({products}) => {

  const handlePayment = () => {
    axios
      .post("http://localhost:3001/payment", { items: [...products] })
      .then((res) => {
        window.location.href = res.data.response.body.init_point;
      });
  };
  
  return <button onClick={handlePayment}>Continuar compra</button>;
};

export default PurchaseOrderButton;

import React from "react";
import axios from "axios";

const PurchaseOrderButton = ({products, user}) => {

  const handlePayment = () => {
    axios
      .post("http://localhost:3001/payment", { items: [...products], userId: user})
      .then((res) => {
        window.location.href = res.data.response.body.init_point;
      });
  };
  
  return <button className="buyButton" onClick={handlePayment}>Continuar compra</button>;
};

export default PurchaseOrderButton;

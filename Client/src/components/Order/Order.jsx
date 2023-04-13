import React from "react";
import "./order.scss";

const Order = () => {
  return (
    <div className="order">
      <section className="orderSection">
        <h4>Nombre:</h4>
        <div>
          <input type="radio" />
          <label>Ascendente</label>
        </div>
        <div>
          <input type="radio" />
          <label>Descendente</label>
        </div>
      </section>
      <section className="orderSection">
        <h4>Precio:</h4>
        <div>
          <input type="radio" />
          <label>Menor precio</label>
        </div>
        <div>
          <input type="radio" />
          <label>Mayor precio</label>
        </div>
      </section>
    </div>
  );
};

export default Order;

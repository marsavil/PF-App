import React, { useState, useEffect } from "react";
import "./order.scss";

const Order = ({ filterState, setFilterState, setCurrentPage }) => {
  const [nombreOrder, setNombreOrder] = useState("");
  const [precioOrder, setPrecioOrder] = useState("");

  useEffect(() => {
    handleOrder();
  }, [nombreOrder, precioOrder]);

  const handleNombreOrderChange = (e) => {
    setNombreOrder(e.target.value);
  };

  const handlePrecioOrderChange = (e) => {
    setPrecioOrder(e.target.value);
  };

  const handleOrder = () => {
    setFilterState({
      ...filterState,
      order: {
        nombre: nombreOrder,
        precio: precioOrder,
      },
    });
    setCurrentPage(1);
  };

  return (
    <div className="order">
      <section className="orderSection">
        <h4>Nombre:</h4>
        <div>
          <input
            type="radio"
            id="nombreAscendente"
            name="nombre"
            value="ascendente"
            checked={nombreOrder === "ascendente"}
            onChange={handleNombreOrderChange}
          />
          <label htmlFor="nombreAscendente">Ascendente</label>
        </div>
        <div>
          <input
            type="radio"
            id="nombreDescendente"
            name="nombre"
            value="descendente"
            checked={nombreOrder === "descendente"}
            onChange={handleNombreOrderChange}
          />
          <label htmlFor="nombreDescendente">Descendente</label>
        </div>
      </section>
      <section className="orderSection">
        <h4>Precio:</h4>
        <div>
          <input
            type="radio"
            id="precioMenor"
            name="precio"
            value="menor"
            checked={precioOrder === "menor"}
            onChange={handlePrecioOrderChange}
          />
          <label htmlFor="precioMenor">Menor precio</label>
        </div>
        <div>
          <input
            type="radio"
            id="precioMayor"
            name="precio"
            value="mayor"
            checked={precioOrder === "mayor"}
            onChange={handlePrecioOrderChange}
          />
          <label htmlFor="precioMayor">Mayor precio</label>
        </div>
      </section>
    </div>
  );
};

export default Order;

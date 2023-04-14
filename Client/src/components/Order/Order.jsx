import React, { useState, useEffect } from "react";
import "./order.scss";

const Order = ({ filterState, setFilterState, setCurrentPage }) => {
  const [selectOrder, setSelectOrder] = useState("none");

  useEffect(() => {
    setFilterState({
      ...filterState,
      order: selectOrder,
    });
  }, [selectOrder]);

  const handleOrderChange = (e) => {
    setSelectOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="order">
      <select value={selectOrder} onChange={handleOrderChange}>
        <option value="none">Seleccione una marca</option>
        <option value="ascendente">Nombre ascendente</option>
        <option value="descendente">Nombre descendente</option>
        <option value="menor">Menor precio</option>
        <option value="mayor">Mayor precio</option>
      </select>
    </div>
  );
};

export default Order;

import React from "react";
import "./order.scss";

const Order = ({ filterState, setFilterState, setCurrentPage }) => {
  const handleOrderChange = (e) => {
    const orderValue = e.target.value;
    setFilterState({
      ...filterState,
      order: orderValue,
    });
    setCurrentPage(1);
  };

  return (
    <div className="order">
      <select value={filterState.order} onChange={handleOrderChange}>
        <option value="none">Seleccione un orden</option>
        <option value="menor">Menor precio</option>
        <option value="mayor">Mayor precio</option>
      </select>
    </div>
  );
};

export default Order;

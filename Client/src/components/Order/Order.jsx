import React, { useState, useEffect } from "react";
import "./order.scss";

const Order = ({ filterState, setFilterState, setCurrentPage }) => {
  const [selectOrder, setSelectOrder] = useState(filterState.order || "none");

  useEffect(() => {
    setFilterState({
      ...filterState,
      order: selectOrder,
    });
  }, [selectOrder]);

  useEffect(() => {
    setSelectOrder(filterState.order);
  }, [filterState.order]);


  const handleOrderChange = (e) => {
    setSelectOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="order">
      <select value={selectOrder} onChange={handleOrderChange}>
        <option value="none">Seleccione un orden</option>
        <option value="menor">Menor precio</option>
        <option value="mayor">Mayor precio</option>
      </select>
    </div>
  );
};

export default Order;

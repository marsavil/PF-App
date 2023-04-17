import React from "react";
import { brands } from "../../functions/constants";

const FilterBrand = ({ filterState, setFilterState, setCurrentPage }) => {
  const handleBrandChange = (e) => {
    const brandValue = e.target.value;
    setFilterState({
      ...filterState,
      brand: brandValue,
    });
    setCurrentPage(1);
  };

  return (
    <div className="filterBrand">
      <select value={filterState.brand} onChange={handleBrandChange}>
        <option value="">Seleccione una marca</option>
        {brands.map((brand, index) => {
          return (
            <option key={index} value={brand}>
              {brand}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterBrand;

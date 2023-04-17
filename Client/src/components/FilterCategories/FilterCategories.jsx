import React from "react";
import { categories } from "../../functions/constants";

const FilterCategories = ({ filterState, setFilterState, setCurrentPage }) => {
  const handleBrandChange = (e) => {
    const categoryValue = e.target.value;
    setFilterState({
      ...filterState,
      category: categoryValue,
    });
    setCurrentPage(1);
  };

  return (
    <div className="filterBrand">
      <select value={filterState.category} onChange={handleBrandChange}>
        <option value="">Seleccione una categoria</option>
        {categories.map((category, index) => {
          return (
            <option key={index} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterCategories;

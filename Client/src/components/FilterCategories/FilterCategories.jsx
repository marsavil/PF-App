import { useState, useEffect } from "react";
import { categories } from "../../functions/constants";

const FilterCategories = ({ filterState, setFilterState, setCurrentPage }) => {
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    setFilterState({
      ...filterState,
      category: selectCategory,
    });
  }, [selectCategory]);

  const handleBrandChange = (e) => {
    setSelectCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="filterBrand">
      <select value={selectCategory} onChange={handleBrandChange}>
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

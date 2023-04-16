import { useEffect, useState } from "react";
import { brands } from "../../functions/constants";

const FilterBrand = ({ filterState, setFilterState, setCurrentPage }) => {
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    setFilterState({
      ...filterState,
      brand: selectedBrand,
    });
  }, [selectedBrand]);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="filterBrand">
      <select value={selectedBrand} onChange={handleBrandChange}>
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

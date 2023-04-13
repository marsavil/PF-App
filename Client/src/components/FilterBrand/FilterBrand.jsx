import React, { useState } from "react";
import { brands } from "../../functions/constants";
import "./filterBrand.scss";

const FilterBrand = () => {
  const [showMore, setShowMore] = useState(false);

  const brandsToShow = showMore ? brands : brands.slice(0, 5);

  return (
    <div className="filterBrand">
      {brandsToShow.map((brand, index) => {
        return (
          <div key={index} className="divBrand">
            <input type="checkbox" name={brand} id={brand} />
            <label htmlFor={brand}>{brand}</label>
          </div>
        );
      })}
      {!showMore && brands.length > 5 && <a onClick={() => setShowMore(true)}>Mostrar más</a>}
      {showMore && <a onClick={() => setShowMore(false)}>Mostrar menos</a>}
    </div>
  );
};

export default FilterBrand;

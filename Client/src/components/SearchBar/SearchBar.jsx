import { useState, useEffect } from "react";
import "./searchBar.scss";

const SearchBar = ({ filterState, setFilterState, setCurrentPage }) => {
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    setFilterState({
      ...filterState,
      search: productSearch,
    });
  }, [productSearch]);

  const handleProductSearch = (e) => {
    setProductSearch(e.target.value);
    setCurrentPage(1);
  };

  console.log(productSearch);

  return (
    <div>
      <section>
        <input type="text" value={productSearch} placeholder="Buscar producto" onChange={handleProductSearch} />
      </section>
    </div>
  );
};

export default SearchBar;

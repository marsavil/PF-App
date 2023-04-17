import React from "react";
import "./searchBar.scss";

const SearchBar = ({ filterState, setFilterState, setCurrentPage }) => {
  const handleProductSearch = (e) => {
    const searchValue = e.target.value;
    setFilterState({
      ...filterState,
      search: searchValue,
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <section>
        <input
          type="text"
          value={filterState.search}
          placeholder="Buscar producto"
          onChange={handleProductSearch}
        />
      </section>
    </div>
  );
};

export default SearchBar;

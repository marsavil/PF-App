import React from "react";

const SearchBar = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="Buscar producto" />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;

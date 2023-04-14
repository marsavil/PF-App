import "./filters.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { allFilters } from "../../redux/actions/actions";

import SearchBar from "../SearchBar/SearchBar";
import Order from "../Order/Order";
import FilterBrand from "../FilterBrand/FilterBrand";
import FilterCategories from "../FilterCategories/FilterCategories";

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const [filterState, setFilterState] = useState({
    search: "",
    brand: "",
    order: "none",
    category: "",
  });

  const handleCleanFilters = () => {
    setFilterState({
      search: "",
      brand: "",
      order: {
        nombre: "",
        precio: "",
      },
      category: "",
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(allFilters(filterState));
  }, [filterState, dispatch]);

  return (
    <div className="filters">
      <h3>Buscar producto</h3>
      <SearchBar filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />

      <h3>Ordenar</h3>
      <Order filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />

      <h3>Marca:</h3>
      <FilterBrand filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />

      <h3>Categoría:</h3>
      <FilterCategories filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />

      <button className="button cleanFilters" onClick={handleCleanFilters}>
        Limpiar filtros
      </button>
    </div>
  );
};

export default Filters;

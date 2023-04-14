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
    order: {
      nombre: "",
      precio: "",
    },
    category: "",
  });

  useEffect(() => {
    dispatch(allFilters(filterState));
  }, [filterState, dispatch]);

  return (
    <div className="filters">
      <SearchBar />
      <h3>Ordenar</h3>
      <Order filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />
      <h3>Marca:</h3>
      <FilterBrand filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />
      <h3>Categoría:</h3>
      <FilterCategories filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Filters;

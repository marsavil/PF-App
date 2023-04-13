import "./filters.scss";
import SearchBar from "../SearchBar/SearchBar";
import Order from "../Order/Order";
import FilterBrand from "../FilterBrand/FilterBrand";

const Filters = () => {
  return (
    <div className="filters">
      <SearchBar />
      <h3>Ordenar</h3>
      <Order />
      <h3>Marca:</h3>
      <FilterBrand />
    </div>
  );
};

export default Filters;

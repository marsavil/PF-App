import "./filters.scss";
import SearchBar from "../SearchBar/SearchBar";
import Order from "../Order/Order";
import FilterBrand from "../FilterBrand/FilterBrand";

const Filters = () => {
  return (
    <div className="filters">
      <SearchBar />
      <Order />
      <>
        <h3>Por marca:</h3>
        <FilterBrand />
      </>
    </div>
  );
};

export default Filters;

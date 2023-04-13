import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../redux/actions/actions";
import "./home.scss";

import Carrousel from "../Carrousel/Carrousel";
import Filters from "../Filters/Filters";
import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="home">
      <Carrousel />
      <div className="filtros_productos">
        <Filters />
        <div className="divPagination">
          <Pagination />

          <div className="products">
            {allProducts.map((product, index) => (
              <Product product={product} key={index} />
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Home;

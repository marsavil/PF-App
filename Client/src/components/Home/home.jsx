import "./home.scss";
import jsonProducts from "../../jsonProducts.js";

import Navbar from "../Navbar/Navbar";
import Carrousel from "../Carrousel/Carrousel";
import Filters from "../Filters/Filters";
import Product from "../Product/Product";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Carrousel />
      <div className="filtros_productos">
        <Filters />
        <div className="products">
          {jsonProducts.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

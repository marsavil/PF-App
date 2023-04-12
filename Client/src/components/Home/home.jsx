import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../redux/actions/actions";
import "./home.scss";
import jsonProducts from "../../jsonProducts.js";

import Navbar from "../Navbar/Navbar";
import Carrousel from "../Carrousel/Carrousel";
import Filters from "../Filters/Filters";
import Product from "../Product/Product";

const Home = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="home">
      <Navbar />
      <Carrousel />
      <div className="filtros_productos">
        <Filters />
        <div className="products">
          {allProducts.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/actions";
import "./carrousel.scss";

const Carrousel = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    const productsCopy = [...allProducts];
    const randomProducts = [];
    while (randomProducts.length < 3 && productsCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsCopy.length);
      randomProducts.push(productsCopy.splice(randomIndex, 1)[0]);
    }
    setRandomImages(randomProducts);
  }, [allProducts]);

  return (
    <div className="carrousel">
      {randomImages.map((product) => (
        <img key={product.id} src={product.image} alt={product.name} />
      ))}
    </div>
  );
};

export default Carrousel;

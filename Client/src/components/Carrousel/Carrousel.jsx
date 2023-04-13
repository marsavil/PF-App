import React, { useState } from "react";
import "./carrousel.scss";
import productsCarrousel from "./carrouselProducts.json";

const Carrousel = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleDetail = async () => {
    try {
    } catch (error) {}
  };

  const handlePrev = () => {
    const prevIndex = (currentProductIndex - 1 + productsCarrousel.length) % productsCarrousel.length;
    setCurrentProductIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentProductIndex + 1) % productsCarrousel.length;
    setCurrentProductIndex(nextIndex);
  };

  const currentProduct = productsCarrousel[currentProductIndex];

  return (
    <div className="carrousel">
      <img src={currentProduct.image} alt={currentProduct.name} />
      <section>
        <h3>{currentProduct.name}</h3>
        <button className="button" onClick={handleDetail}>
          Ver detalles
        </button>
      </section>

      <button className="scrollCarrousel" onClick={handlePrev}>
        &lt;
      </button>
      <button className="scrollCarrousel" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Carrousel;

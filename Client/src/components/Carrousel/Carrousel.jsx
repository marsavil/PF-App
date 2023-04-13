import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/actions";
import "./carrousel.scss";

const Carrousel = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setCurrentProductIndex(0);
  }, [allProducts]);

  const handlePrev = () => {
    const prevIndex = currentProductIndex === 0 ? allProducts.length - 1 : currentProductIndex - 1;
    document.querySelector(".carrousel img").style.opacity = 0;
    setTimeout(() => {
      setCurrentProductIndex(prevIndex);
      document.querySelector(".carrousel img").style.opacity = 1;
    }, 500);
  };

  const handleNext = () => {
    const nextIndex = currentProductIndex === allProducts.length - 1 ? 0 : currentProductIndex + 1;
    document.querySelector(".carrousel img").style.opacity = 0;
    setTimeout(() => {
      setCurrentProductIndex(nextIndex);
      document.querySelector(".carrousel img").style.opacity = 1;
    }, 500);
  };

  return (
    <div className="carrousel">
      {allProducts.length > 0 && (
        <React.Fragment key={allProducts[currentProductIndex].id}>
          <img src={allProducts[currentProductIndex].image} alt={allProducts[currentProductIndex].name} />
          <h3>{allProducts[currentProductIndex].name}</h3>
          <button onClick={handlePrev}>&lt;</button>
          <button onClick={handleNext}>&gt;</button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Carrousel;

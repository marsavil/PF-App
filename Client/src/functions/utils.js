export const handleOrder = (allProducts, orderProducts) => {
  const sortedProducts = allProducts.sort((a, b) => {
    if (orderProducts === "menor") {
      return a.price - b.price;
    } else if (orderProducts === "mayor") {
      return b.price - a.price;
    } else if (orderProducts === "none") {
      return allProducts;
    }
  });

  return sortedProducts;
};

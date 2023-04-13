import "./product.scss";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <section className="info">
        <p>{product.name}</p>
        <p>{product.brand}</p>
        <p>${product.price.toLocaleString()}</p>
      </section>
      <button className="button">Agregar al carrito</button>
    </div>
  );
};

export default Product;

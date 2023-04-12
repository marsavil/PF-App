import "./product.scss";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.brand}</p>
      <p>Precio: ${product.price.toLocaleString()}</p>
      <button className="button">Agregar al carrito</button>
    </div>
  );
};

export default Product;

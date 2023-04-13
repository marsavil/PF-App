import "./product.scss";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <section className="info">
        <p className="pName">{product.name}</p>
        <p className="pBrand">{product.brand}</p>
        <p className="pPrice">$ {product.price.toLocaleString()}</p>
      </section>
      <button className="button">Agregar al carrito</button>
    </div>
  );
};

export default Product;

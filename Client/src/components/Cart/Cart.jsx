import "./cart.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { addToCart, subToCart, removeFromCart } from "../../redux/actions/actions";
import PurchaseOrderButton from "../PurchaseOrderButton/PurchaseOrderButton";

const Cart = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const cartProducts = useSelector((state) => state.cartProducts);
  const totalPrice = useSelector((state) => state.totalPrice);

  useEffect(() => {
    dispatch(getCart(id));
  }, []);

  const handleAddProduct = async (idProduct) => {
    await dispatch(addToCart(idProduct, id));
    dispatch(getCart(id));
  };

  const handleSubProduct = async (idProduct) => {
    await dispatch(subToCart(idProduct, id));
    dispatch(getCart(id));
  };

  const handleRemoveFromCart = async (idProduct) => {
    await dispatch(removeFromCart(idProduct, id));
    dispatch(getCart(id));
  };

  return (
    <div className="cartProduct">
      {cartProducts?.length > 0 ? (
        <div className="cart-products">
          {cartProducts?.map((product) => (
            <section className="cart-product" key={product.id}>
              <button className="cart-delete-button" onClick={() => handleRemoveFromCart(product.id)}>
                Eliminar
              </button>
              <img className="cart-product-image" src={product.image} alt={product.name} />
              <Link to={`/detail/${product.id}`} className="cart-product-name">
                {product.name}
              </Link>
              <div className="cart-product-quantity">
                <button onClick={() => handleSubProduct(product.id)}>-</button>
                <h4>{product.ShoppingCart_Products.quantity}</h4>
                <button onClick={() => handleAddProduct(product.id)}>+</button>
              </div>
              <h3 className="cart-product-price">
                $ {(product.ShoppingCart_Products.quantity * product.price).toLocaleString()}
              </h3>
            </section>
          ))}
          <section className="section-totalPrice">
            <p className="labelPrice">Precio total: </p>
            <p className="pPrice">$ {totalPrice.toLocaleString()}</p>
          </section>
          <section className="section-totalPrice">
            <PurchaseOrderButton products={cartProducts} />
          </section>
        </div>
      ) : (
        <div className="cart-products">
          <p className="cart-empty">El carrito de compras está vacío</p>
        </div>
      )}
    </div>
  );
};

export default Cart;

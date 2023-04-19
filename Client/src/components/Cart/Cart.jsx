import "./cart.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import PurchaseOrderButton from "../purchaseOrderButton/PurchaseOrderButton";

const Cart = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const cartProducts = useSelector((state) => state.cartProducts);
  const totalPrice = useSelector((state) => state.totalPrice);

  useEffect(() => {
    dispatch(getCart(id));
  }, []);

  return (
    <div className="cartProduct">
      {cartProducts?.length > 0 ? (
        <div className="cart-products">
          {cartProducts?.map((product) => (
            <Link to={`/detail/${product.id}`} className="cart-product" key={product.id}>
              <img className="cart-product-image" src={product.image} alt={product.name} />
              <h2 className="cart-product-name">{product.name}</h2>
              <p className="cart-product-quantity">{product.ShoppingCart_Products.quantity}</p>
              <h3 className="cart-product-price">
                $ {(product.ShoppingCart_Products.quantity * product.price).toLocaleString()}
              </h3>
            </Link>
          ))}
          <section className="section-totalPrice">
            <p className="labelPrice">Precio total: </p>
            <p className="pPrice">$ {totalPrice.toLocaleString()}</p>
          </section>
          <section className="section-totalPrice">
            <PurchaseOrderButton />
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

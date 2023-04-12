import "./cart.scss";

const Cart = () => {
  const productCart = 0;

  return (
    <div className="cart">
      {productCart}
      <img
        src="https://cdn0.iconfinder.com/data/icons/iconoteka-stroke/24/iconoteka_shopping_cart__grocery_store_b_s-256.png"
        alt=""
        width={25}
        height={25}
      />
    </div>
  );
};

export default Cart;

import "./cart.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/actions/actions";

const Cart = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const cartProducts = useSelector((state) => state.cartProducts);

  useEffect(() => {
    dispatch(getCart(id));
  }, []);

  // console.log(cartProducts);

  return (
    <div className="cart">
      <h1>cart</h1>
    </div>
  );
};

export default Cart;

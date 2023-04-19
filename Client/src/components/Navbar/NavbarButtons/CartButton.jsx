import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../../redux/actions/actions";

const CartButton = ({ userId }) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.totalQuantity);

  useEffect(() => {
    dispatch(getCart(userId));
  }, []);

  return (
    <Link to="/cart" className="perfil">
      <div className="cart">
        {totalQuantity}
        <img
          src="https://cdn0.iconfinder.com/data/icons/iconoteka-stroke/24/iconoteka_shopping_cart__grocery_store_b_s-256.png"
          alt=""
          width={25}
          height={25}
        />
      </div>
    </Link>
  );
};

export default CartButton;

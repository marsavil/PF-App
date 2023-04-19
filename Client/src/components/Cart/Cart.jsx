import "./cart.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const cartProducts = useSelector((state) => state.cartProducts);
  const totalPrice = useSelector((state) => state.totalPrice);

  useEffect(() => {
    dispatch(getCart(id));
  }, []);

  console.log(cartProducts);

  //   {
  //     "id": 2,
  //     "name": "Apple Macbook Air (13 Pulgadas, 2020, Chip M1, 256 Gb De Ssd, 8 Gb De Ram) - Gris Espacial",
  //     "brand": "Apple",
  //     "price": 408000,
  //     "image": "https://res.cloudinary.com/dlzp43wz9/image/upload/v1681426361/Products/02_yxyxpf.png",
  //     "description": "La notebook más delgada y ligera de Apple viene con los superpoderes del chip M1. Termina todos tus proyectos mucho más rápido con el CPU de 8 núcleos y disfruta como nunca antes de apps y juegos con gráficos avanzados gracias al GPU de hasta 8 núcleos. Además, el Neural Engine de 16 núcleos se encarga de acelerar todos los procesos de aprendizaje automático. Todo en un diseño silencioso sin ventilador que te ofrece la mayor duración de batería en una MacBook Air: hasta 18 horas. (1) Portátil como siempre, más poderosa que nunca.\nAvisos Legales\nNo todos los recursos y configuraciones están disponibles en todos los países.\n(1) La duración de la batería varía según el uso y la configuración.\n(2) Comparado con la generación anterior.\n(3) El tamaño de la pantalla se mide en diagonal.",
  //     "stock": 8,
  //     "category": "Notebook",
  //     "disable": false,
  //     "ShoppingCart_Products": {
  //         "id": 1,
  //         "quantity": 16,
  //         "ProductId": 2,
  //         "ShoppingCartId": 1
  //     }
  // }

  return (
    <div className="cartProduct">
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
          <button>Continuar compra</button>
        </section>
      </div>
    </div>
  );
};

export default Cart;

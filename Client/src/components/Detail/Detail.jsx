import "./detail.scss";
import { getProductDetail, clearDetail } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  let dispatch = useDispatch();
  let { id } = useParams();

  const productDetail = useSelector((state) => state.productDetail);
  const navigate = useNavigate();

  function backToHome() {
    dispatch(clearDetail());
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <div className="detail-container">
      {productDetail?.id ? (
        <>
          <div className="detail-image">
            <img src={productDetail.image} alt={productDetail.name} />
          </div>
          <div className="detail-info">
            <h2>{productDetail.name}</h2>
            <h1>$ {productDetail.price.toLocaleString()}</h1>{" "}
          </div>
          <div className="detail-buy">
            <p>
              Stock: <b>{productDetail.stock} unidades</b>
            </p>
            <button>Comprar ahora</button>
            <button className="button-cart">Agregar al carrito </button>
          </div>
          <div className="detail-description">
            <h2>Características del producto</h2>
            <h3>Categoría: {productDetail.category}</h3>
            <h3>Marca: {productDetail.brand}</h3>
            <h2>Descripción</h2>
            <p>{productDetail.description}</p>
          </div>
        </>
      ) : (
        <div className="redirect">
          <h1>Parece que esta página no existe</h1>
          <button onClick={backToHome}>Ir a la página principal</button>
        </div>
      )}
    </div>
  );
};
export default Detail;

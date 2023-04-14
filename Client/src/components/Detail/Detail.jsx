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
    <div>
      {productDetail?.id ? (
        <div>
          <h2>{productDetail.name}</h2>
          <img src={productDetail.image} alt={productDetail.name} />

          <p>{productDetail.category}</p>

          <h3>
            {productDetail.brand} - Precio: $ {productDetail.price}
          </h3>
          <p>{productDetail.description}</p>
          <p>Stock: {productDetail.stock}</p>
          <button onClick={backToHome}>Volver</button>
        </div>
      ) : (
        <div>
          <h1>Producto no encontrado</h1>
          <button onClick={backToHome}>Volver</button>
        </div>
      )}
    </div>
  );
};
export default Detail;

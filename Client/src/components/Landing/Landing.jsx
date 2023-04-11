import "./landing.scss";
import background from "../../../public/assets/img/bg-landing.jpg";

const Landing = () => {
  return (
    <div className="landing">
      <img className="background-img" src={background} alt="fondo" />
      <aside>
        <h1 className="title">ElectroShop</h1>
        <div>
          <p className="subtitle">Bienvenido a nuestra tienda de productos electrónicos</p>
          <p className="desc">Aquí encontrarás los mejores productos al mejor precio</p>
        </div>
        <button className="button">Explorar productos</button>
      </aside>
    </div>
  );
};

export default Landing;

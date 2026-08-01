import "./Hero.css";
import { Link } from "react-router-dom";
import imacImage from "../../../assets/hello.png";
import imac24Image from "../../../assets/imac-hero.jpg";
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <img src={imacImage} alt="Hello" className="hero-image" />
        <h1>Say hello to the new iMac.</h1>
        <p>Experience the power and beauty of the all-new iMac.</p>
        <Link to="/shop/buy-mac/imac">
          <button className="hero-button">Buy iMac</button>
        </Link>
        <img src={imac24Image} alt="iMac 24" className="imac-image" />
      </div>
    </section>
  );
};

export default Hero;

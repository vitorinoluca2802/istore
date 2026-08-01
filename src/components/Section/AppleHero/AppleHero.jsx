import { Link } from "react-router-dom";
import appleLogo from "../../../assets/apple.svg";
import "./AppleHero.css";

const AppleHero = () => {
  return (
    <>
      <Link to="/shop/buy-iphone/iphone-17-pro">
        <div className="iphone-section">
          <div className="apple-hero-wordmark">
            <img src={appleLogo} alt="" />
            <span>iPhone 17 Pro</span>
          </div>
        </div>
      </Link>
      <div className="section-container">
        <Link to="/shop/buy-accessories/homepod">
          <div className="section-left">
            <div className="apple-hero-wordmark">
              <img src={appleLogo} alt="" />
              <span>HomePod</span>
            </div>
          </div>
        </Link>
        <Link to="/shop/buy-watch/apple-watch-series-10">
          <div className="section-right">
            <div className="apple-hero-wordmark">
              <img src={appleLogo} alt="" />
              <span>Watch Series 10</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default AppleHero;

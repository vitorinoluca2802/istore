import { Link } from "react-router-dom";
import iphonelogo from "../../../assets/iphonelogo.png";
import watchserieslogo from "../../../assets/logo-watch-series-8.png";
import homepodlogo from "../../../assets/homepod-logo.png";
import "./AppleHero.css";

const AppleHero = () => {
  return (
    <>
      <Link to="/shop/buy-iphone/iphone-14-pro">
        <div className="iphone-section">
          <img src={iphonelogo} alt="iPhone" />
        </div>
      </Link>
      <div className="section-container">
        <Link to="/shop/buy-accessories/homepod---midnight">
          <div className="section-left homepod-section">
            <img src={homepodlogo} alt="HomePod" />
          </div>
        </Link>
        <Link to="/shop/buy-watch/apple-watch-series-8">
          <div className="section-right watch-series-8-section">
            <img src={watchserieslogo} alt="Watch Series 8" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default AppleHero;

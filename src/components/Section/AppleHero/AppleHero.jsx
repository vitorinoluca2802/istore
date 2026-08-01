import { Link } from "react-router-dom";
import appleLogo from "../../../assets/apple.svg";
import iphoneBg from "../../../assets/iphone-14.jpg";
import iphoneBgMobile from "../../../assets/iphone14-bg-mobile.jpg";
import homepodBg from "../../../assets/homepod.jpg";
import watchBg from "../../../assets/watch-series-8.jpg";

const Wordmark = ({ children, className = "" }) => (
  <div
    className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 ${className}`}
  >
    <img src={appleLogo} alt="" className="h-[26px] w-[26px]" />
    <span className="text-2xl font-semibold text-white">{children}</span>
  </div>
);

const AppleHero = () => {
  return (
    <>
      <Link to="/shop/buy-iphone/iphone-17-pro">
        <div className="relative h-[50svh] bg-black">
          <div
            className="absolute inset-0 hidden bg-black bg-contain bg-bottom bg-no-repeat md:block"
            style={{ backgroundImage: `url(${iphoneBg})` }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{ backgroundImage: `url(${iphoneBgMobile})` }}
          />
          <Wordmark className="top-[5vh]">iPhone 17 Pro</Wordmark>
        </div>
      </Link>
      <div className="mt-[5px] flex h-[40vh] flex-wrap items-stretch justify-center gap-[5px] max-[600px]:h-[50vh] max-[600px]:flex-col">
        <Link to="/shop/buy-accessories/homepod" className="h-full flex-1">
          <div
            className="relative h-full bg-black bg-contain bg-bottom bg-no-repeat max-[600px]:bg-cover max-[600px]:bg-center"
            style={{ backgroundImage: `url(${homepodBg})` }}
          >
            <Wordmark className="top-[5vh]">HomePod</Wordmark>
          </div>
        </Link>
        <Link to="/shop/buy-watch/apple-watch-series-10" className="h-full flex-1">
          <div
            className="relative h-full bg-black bg-bottom bg-no-repeat bg-[length:130%] md:bg-[length:110%] lg:bg-[length:80%] xl:bg-[length:60%] max-[600px]:bg-cover max-[600px]:bg-top"
            style={{ backgroundImage: `url(${watchBg})` }}
          >
            <Wordmark className="top-[3vh]">Watch Series 10</Wordmark>
          </div>
        </Link>
      </div>
    </>
  );
};

export default AppleHero;

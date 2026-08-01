import { Link } from "react-router-dom";
import imacImage from "../../../assets/hello.png";
import imac24Image from "../../../assets/imac-hero.jpg";

const Hero = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-[#fafafa] p-10 text-center">
      <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center gap-4">
        <img src={imacImage} alt="Hello" className="w-full max-w-[200px]" />
        <h1 className="text-4xl font-semibold text-text">
          Say hello to the new iMac.
        </h1>
        <p className="text-text-secondary">
          Experience the power and beauty of the all-new iMac.
        </p>
        <Link to="/shop/buy-mac/imac-8-core-gpu">
          <button className="my-4 mb-20 cursor-pointer rounded-full border-none bg-link px-5 py-2.5 text-base text-white hover:bg-link-hover">
            Buy iMac
          </button>
        </Link>
        <img
          src={imac24Image}
          alt="iMac 24"
          className="ml-[30px] w-full"
        />
      </div>
    </section>
  );
};

export default Hero;

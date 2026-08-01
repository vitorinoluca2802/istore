import loaderGif from "../../assets/loader.gif";

export const Loader = () => (
  <div className="absolute left-0 top-0 z-[5] flex h-[100svh] w-full items-center justify-center bg-white">
    <img className="w-[50px]" src={loaderGif} alt="" />
  </div>
);

import { useState, useEffect } from "react";
import search from "../../../assets/search.svg";
import arrow from "../../../assets/arrow-right.svg";
import x from "../../../assets/x.svg";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../Hooks/useProducts";

export const SearchWidget = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [quickLinks, setQuickLinks] = useState([]);
  const navigate = useNavigate();
  const { products } = useProducts();
  useEffect(() => {
    if (products.length > 0) {
      const getRandomProducts = (arr, count) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
      const randomProducts = getRandomProducts(products, 5);
      setQuickLinks(randomProducts);
    }
  }, [products]);

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (searchValue !== "") {
      navigate(`/search/${searchValue}`);
      handleSearch();
      setSearchValue("");
    }
  };

  const clearInputValue = () => {
    setSearchValue("");
  };

  return (
    <>
      {openSearch ? (
        <div
          onClick={handleSearch}
          className="fixed left-0 top-0 z-[-1] h-full w-full bg-[#111111a1]"
        ></div>
      ) : (
        ""
      )}
      <button
        onClick={handleSearch}
        className="flex cursor-pointer items-center justify-center border-none bg-none"
      >
        <img src={search} alt="" />
      </button>
      <div
        className={
          "fixed left-0 top-0 z-[-1] h-[40svh] w-full bg-[#111] transition-transform duration-500 max-md:h-[100svh] " +
          (openSearch ? "" : "-translate-y-full")
        }
      >
        <div className="relative top-16 mx-auto flex w-[580px] flex-col max-md:top-0 max-md:h-auto max-md:w-full max-md:px-8 max-md:py-16">
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center justify-between"
          >
            <div>
              <button className="cursor-pointer border-none bg-none">
                <img src={search} alt="" />
              </button>
              <input
                className="ml-2.5 w-[210px] border-none bg-none text-2xl font-semibold tracking-[0.009em] text-[#e8e8ed] outline-none"
                type="text"
                placeholder="Search istore.com"
                value={searchValue}
                onChange={handleInputChange}
              />
            </div>
            {searchValue.length !== 0 ? (
              <button
                className="flex h-min w-min cursor-pointer items-center justify-center rounded-full bg-[#8f8f8f] transition-colors duration-200 hover:bg-white"
                onClick={clearInputValue}
              >
                <img src={x} alt="" />
              </button>
            ) : null}
          </form>
          <p className="font-normal text-[rgb(134,134,139)]">Quick Links</p>
          {quickLinks.map((product) => {
            return (
              <Link
                onClick={handleSearch}
                key={product.title}
                className="text-xs font-medium text-white no-underline"
                to={`/shop/buy-${product.category}/${product.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <span className="relative right-[5px] flex h-[25px] items-center leading-10 hover:bg-[#1d1d1f]">
                  <img src={arrow} alt="" className="w-[25px]" />
                  {product.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

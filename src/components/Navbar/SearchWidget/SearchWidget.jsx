import { useState, useEffect } from "react";
import search from "../../../assets/search.svg";
import arrow from "../../../assets/arrow-right.svg";
import x from "../../../assets/x.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseProducts } from "../../Hooks/useFirebaseProductos";

export const SearchWidget = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [quickLinks, setQuickLinks] = useState([]);
  const navigate = useNavigate();
  const { products } = useFirebaseProducts();
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
      <div
        onClick={handleSearch}
        id={openSearch ? "overlay-active" : "overlay-inactive"}
      ></div>
      <button onClick={handleSearch} className="nav-button">
        <img src={search} alt="" />
      </button>
      <div
        className={
          openSearch ? "search-container" : "search-container searchInactive"
        }
      >
        <div className="search-content">
          <form onSubmit={handleFormSubmit} className="search-form">
            <div>
              <button>
                <img src={search} alt="" />
              </button>
              <input
                className="search-input"
                type="text"
                placeholder="Search istore.com"
                value={searchValue}
                onChange={handleInputChange}
              />
            </div>
            {searchValue.length !== 0 ? (
              <button className="clearSearch" onClick={clearInputValue}>
                <img src={x} alt="" />
              </button>
            ) : null}
          </form>
          <p>Quick Links</p>
          {quickLinks.map((product) => {
            return (
              <Link
                onClick={handleSearch}
                key={product.title}
                className="search-link"
                to={`/shop/buy-${product.category}/${product.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <span>
                  <img src={arrow} alt="" />
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

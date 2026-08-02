import { NavBar } from "./components/Navbar/NavBar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Search } from "./pages/Search";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartContext } from "./context/CartContext";
import { useEffect, useState } from "react";
import { Landing } from "./pages/Landing";
import { Support } from "./pages/Support";
import { Footer } from "./components/Footer/Footer";
import { Cart } from "./components/Cart/Cart";
import { Checkout } from "./components/Checkout/Checkout";
import { Products } from "./components/Section/Products/Products";
import { Link } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);
  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <div className="App">
          <BrowserRouter>
            <ScrollToTop />
            <NavBar />
            <Routes>
              {/* Ruta inicial */}
              <Route path="/" element={<Landing />} />
              {/* Dividir productos por categorias */}
              <Route
                path="/category/:categoryId"
                element={<ItemListContainer />}
              />
              {/* Detalle del producto */}
              <Route
                path="shop/:shopId/:productName"
                element={<ItemDetailContainer />}
              />
              <Route path="/search/:productName" element={<Search />} />
              <Route path="/store" element={<Products />} />
              <Route path="/support" element={<Support />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="*"
                element={
                  <div className="flex h-[90vh] flex-col items-center justify-center gap-4">
                    <h1 className="text-3xl font-semibold">
                      Error 404 not found
                    </h1>
                    <Link to="/" className="text-link no-underline hover:underline">
                      Go Home
                    </Link>
                  </div>
                }
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </CartContext.Provider>
    </>
  );
};

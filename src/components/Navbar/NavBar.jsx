import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchWidget } from "./SearchWidget/SearchWidget";
import { CartWidget } from "./CartWidget/CartWidget";
import { useScrolled } from "../Hooks/useScrolled";
import logo from "../../assets/apple.svg";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

export const NavBar = () => {
  const links = [
    { id: 2, name: "Mac", url: "mac" },
    { id: 3, name: "iPad", url: "ipad" },
    { id: 4, name: "iPhone", url: "iphone" },
    { id: 5, name: "Watch", url: "watch" },
    { id: 6, name: "Accessories", url: "accessories" },
    { id: 7, name: "Support", url: "support" },
  ];
  const [openNavbar, setOpenNavbar] = useState(false);
  const scrolled = useScrolled();
  const handleToggleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };
  return (
    <header
      className={`fixed left-0 top-0 z-20 h-[50px] w-full bg-[rgba(22,22,23,0.8)] leading-[50px] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-white/10 shadow-[0_1px_20px_rgba(0,0,0,0.25)]"
          : "border-b border-transparent"
      }`}
    >
      <nav className="flex h-[50px] items-center">
        <ul className="flex w-full items-center justify-center gap-[50px] max-md:justify-between max-md:px-8">
          <li>
            <Link
              to={`/`}
              className="flex items-center transition-opacity duration-200 hover:opacity-70"
            >
              <img src={logo} alt="" />
            </Link>
          </li>
          <li
            className={
              "max-md:fixed max-md:inset-x-0 max-md:top-0 max-md:z-[1] max-md:h-[100svh] max-md:w-full max-md:bg-[rgba(17,17,17,0.92)] max-md:backdrop-blur-xl max-md:transition-transform max-md:duration-500 " +
              (openNavbar ? "" : "max-md:-translate-y-full")
            }
          >
            <ul className="flex gap-[50px] max-md:flex-col max-md:gap-0 max-md:p-8 max-md:pt-20">
              {links.map((link) => {
                return (
                  <li key={link.id}>
                    <Link
                      to={
                        link.url == "support"
                          ? "/support"
                          : `/category/${link.url}`
                      }
                      onClick={handleToggleNavbar}
                      className="group relative text-xs text-[#afafaf] no-underline transition-colors duration-200 hover:text-white max-md:text-[1.3rem] max-md:font-semibold"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-200 group-hover:scale-x-100 max-md:hidden" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="flex items-center gap-[50px] max-md:gap-[30px]">
            <SearchWidget />
            <CartWidget />
            <button
              id="menu"
              className="hidden cursor-pointer items-center justify-center border-none bg-none max-md:flex"
              onClick={handleToggleNavbar}
              aria-label={openNavbar ? "Close menu" : "Open menu"}
            >
              <img src={openNavbar ? close : menu} alt="" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

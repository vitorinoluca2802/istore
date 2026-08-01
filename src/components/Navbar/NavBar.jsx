import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchWidget } from "./SearchWidget/SearchWidget";
import { CartWidget } from "./CartWidget/CartWidget";
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
  const handleToggleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };
  return (
    <header className="fixed left-0 top-0 z-10 h-[50px] w-full bg-[rgba(22,22,23,0.88)] leading-[50px]">
      <nav>
        <ul className="flex items-center justify-center gap-[50px] max-md:justify-between max-md:px-8">
          <li>
            <Link to={`/`}>
              <img src={logo} alt="" />
            </Link>
          </li>
          <li
            className={
              "max-md:fixed max-md:inset-x-0 max-md:top-0 max-md:z-[1] max-md:h-[100svh] max-md:w-full max-md:bg-[#111] max-md:transition-transform max-md:duration-500 " +
              (openNavbar ? "" : "max-md:-translate-y-full")
            }
          >
            <button
              className="hidden cursor-pointer items-center justify-center border-none bg-none max-md:mt-1 max-md:ml-auto max-md:block max-md:h-[50px] max-md:px-8"
              onClick={handleToggleNavbar}
            >
              <img src={close} alt="" />
            </button>
            <ul className="flex gap-[50px] max-md:flex-col max-md:gap-0 max-md:p-8">
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
                      className="text-xs text-[#afafaf] no-underline hover:text-white max-md:text-[1.3rem] max-md:font-semibold"
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="flex gap-[50px] max-md:gap-[30px]">
            <SearchWidget />
            <CartWidget />
            <button
              id="menu"
              className="hidden cursor-pointer items-center justify-center border-none bg-none max-md:mt-[4.5px] max-md:flex"
              onClick={handleToggleNavbar}
            >
              <img src={menu} alt="" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

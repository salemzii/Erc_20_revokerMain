import { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../assets/svg/zenith fi logo two.svg";

const links = [
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
  {
    name: "FAQs",
    path: "/faqs",
  },
];

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const activeStyles = {
    backgroundColor: "#DDE2FF",
    color: "#000",
  };

  const navOpenHandler = () => {
    setNavOpen(true);
    document.body.classList.add("overflow-hidden", "lg:overflow-auto");
  };

  const navCloseHandler = () => {
    setNavOpen(false);
    document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
  };

  return (
    <div
      className={`sticky navbar top-0 transition-transform duration-500 z-20 font-Albert`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4 md:py-5">
          <Link
            className="text-white flex items-center gap-1 font-black font-Inter text-[21px]"
            to="/"
          >
            <img src={Logo} alt="Logo" className="w-7" />
            ZenithFi
          </Link>
          <div className="items-center hidden gap-4 lg:flex">
            {links.map((link, i) => (
              <NavLink
                className={`flex items-center text-white gap-2 py-2 px-6 transition-colors ease-in-out rounded-full hover:bg-[#DDE2FF] hover:text-[#000]`}
                to={link.path}
                key={i}
                style={({ isActive }) => (isActive ? activeStyles : null)}
              >
                <span className="text-sm font-bold">{link.name}</span>
              </NavLink>
            ))}
          </div>
          <a
            target="_blank"
            href="https://dashboard.zenithfi.co"
            className="hidden btn btn-gradient lg:inline-block font-Inter"
          >
            Get Started
          </a>

          <button
            type="button"
            className={`lg:hidden transition-opacity ${
              navOpen ? "opacity-0" : "opacity-100"
            }`}
            onClick={navOpenHandler}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 18H21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        <Transition
          show={navOpen}
          enter="transition-transform duration-200"
          enterFrom="-translate-x-[calc(100%+40px)]"
          enterTo="translate-x-0"
          leave="transition-transform duration-200"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-[calc(100%+40px)]"
          className="absolute top-0 left-0 z-10 h-screen p-4 duration-150 w-80 lg:hidden pb-11"
        >
          <div className="absolute top-0 left-0 z-10 h-screen p-4 navbars w-80 lg:hidden pb-11">
            <div className="flex flex-col h-full">
              {/* <Link
                className='text-white heading-secondary'
                to='/'
                onClick={navCloseHandler}
              >
                Logo
              </Link> */}
              <Link
                className="text-white flex items-center gap-1 font-black font-Inter text-[21px] px-2"
                to="/"
                onClick={navCloseHandler}
              >
                <img src={Logo} alt="Logo" className="w-7" />
                ZenithFi
              </Link>

              <div className="flex flex-col flex-1 gap-8 mt-12">
                {links.map((link, i) => (
                  <NavLink
                    onClick={navCloseHandler}
                    className={`flex items-center gap-2 text-white py-2 px-2 rounded-full transition-colors`}
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    to={link.path}
                    key={i}
                  >
                    <span className="text-sm font-bold">{link.name}</span>
                  </NavLink>
                ))}
              </div>

              <a
                onClick={navCloseHandler}
                target="_blank"
                href="https://dashboard.zenithfi.co"
                className="btn btn-gradient font-Albert md:inline-block"
              >
                Get Started
              </a>
            </div>

            <button
              className="absolute top-4 -right-10"
              onClick={navCloseHandler}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </Transition>

        <Transition
          show={navOpen}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 h-screen bg-black lg:hidden"
          onClick={navCloseHandler}
        ></Transition>
      </div>
    </div>
  );
};

export default Navbar;

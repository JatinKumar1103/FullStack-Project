import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [MobileNav, setMobileNav] = useState(false);
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "All Podcasts",
      path: "/all-podcasts",
    },
    {
      name: "Profile",
      path: "/Profile",
    },
  ];
  return (
    <nav className="px-4 md:px-8 lg:px-12 py-2 border-b-2 relative">
      <div className="flex items-center justify-between ">
        <div className="logo brand-name w-2/6 flex items-center gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9043/9043096.png"
            alt="PodFlow Logo"
            className="h-14"
          />
          <Link to="/" className="text-2xl font-bold">
            PodFlow
          </Link>
        </div>

        <div className="hidden w-2/6 lg:flex items-center justify-center">
          {navLinks.map((items, i) => (
            <Link
              key={i}
              to={items.path}
              className="ms-4 hover:font-semibold transition-all duration-300"
            >
              {items.name}
            </Link>
          ))}
        </div>
        <div className="hidden w-2/6 lg:flex gap-2 items-center justify-end">
          <Link className="px-6 py-3 border border-black rounded-full">
            Login
          </Link>
          <Link className="px-6 py-3 border bg-black text-white rounded-full">
            SignUp
          </Link>
        </div>
        <div className="w-4/6 flex items-center lg:hidden justify-end z-[100]">
          <button
            className="text-4xl "
            onClick={() => setMobileNav(!MobileNav)}
          >
            <IoReorderThreeOutline />
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-blue-100 ${
          MobileNav ? "translate-y-[0%]" : "translate-y-[-100%]"
        } transition-all duration-500`}
      >
        <div className="p-8 flex items-center justify-end text-4xl">
          <button 
          onClick={() => setMobileNav(!MobileNav)}
          className="bg-black text-white rounded-full p-2">
            <RxCross1 />
          </button>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          {navLinks.map((items, i) => (
            <Link
              key={i}
              to={items.path}
              className="mb-12 hover:font-semibold transition-all duration-300 text-3xl"
            >
              {items.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="mb-12 hover:font-semibold transition-all duration-300 text-3xl "
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="mb-12 hover:font-semibold transition-all duration-300 text-3xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

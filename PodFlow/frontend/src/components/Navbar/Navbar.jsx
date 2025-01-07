import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross1, RxCross2 } from "react-icons/rx";
import {useSelector} from "react-redux"

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
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
          {!isLoggedIn && (
            <>
            {" "}
            <Link className="px-6 py-3 border border-black rounded-full " to="/login">
            Login
          </Link>
          <Link className="px-6 py-3 border bg-black text-white rounded-full" to="/signup">
            SignUp
          </Link>
          </>
          )}
          {isLoggedIn && <Link className="px-6 py-3 border bg-black text-white rounded-full" to="/profile">
            Profile
          </Link>}
        </div>
        <div className="w-4/6 flex items-center lg:hidden justify-end z-[100]">
          <button
            className={`text-4xl ${MobileNav ? "rotate-360":"rotate-180"} transition-all duration-300`}
            onClick={() => setMobileNav(!MobileNav)}
          >
            {MobileNav?<RxCross2/> : <IoReorderThreeOutline/>}
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-blue-100 ${
          MobileNav ? "translate-y-0" : "translate-y-[-100%]"
        } transition-all duration-500`}
      >
      
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
          {!isLoggedIn ? <><Link
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
          </Link> </> : <><Link
            to="/profile"
            className="mb-12 hover:font-semibold transition-all duration-300 text-3xl"
          >
            Profile
          </Link></>}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

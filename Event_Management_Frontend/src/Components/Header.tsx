import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Menu from "../Pages/Menu";
const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  function handleDrawerOpen() {
    setIsDrawerOpen((prevDrawerState) => !prevDrawerState);
  }

  function handleDrawerClose() {
    setIsDrawerOpen((prevDrawerState) => !prevDrawerState);
  }
  return (
    <nav className="bg-orange-50 px-24 h-[10vh] grid grid-cols-3 items-center text-black">
      <button>
        <RxHamburgerMenu
          className="text-4xl w-16 border-2 rounded-md"
          onClick={handleDrawerOpen}
        />
      </button>
      {isDrawerOpen && (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
            onClick={handleDrawerClose}
          />
          <Menu onClose={handleDrawerClose} />
        </>
      )}
      <h2 className="text-3xl font-semibold justify-self-center">SpotLight</h2>
      <div className="flex gap-4 text-xl justify-end font-light">
        <NavLink
          to={
            location.pathname === "/auth/login" ? "/auth/signup" : "/auth/login"
          }
          className="flex items-center gap-2 z-10"
        >
          <span>
            <FaUserCircle />
          </span>
          {location.pathname === "/auth/login" ? "Sign Up" : "Log In"}
        </NavLink>
        <NavLink to="/contact" className="border-2 p-1 border-black ">
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;

import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  return (
    <nav className="bg-orange-50 px-24 h-[10vh] grid grid-cols-3 items-center text-black">
      <RxHamburgerMenu className="text-4xl w-16" />
      <h2 className="text-3xl font-semibold justify-self-center">SpotLight</h2>
      <div className="flex gap-4 text-xl justify-end">
        <NavLink to="/auth/login" className="flex items-center gap-2 z-10">
          <span>
            <FaUserCircle />
          </span>
          {location.pathname === "/auth/login" ? "Sign Up" : "Log In"}
        </NavLink>
        <NavLink to="/contact" className="border-2 p-1 border-black">
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;

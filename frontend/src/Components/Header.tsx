import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useState, MouseEvent } from "react";
import Menu from "../Pages/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeAuthentication } from "../store/authSlice";
import axiosInstance from "../Utils/axiosInstance";
const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  function handleDrawerOpen() {
    setIsDrawerOpen((prevDrawerState) => !prevDrawerState);
  }

  function handleDrawerClose() {
    setIsDrawerOpen((prevDrawerState) => !prevDrawerState);
  }
  async function handleLogout(event: MouseEvent<HTMLButtonElement>) {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        dispatch(removeAuthentication());
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <nav className="bg-orange-100 px-24 h-[10vh] grid grid-cols-3 items-center text-black shadow-md sticky top-0 z-10">
      <button className="w-16">
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
      <NavLink
        to="/"
        className="text-3xl text-orange-600 font-semibold justify-self-center"
      >
        SpotLight
      </NavLink>
      <div className="flex gap-4 text-md justify-end font-light">
        {!isAuthenticated && (
          <NavLink
            to={location.pathname === "/login" ? "/signup" : "/login"}
            className="flex items-center gap-2 z-10 font-bold"
          >
            <span>
              <FaUserCircle />
            </span>
            {location.pathname === "/login" ? "Sign Up" : "Log In"}
          </NavLink>
        )}
        {isAuthenticated && (
          <button
            className="flex items-center gap-2 z-10 font-bold"
            onClick={handleLogout}
          >
            <span>
              <FaUserCircle />
            </span>
            Log Out
          </button>
        )}
        <NavLink
          to="/contact"
          className="border-2 p-1 border-black rounded-md font-bold"
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;

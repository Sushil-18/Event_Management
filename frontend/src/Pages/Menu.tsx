import { TfiClose } from "react-icons/tfi";
import { MdHomeFilled } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
interface menuProps {
  isDrawerOpen?: boolean;
  onClose: () => void;
}

const Menu: React.FC<menuProps> = ({ onClose }) => {
  //const navigate = useNavigate();
  const recentEvents = useSelector(
    (state: RootState) => state.events.recentEvents
  );

  /*  const gotoRecentEvent = (id: number | undefined) => {
    navigate(`events/${id}`);
  }; */

  return (
    <div
      className=" border-0 rounded-r-lg pt-8 fixed top-0 left-0 w-[20vw] h-full bg-emerald-900
     text-white flex flex-col items-start px-4 gap-4 z-50 text-2xl overflow-hidden font-light "
    >
      <div className="flex w-full justify-between items-center hover:bg-emerald-700 p-2 border-0 rounded-md">
        <p className="border-0 rounded-full">Logo</p>
        <button className="text-2xl" onClick={onClose}>
          <TfiClose />
        </button>
      </div>

      <NavLink
        to="/"
        className="flex items-center w-full hover:bg-emerald-700 p-2 border-0 rounded-md"
        onClick={onClose}
      >
        <MdHomeFilled className="inline-block" />
        Home
      </NavLink>
      <NavLink
        to="/events"
        className="flex items-center w-full hover:bg-emerald-700 p-2 border-0 rounded-md"
        onClick={onClose}
      >
        <MdEventAvailable className="inline-block" />
        Events
      </NavLink>
      <NavLink
        to="/about"
        className="flex items-center w-full hover:bg-emerald-700 p-2 border-0 rounded-md"
        onClick={onClose}
      >
        <FcAbout className="inline-block text-white" />
        About
      </NavLink>
      <NavLink
        to="/contact"
        className="flex items-center w-full hover:bg-emerald-700 p-2 border-0 rounded-md"
        onClick={onClose}
      >
        <MdOutlinePermContactCalendar className="inline-block" />
        Contact
      </NavLink>
      <hr className="border-t-2 w-full self-center text-white border-white my-4 mx-4" />
      <h2 className="font-semibold text-base">Recent Events</h2>
      {recentEvents &&
        recentEvents.map((event) => (
          <NavLink
            to={`/events/${event.id}`}
            onClick={onClose}
            className="font-thin text-base"
          >
            {event.title}
          </NavLink>
        ))}
    </div>
  );
};

export default Menu;

import { TfiClose } from "react-icons/tfi";
import { MdHomeFilled } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { MdOutlinePermContactCalendar } from "react-icons/md";
interface menuProps {
  isDrawerOpen?: boolean;
  onClose: () => void;
}

const Menu: React.FC<menuProps> = ({ onClose }) => {
  return (
    <div
      className=" border-0 rounded-r-lg pt-8 absolute top-0 left-0 w-[20vw] h-full bg-emerald-900
     text-white flex flex-col items-start px-4 gap-4 z-50 text-2xl overflow-hidden font-light"
    >
      <div className="flex w-full justify-between items-center">
        <p className="border-0 rounded-full">Logo</p>
        <button onClick={onClose} className="text-2xl">
          <TfiClose />
        </button>
      </div>

      <button className="flex items-center">
        <MdHomeFilled className="inline-block" />
        Home
      </button>
      <button className="flex items-center">
        <MdEventAvailable className="inline-block" />
        Events
      </button>
      <button className="flex items-center">
        <FcAbout className="inline-block" />
        About
      </button>
      <button className="flex items-center">
        <MdOutlinePermContactCalendar className="inline-block" />
        Contact
      </button>
      <hr className="border-t-2 w-full self-center text-white border-white my-4 mx-4" />
      <h2 className="font-thin text-base">Recent Events</h2>
    </div>
  );
};

export default Menu;

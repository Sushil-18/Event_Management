import { TfiClose } from "react-icons/tfi";
interface menuProps {
  isDrawerOpen?: boolean;
  onClose: () => void;
}

const Menu: React.FC<menuProps> = ({ onClose }) => {
  return (
    <div className=" border-0 rounded-r-lg p-8 absolute top-0 left-0 w-[20vw] h-full bg-emerald-900 text-white flex flex-col items-center gap-4 z-50 text-2xl overflow-visible">
      <button onClick={onClose} className="">
        <TfiClose />
      </button>
      <button>Home</button>
      <button>Events</button>
      <button>About</button>
      <button>Contact</button>
      <hr className="border-t-2 text-white border-white my-4" />
      <h2>Recents</h2>
    </div>
  );
};

export default Menu;

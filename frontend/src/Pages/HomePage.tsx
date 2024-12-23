import EventImg from "../assets/Event.webp";
import AboutUs from "./AboutUs";
import Contact from "./Contact";

const HomePage = () => {
  return (
    <div>
      <img className="relative" src={EventImg} alt="" />
      <div className="absolute bg-orange-200 font-semibold rounded-md p-4 text-center left-48  top-72 max-w-60">
        <h2 className="text-2xl text-orange-600">
          Your personal Event Planning specialist.
        </h2>
        <p className="font-light text-sm">
          Specializing in creating a unique experience tailored to your vision.
        </p>
      </div>
      <AboutUs />
      <Contact />
    </div>
  );
};

export default HomePage;

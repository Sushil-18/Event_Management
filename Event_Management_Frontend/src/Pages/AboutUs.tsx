import Event1img from "../assets/Event1.jpg";
import Event2img from "../assets/Event2.jpg";
import Event3img from "../assets/Event3.jpg";

const AboutUs = () => {
  return (
    <>
      <h2 className="text-center font-semibold text-2xl my-8">
        About SpotLight Event Management
      </h2>
      <div className="px-24 flex flex-col gap-8">
        <div className="flex justify-between items-center gap-20">
          <img
            className="min-w-[45%] max-w-[45%] h-80 object-cover border-0 shadow-lg rounded-lg"
            src={Event1img}
            alt="Image"
          />
          <div>
            <h3 className="text-center font-semibold text-xl">Our Passion</h3>
            <p>
              At SpotLight Event Management, we are passionate about creating
              events that are not only beautiful but also meaningful. From the
              smallest details to the big picture, we strive to make every event
              special and unique.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-20">
          <div>
            <h3 className="text-center font-semibold text-xl">
              Our Experience
            </h3>
            <p>
              With countless years of experience in the event planning industry,
              we have the knowledge and expertise to handle every aspect of your
              event. Specializing in entertainment & vendor coordination to
              timeline management, we are dedicated to making your event an
              unforgettable memory.
            </p>
          </div>
          <img
            className="min-w-[47%] max-w-[47%] h-80 object-cover border-0 shadow-lg rounded-lg"
            src={Event2img}
            alt="Image"
          />
        </div>
        <div className="flex justify-between items-center gap-20">
          <img
            className="min-w-[45%] max-w-[45%] h-80 object-cover border-0 shadow-lg rounded-lg"
            src={Event3img}
            alt="Image"
          />
          <div>
            <h3 className="text-center font-semibold text-xl">Our Services</h3>
            <p>
              We offer a variety of event planning services, including
              full-service planning, day-of coordination, and custom packages.
              Whether you need help with every detail or just need someone to
              manage the day-of, we have you covered.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

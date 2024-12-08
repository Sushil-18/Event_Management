const Footer = () => {
  return (
    <footer className="text-black text-center px-24 z-0">
      <div className="flex justify-between py-12">
        <div>
          <h2 className="font-semibold text-2xl">
            Simplifying Events, One Click at a Time.
          </h2>
          <h1 className="mt-10 text-3xl font-bold text-orange-400">
            {" "}
            SpotLight
          </h1>
        </div>
        <div>
          <h2 className="font-semibold text-2xl">
            Seamlessly manage every detail of your event, <br />
            From beginning to end!
          </h2>
          <div className="flex gap-8 justify-center mt-4">
            <button className="z-0 py-2 px-4 border-0 bg-orange-200 rounded-full transform transition-transform hover:bg-orange-300 hover:scale-110">
              Log In
            </button>
            <button className="py-2 px-4 border-0 bg-orange-200 rounded-full transform transition-transform hover:bg-orange-300 hover:scale-110">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <hr className="border-t-2 border-orange-200" />
      <p className="my-4">Made with 🖤 by Sushil@18</p>
    </footer>
  );
};

export default Footer;

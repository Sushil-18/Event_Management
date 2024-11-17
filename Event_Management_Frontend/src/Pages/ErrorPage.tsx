import { useNavigate } from "react-router";
import LostVechie from "../assets/Lost-in-space.jpg";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  function handleClick(): void {
    navigate("/");
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${LostVechie})` }}
    >
      <h1 className="text-5xl mt-48 font-bold text-shadow-md">
        Lost Your Way?
      </h1>
      <p className="text-gray-100 mt-8 text-2xl">
        Sorry, We can't find that page. You'll find lots to explore on the Home
        Page
      </p>
      <button
        onClick={handleClick}
        className="mt-8 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 mb-8"
      >
        HomePage
      </button>
      <p className="mt-4 text-2xl border-l-2 border-red-800 p-2">
        Error Code <span className="text-white">HTTP-404</span>
      </p>
    </div>
  );
};

export default ErrorPage;

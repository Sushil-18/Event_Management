import { SetStateAction, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { NavLink } from "react-router-dom";

const LogInPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function handleUsernameChange(e: {
    target: { value: SetStateAction<string> };
  }) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e: {
    target: { value: SetStateAction<string> };
  }) {
    setPassword(e.target.value);
  }
  return (
    <div className="flex-grow flex justify-center items-center my-32 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md min-h-full">
        <h2 className="text-2xl text-gray-700 font-semibold text-center">
          Log In
        </h2>
        <form action="">
          <div className="mb-6">
            <Input
              labelName="Username"
              inputType="text"
              onChange={handleUsernameChange}
              value={username}
              placeHolder="example@gmail.com"
              labelStyle="block text-sm font-medium text-gray-700"
              inputStyle="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            ></Input>
            <Input
              labelName="Password"
              inputType="password"
              onChange={handlePasswordChange}
              value={password}
              placeHolder="***********"
              labelStyle="block text-sm font-medium text-gray-700"
              inputStyle="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            ></Input>
          </div>
          <Button
            buttonName="Submit"
            styles={`w-full bg-blue-500 py-3 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          ></Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;

import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../store/authSlice";
import { useState } from "react";
import { showModal } from "../store/modalSlice";

// Define interface for form values
interface LoginFormValues {
  username: string;
  password: string;
}

// Validation schema
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const LoginPage: React.FC = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const loginData = {
        username: values.username,
        password: values.password,
      };

      console.log("Attempting login with:", loginData);

      const response = await axiosInstance.post("/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login response:", response);

      if (response.status === 200) {
        // Store token
        // localStorage.setItem("jwtToken", response.data.token);
        // Update authorization header for future requests
        // axiosInstance.defaults.headers.common[
        //  "Authorization"
        // ] = `Bearer ${response.data.token}`;
        dispatch(setAuthentication());
        navigate("/events");
      } else {
        console.error("No token in response:", response);
      }
    } catch (error: any) {
      dispatch(showModal(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center my-24">
      <div className="w-full max-w-md p-8 bg-orange-100 rounded-lg shadow-md min-h-full">
        <h2 className="text-2xl text-orange-700 font-semibold text-center">
          Log In
        </h2>
        <Formik<LoginFormValues>
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-orange-700"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="example@gmail.com"
                    className={`w-full mt-2 p-3 border bg-orange-50 outline-none ${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-orange-300"
                    } rounded-md focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.username && touched.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-orange-700"
                  >
                    Password
                  </label>
                  <Field
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="***********"
                    className={`w-full mt-2 p-3 border bg-orange-50 outline-none  ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-orange-300"
                    } rounded-md focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {showPass ? (
                    <svg
                      onClick={() => setShowPass(!showPass)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-eye-off text-orange-400 relative left-[21rem] bottom-[2.3rem]"
                    >
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                      <path d="m2 2 20 20" />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShowPass(!showPass)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-eye text-orange-400 relative left-[21rem] bottom-[2.3rem]"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-orange-500 py-3 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-orange-500 hover:text-orange-600"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

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
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      // Implement your login logic here
      console.log(values);
      // Example: await loginUser(values)
    } catch (error) {
      // Handle login error
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center my-24 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md min-h-full">
        <h2 className="text-2xl text-gray-700 font-semibold text-center">
          Log In
        </h2>
        <Formik<LoginFormValues>
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            values,
          }) => (
            <Form>
              <div className="mb-6">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="example@gmail.com"
                    className={`w-full mt-2 p-3 border bg-white outline-none ${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
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
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="***********"
                    className={`w-full mt-2 p-3 border bg-white outline-none ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  />
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
                className={`w-full bg-blue-500 py-3 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>

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

export default LoginPage;

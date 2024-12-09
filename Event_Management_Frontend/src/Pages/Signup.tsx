import { Field, Form, Formik, FormikHelpers } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

//validation schema
const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(10, "First name must not exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(10, "Last name must not exceed 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Signup: React.FC<{}> = () => {
  const handleSubmit = async (
    values: FormData,
    { setSubmitting }: FormikHelpers<FormData>
  ) => {
    try {
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center my-8">
      <div className="bg-white p-8 max-w-md w-full rounded-md shadow-md">
        <h2 className="text-2xl text-gray-700 font-semibold text-center">
          Sign Up
        </h2>
        <Formik<FormData>
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
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
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className={`w-full mt-2 p-3 border  bg-white outline-none ${
                      errors.firstName && touched.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className={`w-full mt-2 p-3 border  bg-white outline-none ${
                      errors.lastName && touched.lastName
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="test@test.com"
                    className={`w-full mt-2 p-3 border  bg-white outline-none ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                    placeholder="********"
                    className={`w-full mt-2 p-3 border bg-white outline-none ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.password && touched.password && (
                    <p
                      className="text-red-500
                   text-xs mt-1"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirm password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    className={`w-full mt-2 p-3 border bg-white outline-none ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-500 py-3 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;

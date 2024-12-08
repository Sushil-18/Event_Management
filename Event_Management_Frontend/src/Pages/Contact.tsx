import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  message: string;
}

const ContactSchema = Yup.object().shape({});
const Contact = () => {
  const maxLength = 120;
  const handleContactFormSubmit = () => {
    console.log("form submitted");
  };
  return (
    <div className="flex items-center justify-between px-24 py-8">
      <div className="max-w-[60%] flex flex-col gap-3">
        <h2 className="font-bold text-3xl ">Contact Us</h2>
        <p>
          Email, Call or complete the form to learn
          <br /> how SpotLight can manage your event at ease.
        </p>
        <p>info@spotlight.com</p>
        <p>333-222-111</p>
        <p className="font-bold underline">Customer Support</p>
        <div className="flex mt-12">
          <div>
            <h3 className="text-lg font-bold">Customer Support</h3>
            <p>
              Our support team is available around the clock to address any
              concern or queries you may have.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Feedback </h3>
            <p>
              Our support team is available around the clock to address any
              concern or queries you may have.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Media Queries</h3>
            <p>
              Our support team is available around the clock to address any
              concern or queries you may have.
            </p>
          </div>
        </div>
      </div>
      <div className="border-0 bg-white min-w-[35%] rounded-lg p-4 shadow-lg">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="mt-2">You can reach us anytime.</p>
        <Formik<ContactFormValues>
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            message: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={handleContactFormSubmit}
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
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex justify-between">
                  <Field
                    className="border-2 bg-white rounded-md p-2 outline-none"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                  />
                  <Field
                    className="border-2 bg-white rounded-md p-2 outline-none"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                  />
                </div>
                <Field
                  className="border-2 bg-white rounded-md p-2 outline-none"
                  type="email"
                  placeholder="Your Email"
                  name="email"
                />
                <Field
                  name="contactNumber"
                  className="border-2 bg-white rounded-md p-2 outline-none"
                  type="text"
                  placeholder="Phone Number"
                />
                <Field
                  name="message"
                  as="textarea"
                  className=" border-2 bg-white rounded-md p-2 outline-none min-h-36 max-h-36"
                  placeholder="How can we help?"
                  value={values.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    // Manually limit the character count to maxLength
                    if (e.target.value.length <= maxLength) {
                      handleChange(e); // Update Formik's state if within limit
                    }
                  }}
                  onBlur={handleBlur}
                />
                <div className="absolute bottom-60 right-32 text-xs text-gray-500">
                  {values.message.length}/{maxLength}
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
                <p className="text-center">
                  By contacting us, you agree to our{" "}
                  <span className="font-bold">Terms of service</span> and{" "}
                  <span className="font-bold">Privacy Policy</span>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;

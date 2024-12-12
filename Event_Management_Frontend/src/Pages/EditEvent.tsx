import { useNavigate, useParams } from "react-router-dom";
import EventDetails from "../Types/EventDetails";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditEvent = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const event: EventDetails = {
    id: 1,
    title: "Tech Conference 2024",
    description:
      "A gathering of the brightest minds in technology to discuss trends, challenges, and innovations.",
    imageURL: "https://via.placeholder.com/300x200.png?text=Tech+Conference",
    startTime: "2024-11-25T09:00:00",
    endTime: "2024-11-25T17:00:00",
  };

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, "Title cannot exceed 100 characters")
      .required("Title is required"),
    description: Yup.string()
      .max(500, "Description cannot exceed 500 characters")
      .required("Description is required"),
    imageURL: Yup.string()
      .url("Must be a valid URL")
      .required("Image URL is required"),
    startTime: Yup.date()
      .required("Start time is required")
      .min(new Date(), "Start time must be in the future"),
    endTime: Yup.date()
      .required("End time is required")
      .min(Yup.ref("startTime"), "End time must be after start time"),
  });

  const handleSubmit = () => {
    console.log("Form is submitted");
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="max-w-2xl mt-4 mx-auto p-4 bg-orange-100 shadow-lg rounded-lg">
        <h2 className="text-2xl text-orange-700 font-semibold text-center">
          Edit Event
        </h2>
        <Formik<EventDetails>
          initialValues={event}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              {/* Title Field */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block font-semibold text-orange-700"
                >
                  Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="w-full p-2 border border-orange-300 rounded bg-orange-50"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block font-semibold text-orange-700"
                >
                  Description
                </label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  className="w-full p-2 border border-orange-300 rounded bg-orange-50"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Image URL Field */}
              <div className="mb-4">
                <label
                  htmlFor="imageURL"
                  className="block font-semibold text-orange-700"
                >
                  Image URL
                </label>
                <Field
                  id="imageURL"
                  name="imageURL"
                  type="text"
                  className="w-full p-2 border border-orange-300 rounded bg-orange-50"
                />
                <ErrorMessage
                  name="imageURL"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Start Time Field */}
              <div className="mb-4">
                <label
                  htmlFor="startTime"
                  className="block font-semibold text-orange-700"
                >
                  Start Time
                </label>
                <Field
                  id="startTime"
                  name="startTime"
                  type="datetime-local"
                  className="w-full p-2 border border-orange-300 rounded bg-orange-50"
                />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* End Time Field */}
              <div className="mb-4">
                <label
                  htmlFor="endTime"
                  className="block font-semibold text-orange-700"
                >
                  End Time
                </label>
                <Field
                  id="endTime"
                  name="endTime"
                  type="datetime-local"
                  className="w-full p-2 border border-orange-300 rounded bg-orange-50"
                />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-8">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 min-w-20 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleCancle}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Cancle
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditEvent;

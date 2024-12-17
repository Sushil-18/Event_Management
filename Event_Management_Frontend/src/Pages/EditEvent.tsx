import { useNavigate, useParams } from "react-router-dom";
import EventDetails from "../Types/EventDetails";
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import axiosInstance from "../Utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { setEvents, updateEvent } from "../store/eventSlice"; // Redux slice action

const EditEvent = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const eventIdNum = Number(eventId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch event from the Redux store
  const event = useSelector((state: RootState) =>
    state.events.eventList.find((event) => event.id === eventIdNum)
  );

  // Handle missing event gracefully
  if (!event) {
    return (
      <div className="text-center text-red-500">
        Event not found or has been deleted.
      </div>
    );
  }

  // Validation schema using Yup
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
      .min(new Date(Date.now()), "Start time must be in the future"),
    endTime: Yup.date()
      .required("End time is required")
      .min(Yup.ref("startTime"), "End time must be after start time"),
  });

  // Mutation function to update the event
  const updateEventOnServer = async (
    values: EventDetails,
    { setSubmitting }: FormikHelpers<EventDetails>
  ) => {
    try {
      const response = await axiosInstance.put(`/events/${eventIdNum}`, values);
      return response.data;
    } catch (error) {
      console.error("Failed to update event", error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  // React-query mutation hook
  const { mutate, isError, error } = useMutation({
    updateEventOnServer,
    onSuccess: (data: EventDetails) => {
      // Dispatch action to update Redux store
      dispatch(
        setEvents((prevEvents) => {
          return prevEvents.map((event: EventDetails) =>
            event.id === data.id ? { ...prevEvents, ...data } : event
          );
        })
      );
      navigate(-1); // Navigate back to the events list
    },
  });

  // Form submission handler
  const handleSubmit = (
    values: EventDetails,
    formikHelpers: FormikHelpers<EventDetails>
  ) => {
    mutate(values, formikHelpers);
  };

  // Cancel button handler
  const handleCancel = () => {
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
          {({ isSubmitting }) => (
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

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-end gap-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 text-white px-4 min-w-20 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {isError && (
                <div className="text-red-500 mt-2">
                  {error instanceof Error ? error.message : "Failed to update"}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditEvent;

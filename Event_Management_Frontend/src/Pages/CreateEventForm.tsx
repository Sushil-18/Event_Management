import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Import } from "lucide-react";
import EventDetails from "../Types/EventDetails";
import axiosInstance from "../Utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/eventSlice";
import { useNavigate } from "react-router-dom";

const CreateEventForm: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // Initial form values
  const initialValues: EventDetails = {
    title: "",
    description: "",
    imageURL: "",
    startTime: "",
    endTime: "",
  };

  const createEventOnServer = async (values: EventDetails) => {
    try {
      const response = await axiosInstance.post("events/new", values);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: createEventOnServer,
    onSuccess: (data: EventDetails) => {
      dispatch(addEvent(data));
      navigate("/events");
    },
  });

  // Form submit handler
  const handleSubmit = (values: EventDetails) => {
    mutate(values);
  };

  if (error) {
    return <div>Error occured while creating event</div>;
  }

  return (
    <div className="max-w-2xl mt-4 mx-auto p-4 bg-orange-100 shadow-lg rounded-lg">
      <h1 className="text-2xl text-center font-bold mb-6 text-orange-700">
        Create a New Event
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                placeholder="Enter event title"
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
                placeholder="Enter event description"
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
                placeholder="Enter image URL"
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
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
              >
                Create Event
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEventForm;

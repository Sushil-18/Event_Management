import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventDetails from "../Types/EventDetails";
import axiosInstance from "../Utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/eventSlice";
import { useNavigate } from "react-router-dom";

// Custom styles for react-datepicker
const customStyles = `
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    width: 100%;
  }
`;

const CreateEventForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: createEventOnServer,
    onSuccess: (data: EventDetails) => {
      dispatch(addEvent(data));
      navigate("/events");
    },
  });

  const handleSubmit = (values: EventDetails) => {
    mutate(values);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (error) {
    return <div>Error occurred while creating event</div>;
  }

  const DateTimeField: React.FC<{
    name: string;
    label: string;
    minDate?: Date;
  }> = ({ name, label, minDate }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold text-orange-700">
        {label}
      </label>
      <div className="relative">
        <style>{customStyles}</style>
        <Field name={name}>
          {({ field, form: { setFieldValue } }) => (
            <DatePicker
              {...field}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => setFieldValue(name, date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 pl-10 border border-orange-300 rounded bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              minDate={minDate}
              placeholderText="Select date and time"
            />
          )}
        </Field>
        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );

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
        {({ values }) => (
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
                className="w-full p-2 border border-orange-300 rounded bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
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
                className="w-full p-2 border border-orange-300 rounded bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
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
                className="w-full p-2 border border-orange-300 rounded bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="Enter image URL"
              />
              <ErrorMessage
                name="imageURL"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Datetime Fields */}
            <DateTimeField
              name="startTime"
              label="Start Time"
              minDate={new Date()}
            />
            <DateTimeField
              name="endTime"
              label="End Time"
              minDate={
                values.startTime ? new Date(values.startTime) : new Date()
              }
            />

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end gap-8">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
              >
                Cancel
              </button>
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

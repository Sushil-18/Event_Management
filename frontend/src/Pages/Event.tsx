import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, Pencil, Trash2, ArrowLeft } from "lucide-react";
import EventDetails from "../Types/EventDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import axiosInstance from "../Utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { showModal } from "../store/modalSlice";

const Event: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eventId } = useParams<{ eventId: string }>();
  const eventIdNum = Number(eventId);

  const event: EventDetails = useSelector(
    (state: RootState) =>
      state.events.eventList.find(
        (event: EventDetails) => event.id === eventIdNum
      )!
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const deleteEventOnServer = async (eventId: number) => {
    try {
      const response = await axiosInstance.delete(
        `/events/${eventIdNum}`,
        eventId
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      dispatch(showModal(error));
    }
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: deleteEventOnServer,
    onSuccess: () => {
      navigate("/events");
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBackClick = () => navigate("/events");
  const handleEditEvent = () => navigate(`/events/${eventId}/edit`);

  const handleDeleteEvent = () => {
    mutate(event.id);
  };

  if (!event) {
    return <div>Event with {eventId} not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-4xl">
        {/* Event Image */}
        <div className="h-64 md:h-72 w-full overflow-hidden">
          <img
            src={event.imageURL}
            alt={event.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Centered Content Container */}
        <div className="p-6 md:p-8 flex flex-col items-center text-center">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>

          {/* Event Meta Information */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-500 w-5 h-5" />
              <span className="text-gray-600">
                {formatDate(event.startTime)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-green-500 w-5 h-5" />
              <span className="text-gray-600">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 max-w-xl">
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          {/* Action Buttons */}
          {isAuthenticated && (
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={handleEditEvent}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Pencil className="mr-2 w-5 h-5" /> Edit Event
              </button>
              <button
                onClick={handleDeleteEvent}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="mr-2 w-5 h-5" /> Delete Event
              </button>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-700 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;

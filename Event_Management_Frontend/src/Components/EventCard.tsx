import React from "react";
import EventDetails from "../Types/EventDetails";

const EventCard: React.FC<EventDetails> = ({
  id,
  imageURL,
  title,
  description,
  startTime,
  endTime,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 transform transition-all duration-300 hover:scale-105">
      {/* Image Section */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={imageURL}
          alt="Summer Tech Conference"
          className="w-full h-full object-cover"
        />
        {/* Event ID Overlay */}
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {id}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        {/* Date and Time */}
        <div className="flex items-center text-gray-700 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">
            {startTime} | {endTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

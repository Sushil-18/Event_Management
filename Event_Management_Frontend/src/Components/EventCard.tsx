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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-[400px] flex flex-col transform transition-all duration-300 hover:scale-105">
      {/* Image Section - Fixed Height */}
      <div className="min-h-48 max-h-48 w-full overflow-hidden relative">
        <img
          src={imageURL}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Event ID Overlay */}
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {id}
        </div>
      </div>

      {/* Content Section - Flex to maintain consistent layout */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title - Fixed height and line clamp */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 h-14 line-clamp-2 overflow-hidden">
          {title}
        </h2>

        {/* Description - Constrained height with scrolling */}
        <div className="max-h-16 overflow-y-auto mb-2 pr-1 custom-scrollbar">
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        {/* Date and Time - Consistent positioning at bottom */}
        <div className="flex items-center text-gray-700 mt-auto">
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

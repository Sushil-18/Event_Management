import React from "react";
import EventDetails from "../Types/EventDetails";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

const EventCard: React.FC<EventDetails> = ({
  id,
  imageURL,
  title,
  description,
  startTime,
  endTime,
}) => {
  const navigate = useNavigate();

  const handleClick = (eventId: number): void => {
    const url = `/events/${eventId}`;
    navigate(url);
  };
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
  return (
    <div
      onClick={() => handleClick(id)}
      className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-[400px] flex flex-col transform transition-all duration-300 hover:scale-105"
    >
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
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-500 w-5 h-5" />
              <span className="text-gray-600">{formatDate(startTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-green-500 w-5 h-5" />
              <span className="text-gray-600">
                {formatTime(startTime)} - {formatTime(endTime)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

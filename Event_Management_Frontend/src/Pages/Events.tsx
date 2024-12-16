import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../Components/EventCard";
import EventDetails from "../Types/EventDetails";
import { setEvents } from "../store/eventSlice"; // Adjust import path as needed
import axiosInstance from "../Utils/axiosInstance";

const Events = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch events function
  const fetchEvents = async (): Promise<EventDetails[]> => {
    const response = await axiosInstance.get("/events", {
      withCredentials: true,
    });
    //dispatch(setEvents(response.data));
    return response.data;
  };

  // Use Tanstack Query to fetch events
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery<EventDetails[], Error>({
    queryKey: ["events"], // Ensure correct key
    queryFn: fetchEvents, // Ensure correct fetch function
    //it is not working as of now, I will fix it tomorrow
    onSuccess: (data: EventDetails[]) => {
      // Dispatch events to Redux store
      dispatch(setEvents(data));
      console.log("events dispatched to redux store");
    },
  } as UseQueryOptions<EventDetails[], Error>);

  // Get events from Redux state
  const reduxEvents = useSelector((state: RootState) => state.events.events);

  const handleCreateEvent = () => {
    navigate("/events/create");
  };

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!events || events.length === 0) return <div>No events found</div>;

  // Split events into trending and other events
  const trendingEvents = events.slice(0, 4);
  const otherEvents = events.slice(4);

  return (
    <div className="mt-4 px-4 lg:px-24">
      {/* Create Event Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreateEvent}
          className="bg-orange-200 text-black px-4 py-2 rounded-lg shadow hover:bg-orange-300 transition-all"
        >
          + Create Event
        </button>
      </div>

      {/* Trending Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Trending Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              imageURL={event.imageURL}
              startTime={event.startTime}
              endTime={event.endTime}
            />
          ))}
        </div>
      </section>

      {/* All Events */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-center">All Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              imageURL={event.imageURL}
              startTime={event.startTime}
              endTime={event.endTime}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;

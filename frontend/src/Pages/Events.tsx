import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../Components/EventCard";
import EventDetails from "../Types/EventDetails";
import { setEvents } from "../store/eventSlice";
import axiosInstance from "../Utils/axiosInstance";
import { useEffect } from "react";
import { RootState } from "../store";
import ShimmerCard from "../Components/ShimmerCard";
import { serializeError } from "../Utils/SerializeError";
import { showModal } from "../store/modalSlice";
// Fetch events function
const fetchEvents = async (): Promise<EventDetails[]> => {
  const response = await axiosInstance.get("/events", {
    withCredentials: true,
  });
  return response.data;
};

const Events = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  //No need to get the state as we are directly fetching and showing the events.
  /*   // Get events from Redux state
  const reduxEvents = useSelector((state: RootState) => state.events.events); */

  // Use Tanstack Query to fetch events
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery<EventDetails[], Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  //Using effect to store the events data in redux store.
  useEffect(() => {
    if (events) {
      dispatch(setEvents(events));
    }
  }, [events, dispatch]);

  const handleCreateEvent = () => {
    navigate("/events/create");
  };

  if (isLoading) {
    return (
      <div className="mt-4 px-4 lg:px-24">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Trending Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <ShimmerCard key={index} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">All Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <ShimmerCard key={`all-${index}`} />
            ))}
          </div>
        </section>
      </div>
    );
  }
  if (isError) {
    const serializedError = serializeError(error);
    dispatch(showModal(serializedError));
    navigate("/");
  }
  if (!events || events.length === 0) return <div>No events found</div>;

  // Split events into trending and other events
  const trendingEvents = events.slice(0, 4);
  const otherEvents = events.slice(4);

  return (
    <div className="mt-4 px-4 lg:px-24">
      {/* Create Event Button */}
      {isAuthenticated && (
        <div className="flex justify-end mb-6">
          <button
            onClick={handleCreateEvent}
            className="bg-orange-200 text-black px-4 py-2 rounded-lg shadow hover:bg-orange-300 transition-all"
          >
            + Create Event
          </button>
        </div>
      )}

      {/* Trending Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Trending Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingEvents.map((event: EventDetails) => (
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
          {otherEvents.map((event: EventDetails) => (
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

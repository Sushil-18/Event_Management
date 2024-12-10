import { Outlet, useNavigate } from "react-router-dom";
import EventCard from "../Components/EventCard";
import EventDetails from "../Types/EventDetails";

const Events = () => {
  const navigate = useNavigate();

  const events: EventDetails[] = [
    {
      id: 1,
      title: "Tech Conference 2024",
      description:
        "A gathering of the brightest minds in technology to discuss trends, challenges, and innovations.",
      imageURL: "https://via.placeholder.com/300x200.png?text=Tech+Conference",
      startTime: "2024-11-25T09:00:00",
      endTime: "2024-11-25T17:00:00",
    },
    {
      id: 2,
      title: "Art Exhibition - Modern Marvels",
      description:
        "Showcasing contemporary art pieces by renowned and emerging artists worldwide.",
      imageURL: "https://via.placeholder.com/300x200.png?text=Art+Exhibition",
      startTime: "2024-12-01T10:00:00",
      endTime: "2024-12-01T20:00:00",
    },
    {
      id: 3,
      title: "Annual Sports Meet",
      description:
        "A thrilling sports event featuring track and field competitions, team games, and individual sports challenges.",
      imageURL: "https://via.placeholder.com/300x200.png?text=Sports+Meet",
      startTime: "2024-12-10T08:00:00",
      endTime: "2024-12-10T16:00:00",
    },
    {
      id: 4,
      title: "Music Fest 2024",
      description:
        "An electrifying event featuring live performances by top musicians across genres.",
      imageURL: "https://via.placeholder.com/300x200.png?text=Music+Fest",
      startTime: "2024-12-15T18:00:00",
      endTime: "2024-12-15T23:00:00",
    },
    {
      id: 5,
      title: "Culinary Carnival",
      description:
        "Explore cuisines from around the world with cooking workshops, tastings, and competitions.",
      imageURL:
        "https://via.placeholder.com/300x200.png?text=Culinary+Carnival",
      startTime: "2024-12-20T11:00:00",
      endTime: "2024-12-20T22:00:00",
    },
    {
      id: 6,
      title: "Startup Pitch Day",
      description:
        "Watch startups pitch their innovative ideas to investors and industry leaders.",
      imageURL: "https://via.placeholder.com/300x200.png?text=Pitch+Day",
      startTime: "2024-12-22T14:00:00",
      endTime: "2024-12-22T18:00:00",
    },
    {
      id: 7,
      title: "Health and Wellness Expo",
      description:
        "Learn about fitness, nutrition, and mental health at this informative event.",
      imageURL:
        "https://via.placeholder.com/300x200.png?text=Health+Wellness+Expo",
      startTime: "2024-12-25T10:00:00",
      endTime: "2024-12-25T17:00:00",
    },
    {
      id: 8,
      title: "Film Festival 2024",
      description:
        "Celebrate cinema with screenings of films from around the world.",
      imageURL: "https://via.placeholder.com/300x200.png?text=Film+Festival",
      startTime: "2024-12-30T12:00:00",
      endTime: "2024-12-30T22:00:00",
    },
  ];

  // Split events into trending and other events
  const trendingEvents = events.slice(0, 4);
  const otherEvents = events.slice(4);

  const handleCreateEvent = () => {
    navigate("/events/create");
  };

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
      <Outlet />
    </div>
  );
};

export default Events;

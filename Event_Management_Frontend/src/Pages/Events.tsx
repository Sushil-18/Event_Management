import { Outlet } from "react-router-dom";
import EventCard from "../Components/EventCard";
import EventDetails from "../Types/EventDetails";
const Events = () => {
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
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 px-24 z-10">
      {events.map((event) => (
        <div className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full relative z-0">
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            imageURL={event.imageURL}
            startTime={event.startTime}
            endTime={event.endTime}
          />
        </div>
      ))}
      <Outlet />
    </div>
  );
};

export default Events;

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import EventCard from "../../Components/EventCard";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("EventCard", () => {
  const mockEvent = {
    id: 1,
    imageURL: "test-image.jpg",
    title: "Test Event",
    description: "Test Description",
    startTime: "2024-03-20T10:00:00",
    endTime: "2024-03-20T12:00:00",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders event details correctly", () => {
    render(
      <BrowserRouter>
        <EventCard {...mockEvent} />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("March 20, 2024")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  test("navigates to event details page on click", () => {
    render(
      <BrowserRouter>
        <EventCard {...mockEvent} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("img"));
    expect(mockNavigate).toHaveBeenCalledWith("/events/1");
  });

  test("formats date correctly", () => {
    render(
      <BrowserRouter>
        <EventCard {...mockEvent} />
      </BrowserRouter>
    );

    expect(screen.getByText("March 20, 2024")).toBeInTheDocument();
  });

  test("formats time correctly", () => {
    render(
      <BrowserRouter>
        <EventCard {...mockEvent} />
      </BrowserRouter>
    );

    expect(screen.getByText(/10:00 AM/)).toBeInTheDocument();
    expect(screen.getByText(/12:00 PM/)).toBeInTheDocument();
  });

  test("handles missing image URL", () => {
    const eventWithoutImage = { ...mockEvent, imageURL: "" };
    render(
      <BrowserRouter>
        <EventCard {...eventWithoutImage} />
      </BrowserRouter>
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", "");
  });
});

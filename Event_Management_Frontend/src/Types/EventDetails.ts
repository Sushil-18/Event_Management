export default interface EventDetails {
  id: number; // Unique identifier for the event
  title: string; // Title of the event
  description: string; // Description of the event
  imageURL: string; // URL to the event's image
  startTime: string; // ISO format start time (e.g., "2024-11-25T09:00:00")
  endTime: string; // ISO format end time (e.g., "2024-11-25T17:00:00")
}

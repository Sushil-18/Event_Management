import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import EventDetails from "../Types/EventDetails";

// Initial state type
interface EventState {
  events: EventDetails[];
  selectedEvent: EventDetails | null;
}

// Initial state
const initialState: EventState = {
  events: [],
  selectedEvent: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Set all events
    setEvents: (state, action: PayloadAction<EventDetails[]>) => {
      state.events = action.payload;
    },

    // Select a specific event
    selectEvent: (state, action: PayloadAction<EventDetails>) => {
      state.selectedEvent = action.payload;
    },

    // Clear selected event
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },

    // Add a new event
    addEvent: (state, action: PayloadAction<EventDetails>) => {
      state.events.push(action.payload);
    },

    // Remove an event
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
});

export const {
  setEvents,
  selectEvent,
  clearSelectedEvent,
  addEvent,
  removeEvent,
} = eventSlice.actions;

export default eventSlice.reducer;

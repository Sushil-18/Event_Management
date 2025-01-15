import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import EventDetails from "../Types/EventDetails";
interface EventState {
  eventList: EventDetails[];
  recentEvents: EventDetails[];
}
// Initial state
const initialState: EventState = {
  eventList: [],
  recentEvents: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Set all events
    setEvents: (state, action: PayloadAction<EventDetails[]>) => {
      state.eventList = action.payload;
    },
    updateEvents: (state, action: PayloadAction<EventDetails>) => {
      state.eventList = state.eventList.map((event: EventDetails) =>
        event.id == action.payload.id
          ? { ...state.eventList, ...action.payload }
          : event
      );
    },
    addEvent: (state, action: PayloadAction<EventDetails>) => {
      state.eventList.push(action.payload);
    },
    AddtoRecent: (state, action: PayloadAction<EventDetails>) => {
      if (!action.payload || !action.payload.id) return;
      const exists = state.recentEvents.some(
        (event) => event.id === action.payload.id
      );
      if (!exists) {
        state.recentEvents.unshift(action.payload);
        if (state.recentEvents.length > 5) {
          state.recentEvents.pop();
        }
      }
    },
  },
});

export const { setEvents, updateEvents, addEvent, AddtoRecent } =
  eventSlice.actions;

export default eventSlice.reducer;

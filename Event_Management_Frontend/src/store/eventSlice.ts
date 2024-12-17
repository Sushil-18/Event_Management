import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import EventDetails from "../Types/EventDetails";
interface EventState {
  eventList: EventDetails[];
}
// Initial state
const initialState: EventState = {
  eventList: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Set all events
    setEvents: (state, action: PayloadAction<EventDetails[]>) => {
      state.eventList = action.payload;
    },
  },
});

export const { setEvents } = eventSlice.actions;

export default eventSlice.reducer;

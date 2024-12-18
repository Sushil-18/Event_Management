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
      console.log("Events updated");
      state.eventList = action.payload;
    },
    updateEvents: (state, action: PayloadAction<EventDetails>) => {
      state.eventList = state.eventList.map((event: EventDetails) =>
        event.id == action.payload.id
          ? { ...state.eventList, ...action.payload }
          : event
      );
    },
  },
});

export const { setEvents, updateEvents } = eventSlice.actions;

export default eventSlice.reducer;

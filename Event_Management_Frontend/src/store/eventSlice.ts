import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the interface for your event details
interface EventDetails {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  startTime: string;
  endTime: string;
}

// Initial state type
interface EventState {
  events: EventDetails[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching events
/* export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get("/api/events");
  return response.data;
}); */

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Minimal or no manual reducers needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch events";
      });
  },
});

export default eventSlice.reducer;

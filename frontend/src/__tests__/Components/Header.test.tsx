import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Header from "../../Components/Header";
import authReducer from "../../store/authSlice";
import axiosInstance from "../../Utils/axiosInstance";

// Mock axios
jest.mock("../../Utils/axiosInstance");

// Mock store setup
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: false,
        ...initialState,
      },
    },
  });
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders header with logo", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
  });

  test("shows login when not authenticated", () => {
    const store = createMockStore({ isAuthenticated: false });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Log In")).toBeInTheDocument();
    //expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("shows logout when authenticated", () => {
    const store = createMockStore({ isAuthenticated: true });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  test("handles logout successfully", async () => {
    const store = createMockStore({ isAuthenticated: true });
    (axiosInstance.post as jest.Mock).mockResolvedValueOnce({ status: 200 });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const logoutButton = screen.getByText("Log Out");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith("/auth/logout");
      expect(store.getState().auth.isAuthenticated).toBe(false);
    });
  });

  /*   test("toggles drawer on hamburger menu click", async () => {
    const store = createMockStore();
    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const menuButton = screen.getByTestId("menu-button");

    // Initial state check
    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();

    // Click to open
    await act(async () => {
      fireEvent.click(menuButton);
    });

    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();

    // Click to close
    await act(async () => {
      fireEvent.click(menuButton);
    });

    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  }); */
});

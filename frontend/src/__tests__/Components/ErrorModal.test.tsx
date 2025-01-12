import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import ErrorModal from "../../Components/ErrorModal";
import modalReducer from "../../store/modalSlice";

describe("ErrorModal", () => {
  const createMockStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        modal: modalReducer,
      },
      preloadedState: {
        modal: {
          isOpen: false,
          error: null,
          ...initialState,
        },
      },
    });
  };

  test("should not render when isOpen is false", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ErrorModal />
      </Provider>
    );

    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });

  test("should render when isOpen is true", () => {
    const store = createMockStore({
      isOpen: true,
      error: { message: "Test error message" },
    });

    render(
      <Provider store={store}>
        <ErrorModal />
      </Provider>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  test("should dispatch hideModal when clicking outside modal", () => {
    const store = createMockStore({
      isOpen: true,
      error: { message: "Test error message" },
    });

    render(
      <Provider store={store}>
        <ErrorModal />
      </Provider>
    );

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);

    const state = store.getState();
    expect(state.modal.isOpen).toBe(false);
  });

  test("should not close when clicking inside modal", () => {
    const store = createMockStore({
      isOpen: true,
      error: { message: "Test error message" },
    });

    render(
      <Provider store={store}>
        <ErrorModal />
      </Provider>
    );

    const modalContent = screen.getByTestId("modal-content");
    fireEvent.click(modalContent);

    const state = store.getState();
    expect(state.modal.isOpen).toBe(true);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Footer from "../../Components/Footer";

// Mock window.scrollTo
global.scrollTo = jest.fn();

describe("Footer Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders footer component", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("contains copyright text", () => {
    expect(screen.getByText(/Made with 🖤 by Sushil@18/)).toBeInTheDocument();
  });

  test("calls scrollToTop when clicking login link", () => {
    const loginLink = screen.getByText("Log In");
    fireEvent.click(loginLink);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("calls scrollToTop when clicking signup link", () => {
    const signupLink = screen.getByText("Sign Up");
    fireEvent.click(signupLink);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("contains correct navigation link hrefs", () => {
    expect(screen.getByText("Log In")).toHaveAttribute("href", "/login");
    expect(screen.getByText("Sign Up")).toHaveAttribute("href", "/signup");
  });
});

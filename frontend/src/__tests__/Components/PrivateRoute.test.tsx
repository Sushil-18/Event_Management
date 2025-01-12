import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../../Components/PrivateRoute";

// Mock components for testing
const MockOutlet = () => <div>Protected Content</div>;
const LoginPage = () => <div>Login Page</div>;
const CustomLogin = () => <div>Custom Login Page</div>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <MockOutlet />,
}));

describe("PrivateRoute", () => {
  const renderWithRouter = (component: React.ReactNode, initialRoute = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route element={component}>
            <Route path="/" element={<MockOutlet />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/custom-login" element={<CustomLogin />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders outlet when user is authenticated", () => {
    const { getByText } = renderWithRouter(
      <PrivateRoute isAuthenticated={true} />
    );
    expect(getByText("Protected Content")).toBeInTheDocument();
  });

  test("redirects to login when user is not authenticated", () => {
    const { getByText } = renderWithRouter(
      <PrivateRoute isAuthenticated={false} />
    );
    expect(getByText("Login Page")).toBeInTheDocument();
  });

  test("redirects to custom path when provided", () => {
    const { getByText } = renderWithRouter(
      <PrivateRoute isAuthenticated={false} redirectPath="/custom-login" />
    );
    expect(getByText("Custom Login Page")).toBeInTheDocument();
  });
});

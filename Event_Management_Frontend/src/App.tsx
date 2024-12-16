import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LogInPage from "./Pages/LogInPage";
import ErrorPage from "./Pages/ErrorPage";
import Signup from "./Pages/Signup";
import Layout from "./Pages/Layout";
import Events from "./Pages/Events";
import Event from "./Pages/Event";
import Contact from "./Pages/Contact";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import CreateEventForm from "./Pages/CreateEventForm";
import EditEvent from "./Pages/EditEvent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LogInPage />,
        },

        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "events",
          element: <Events />,
        },
        {
          path: "events/create",
          element: <CreateEventForm />,
        },
        {
          path: "events/:eventId",
          element: <Event />,
        },
        {
          path: "events/:eventId/edit",
          element: <EditEvent />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "about",
          element: <AboutUs />,
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

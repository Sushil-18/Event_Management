import { RouteObject } from "react-router-dom";
import LogInPage from "../Pages/LogInPage";
import Signup from "../Pages/Signup";
import Layout from "../Pages/Layout";
import Events from "../Pages/Events";
import Event from "../Pages/Event";
import Contact from "../Pages/Contact";
import HomePage from "../Pages/HomePage";
import AboutUs from "../Pages/AboutUs";
import CreateEventForm from "../Pages/CreateEventForm";
import EditEvent from "../Pages/EditEvent";
import ErrorPage from "../Pages/ErrorPage";
import PrivateRoute from "../Components/PrivateRoute";

// Define our routes type
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
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
        element: <PrivateRoute isAuthenticated={false} />,
        children: [
          {
            path: "events/create",
            element: <CreateEventForm />,
          },
          {
            path: "events/:eventId/edit",
            element: <EditEvent />,
          },
        ],
      },
      {
        path: "events/:eventId",
        element: <Event />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;

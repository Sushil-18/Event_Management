import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LogInPage from "./Pages/LogInPage";
import ErrorPage from "./Pages/ErrorPage";
import Signup from "./Pages/Signup";
import Layout from "./Pages/Layout";
import Events from "./Pages/Events";
import Event from "./Pages/Event";
import Contact from "./Pages/Contact";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Events />,
          children: [
            {
              path: ":eventId",
              element: <Event />,
            },
          ],
        },
        {
          path: "auth",
          children: [
            {
              path: "login",
              element: <LogInPage />,
            },
            {
              path: "signup",
              element: <Signup />,
            },
            {
              path: "contact",
              element: <Contact />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

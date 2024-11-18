import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LogInPage from "./Pages/LogInPage";
import ErrorPage from "./Pages/ErrorPage";
import Signup from "./Pages/Signup";
import Layout from "./Pages/Layout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
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

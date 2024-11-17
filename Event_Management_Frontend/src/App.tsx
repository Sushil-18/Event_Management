import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LogInPage from "./Pages/LogInPage";
import ErrorPage from "./Pages/ErrorPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogInPage />,
      errorElement: <ErrorPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

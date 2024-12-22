import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import routes from "./Utils/router";
import "./App.css";
import React from "react";

function App() {
  const queryClient = new QueryClient();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Create router with authentication state
  const processedRoutes: RouteObject[] = routes.map((route) => {
    if (route.children) {
      return {
        ...route,
        children: route.children.map((child) => {
          if (
            child.element &&
            React.isValidElement(child.element) &&
            "props" in child.element &&
            "isAuthenticated" in child.element.props
          ) {
            return {
              ...child,
              element: React.cloneElement(child.element, { isAuthenticated }),
            };
          }
          return child;
        }),
      };
    }
    return route;
  });

  const router = createBrowserRouter(processedRoutes);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

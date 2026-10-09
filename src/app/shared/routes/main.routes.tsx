import { createBrowserRouter, Navigate } from "react-router";

import UserLayout from "../../user-layout/UserLayout";
import { userRoutes } from "../../pages/user/user.routes";

import Login from "../../pages/auth/Login";

import GuestRoute from "./guest-routes/Guest.routes";
import ProtectedRoute from "./protected-routes/Protected.routes";

const mainRoutes = createBrowserRouter([
  // Root
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        Component: UserLayout,
        children: userRoutes,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/page-not-found" replace />,
  },
]);

export { mainRoutes };
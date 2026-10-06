import { createBrowserRouter, Navigate } from "react-router";
import UserLayout from "../../user-layout/UserLayout";
import { userRoutes } from "../../pages/user/user.routes";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/",
    Component: UserLayout,
    children: userRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/page-not-found" replace />,
  },
]);

export { mainRoutes };
import type { RouteObject } from "react-router";
import Dashboard from "./Dashboard";
import Home from "./Home";
import ProtectedRoute from "../../shared/routes/protected-routes/Protected.routes";


const userRoutes: RouteObject[] = [
  {
  element: <ProtectedRoute />,
  children: [
    {
      path: "home",
      Component: Home,
    },
    {
      path: "dashboard",
      Component: Dashboard,
    },
    {
      path: "about",
      Component: Dashboard,
    }
  ],
  }    
];
export { userRoutes };
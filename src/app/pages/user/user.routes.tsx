import type { RouteObject } from "react-router";
import Dashboard from "./Dashboard";
import Home from "./Home";


const userRoutes: RouteObject[] = [
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
];
export { userRoutes };
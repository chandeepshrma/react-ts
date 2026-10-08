import { Navigate, Outlet } from "react-router";

import { createElement } from "react";

import { useAppSelector } from "../../store/hooks";

function ProtectedRoute() {
  const {
    isAuthenticated,
    isInitialized,
  } = useAppSelector((state) => state.auth);

  // Wait until auth restoration/check is complete
  if (!isInitialized) {
    return createElement("div", null, "Checking authentication...");
  }

  // Auth check completed and user is not authenticated
  if (!isAuthenticated) {
    return createElement(Navigate, {
      to: "/login",
      replace: true,
    });
  }

  // Authenticated → stay on the current route
  return createElement(Outlet);
}

export default ProtectedRoute;
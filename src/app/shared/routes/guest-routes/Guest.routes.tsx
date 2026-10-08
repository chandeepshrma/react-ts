import {
  Navigate,
  Outlet,
} from "react-router";
import { createElement } from "react";

import {
  useAppSelector,
} from "../../store/hooks";

function GuestRoute() {
  const {
    isAuthenticated,
    isInitialized,
  } = useAppSelector(
    (state) => state.auth
  );

  if (!isInitialized) {
    return (
      <div>
        Checking authentication...
      </div>
    );
  }

  if (isAuthenticated) {
    return createElement(Navigate, {
      to: "/home",
      replace: false,
    });
  }

  return createElement(Outlet);
}

export default GuestRoute;
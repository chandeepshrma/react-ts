import { Provider } from "./components/ui/provider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { mainRoutes } from "./app/shared/routes/main.routes.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={mainRoutes} />
    </Provider>
  </StrictMode>
);


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";

import { Provider as ChakraProvider } from "./components/ui/provider";
import { mainRoutes } from "./app/shared/routes/main.routes";
import store  from "./app/shared/store/store";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider>
        <RouterProvider router={mainRoutes} />
      </ChakraProvider>
    </ReduxProvider>
  </StrictMode>
);
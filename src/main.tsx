import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ColorModeProvider } from "./components/ui/color-mode";
import { mainRoutes } from "./app/shared/routes/main.routes";
import store from "./app/shared/store/store";

import "./index.css";
import AuthInitializer from "./app/core/auth/AuthInitializer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider>
          <AuthInitializer />
            <RouterProvider router={mainRoutes} />
        </ColorModeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  </StrictMode>,
);

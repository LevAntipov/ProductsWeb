import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/router.tsx";
import "./normalize.css";
import { Provider } from "react-redux";
import { AppInitializer } from "app/providers/AppInitializer.tsx";
import { store } from "app/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppInitializer>
      <RouterProvider router={router} />
    </AppInitializer>
  </Provider>,
);

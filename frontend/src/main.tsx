import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Provider } from "@components/ui";
import { SessionProvider } from "@shared/context/auth";
import { usersApi } from "@services/axiosInstance";
import { APIProvider } from "@vis.gl/react-google-maps";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <BrowserRouter>
      <SessionProvider usersApi={usersApi}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <App />
        </APIProvider>
      </SessionProvider>
    </BrowserRouter>
  </Provider>,
);

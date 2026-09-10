import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "@components/ui";
import AuthProvider from "@providers/Auth";
import { APIProvider } from "@vis.gl/react-google-maps";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <BrowserRouter>
      <AuthProvider>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <App />
        </APIProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>,
);

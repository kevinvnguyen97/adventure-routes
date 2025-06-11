import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "@components/ui";
import AuthProvider from "@providers/Auth";
import { LoadScript } from "@react-google-maps/api";
import { googleLibraries } from "@constants/google.ts";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <AuthProvider>
      <BrowserRouter>
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={googleLibraries}
          loadingElement={<div>Loading...</div>}
        >
          <App />
        </LoadScript>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

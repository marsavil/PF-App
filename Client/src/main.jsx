import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = document.getElementById("root");
createRoot(root).render(
  <Auth0Provider
    domain="dev-d5cqzux6yz50ivq4.us.auth0.com"
    clientId="XWrkbcjcOmbCjPDNuZKiqfBhS1sRu5Um"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);


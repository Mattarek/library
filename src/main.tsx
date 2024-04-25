import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./appPaths";
import "./index.css";
import {
  AuthProvider,
  TAuthConfig,
  TRefreshTokenExpiredEvent,
} from "react-oauth2-code-pkce";

const authConfig: TAuthConfig = {
  clientId: "api-platform-pwa",
  authorizationEndpoint:
    "https://demo.api-platform.com/oidc/realms/demo/protocol/openid-connect/auth",
  tokenEndpoint:
    "https://demo.api-platform.com/oidc/realms/demo/protocol/openid-connect/token",
  redirectUri: window.location.origin,
  scope: "openid",
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) =>
    window.confirm(
      "Session expired. Refresh page to continue using the site?"
    ) && event.login(),
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider authConfig={authConfig}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

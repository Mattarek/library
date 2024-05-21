import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./appPaths";
import {
  AuthProvider,
  TAuthConfig,
  TRefreshTokenExpiredEvent,
} from "react-oauth2-code-pkce";
import { theme } from "./theme/theme";
import {ThemeProvider as MuiThemeProvider} from "@mui/material"
import { ThemeProvider } from "styled-components";

const authConfig: TAuthConfig = {
  clientId: "api-platform-pwa",
  authorizationEndpoint:
    "https://demo.api-platform.com/oidc/realms/demo/protocol/openid-connect/auth",
  tokenEndpoint:
    "https://demo.api-platform.com/oidc/realms/demo/protocol/openid-connect/token",
  redirectUri: window.location.origin,
  scope: "openid",
  autoLogin: true,
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) =>
    window.confirm(
      "Session expired. Refresh page to continue using the site?"
    ) && event.login(),
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AuthProvider authConfig={authConfig}>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>
);

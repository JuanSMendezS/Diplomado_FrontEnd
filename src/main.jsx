import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </NextUIProvider>
  </React.StrictMode>
);

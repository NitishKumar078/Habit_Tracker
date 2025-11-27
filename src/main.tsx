import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { HabitProvider } from "./context/HabitContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <React.StrictMode>
    <HabitProvider>
      <App />
    </HabitProvider>
  </React.StrictMode>
);

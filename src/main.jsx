import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { HabitProvider } from "./context/HabitContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HabitProvider>
      <App />
    </HabitProvider>
  </React.StrictMode>
);

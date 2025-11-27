import { createContext } from "react";

// single source of truth for the context object — keep it separate from components
export const HabitContext = createContext(null);

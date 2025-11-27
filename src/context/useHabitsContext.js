import { useContext } from "react";
import { HabitContext } from "./HabitContextCommon";

export function useHabitsContext() {
  const ctx = useContext(HabitContext);
  if (!ctx)
    throw new Error("useHabitsContext must be used inside HabitProvider");
  return ctx;
}

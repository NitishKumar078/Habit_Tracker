import { useContext } from "react";
import { HabitContext, HabitContextType } from "./HabitContextCommon";

export function useHabitsContext(): HabitContextType {
  const ctx = useContext(HabitContext);
  if (!ctx)
    throw new Error("useHabitsContext must be used inside HabitProvider");
  return ctx;
}

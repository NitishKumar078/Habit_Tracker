import { useState } from "react";
import { useHabitsContext } from "../context/useHabitsContext";
import { HabitContextType } from "../context/HabitContextCommon";

interface UseHabitsReturn extends HabitContextType {
  selected: string | null;
  setSelected: (id: string | null) => void;
}

export function useHabits(): UseHabitsReturn {
  const context = useHabitsContext();
  const [selected, setSelected] = useState<string | null>(null);
  return {
    ...context,
    selected,
    setSelected,
  };
}

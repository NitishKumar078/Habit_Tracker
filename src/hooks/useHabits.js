import { useState } from "react";
import { useHabitsContext } from "../context/useHabitsContext";

export function useHabits() {
  const {
    habits,
    addHabit,
    editHabit,
    deleteHabit,
    toggleCompletion,
    getCompletionsForDate,
    isCompleted,
    getBestStreak,
  } = useHabitsContext();
  const [selected, setSelected] = useState(null);
  return {
    habits,
    addHabit,
    editHabit,
    deleteHabit,
    toggleCompletion,
    getCompletionsForDate,
    isCompleted,
    getBestStreak,
    selected,
    setSelected,
  };
}

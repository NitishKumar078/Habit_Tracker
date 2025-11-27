import React, { useState, useEffect } from "react";
import { HabitContext, Habit, HabitContextType } from "./HabitContextCommon";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

interface HabitProviderProps {
  children: React.ReactNode;
}

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const loaded = JSON.parse(localStorage.getItem("habits") || "[]");
      return loaded.map((h: any) => ({ ...h, history: h.history || {} }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = ({ name, color, icon, startDate }: { name: string; color: string; icon?: string; startDate?: string }): Habit => {
    const h: Habit = {
      id: uuid(),
      name,
      color,
      icon: icon || undefined,
      startDate: startDate || new Date().toISOString().slice(0, 10),
      history: {},
    };
    setHabits((prev) => [h, ...prev]);
    return h;
  };

  const editHabit = (id: string, patch: Partial<Habit>): void =>
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...patch } : h))
    );

  const deleteHabit = (id: string): void => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // completion utilities
  const getCompletionsForDate = (date: string): string[] =>
    habits.filter((h) => h.history[date]).map((h) => h.id);

  const isCompleted = (habitId: string, date: string): boolean => {
    const habit = habits.find((h) => h.id === habitId);
    return habit ? !!habit.history[date] : false;
  };

  const getBestStreak = (habitId: string): number => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return 0;

    const completedDates = Object.keys(habit.history)
      .filter((date) => habit.history[date])
      .sort();

    if (completedDates.length === 0) return 0;

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < completedDates.length; i++) {
      const prevDate = dayjs(completedDates[i - 1]);
      const currDate = dayjs(completedDates[i]);

      if (currDate.diff(prevDate, "day") === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  };

  const toggleCompletion = (habitId: string, date: string): void => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? { ...h, history: { ...h.history, [date]: !h.history[date] } }
          : h
      )
    );
  };

  const value: HabitContextType = {
    habits,
    addHabit,
    editHabit,
    deleteHabit,
    getCompletionsForDate,
    toggleCompletion,
    isCompleted,
    getBestStreak,
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}

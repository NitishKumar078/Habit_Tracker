import { createContext } from "react";

export interface Habit {
  id: string;
  name: string;
  color: string;
  icon?: string;
  category: string;
  startDate: string;
  history: Record<string, boolean>;
}

export interface HabitContextType {
  habits: Habit[];
  addHabit: (data: {
    name: string;
    color: string;
    icon?: string;
    category: string;
    startDate?: string;
  }) => Habit;
  editHabit: (id: string, patch: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  getCompletionsForDate: (date: string) => string[];
  toggleCompletion: (habitId: string, date: string) => void;
  isCompleted: (habitId: string, date: string) => boolean;
  getBestStreak: (habitId: string) => number;
}

// single source of truth for the context object — keep it separate from components
export const HabitContext = createContext<HabitContextType | null>(null);

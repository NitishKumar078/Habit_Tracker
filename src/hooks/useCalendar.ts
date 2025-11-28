import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { Habit } from "@/context/HabitContextCommon";

interface CalendarDay {
  date: number;
  fullDate: string;
  isCurrentMonth: boolean;
  habits: { id: string; color: string }[];
}

interface UseCalendarReturn {
  days: CalendarDay[];
  currentMonth: string;
  goNext: () => void;
  goPrev: () => void;
  setCurrent: (date: dayjs.Dayjs) => void;
}

export default function useCalendar({
  habits = [],
}: { habits?: Habit[] } = {}): UseCalendarReturn {
  const [current, setCurrent] = useState(dayjs());

  const startOfMonth = current.startOf("month");
  const startOfGrid = startOfMonth.startOf("week");

  const days = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => {
      const d = startOfGrid.add(i, "day");
      const dateStr = d.format("YYYY-MM-DD");
      return {
        date: d.date(),
        fullDate: dateStr,
        isCurrentMonth: d.month() === current.month(),
        habits: habits
          .filter((h) => h.history[dateStr])
          .map((h) => ({ id: h.id, color: h.color })),
      };
    });
  }, [current, startOfGrid, habits]);

  return {
    days,
    currentMonth: current.format("MMMM YYYY"),
    goNext: () => setCurrent((prev) => prev.add(1, "month")),
    goPrev: () => setCurrent((prev) => prev.subtract(1, "month")),
    setCurrent,
  };
}

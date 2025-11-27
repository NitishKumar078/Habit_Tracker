import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

export default function CalendarDay({ day, onClick }) {
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef(day.habits.length);
  const isToday = day.fullDate === dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    if (isToday && day.habits.length > prevCount.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 350);
      return () => clearTimeout(t);
    }
    prevCount.current = day.habits.length;
  }, [day.habits.length, isToday]);
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-start p-4 rounded-xl hover:bg-gray-200 transition cursor-pointer min-h-15 max-h-20 ${
        day.isCurrentMonth ? "opacity-100 bg-gray-100" : "opacity-50"
      } ${isToday ? "border-2 border-blue-500" : ""} ${
        pulse ? "animate-pulse" : ""
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">{day.date}</span>
      </div>

      <div className="flex gap-1 mt-2 flex-wrap">
        <AnimatePresence>
          {day.habits &&
            day.habits.map((h) => (
              <motion.span
                key={h.id}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: h.color }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

import React from "react";
import CalendarDay from "./CalendarDay";

export default function CalendarGrid({ days, onDayClick }) {
  return (
    <>
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-400 uppercase mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <CalendarDay
            key={day.fullDate}
            day={day}
            onClick={() => onDayClick(day.fullDate)}
          />
        ))}
      </div>
    </>
  );
}

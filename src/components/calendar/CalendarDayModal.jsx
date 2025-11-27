import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import { useHabits } from "../../hooks/useHabits";
// import { b, body } from "framer-motion/client";

export default function CalendarDayModal({ date, onClose, habits }) {
  const { toggleCompletion, isCompleted } = useHabits();
  const [error, setError] = useState("");
  const body = useRef(null);

  const handleToggle = (habitId) => {
    const habit = habits.find((h) => h.id === habitId);
    const today = dayjs().format("YYYY-MM-DD");
    // scrolling back to future dates or before habit start date

    if (date > today) {
      setError("Cannot edit future dates");
      console.log(body);
      body.current.scrollTo(0, 0, { behavior: "smooth" });
      return;
    }
    if (date < habit.startDate) {
      console.log(body);
      setError("Cannot edit before habit start date");
      body.current.scrollTo(0, 0);
      return;
    }

    setError("");
    toggleCompletion(habitId, date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl max-h-[85vh] rounded-2xl shadow-2xl bg-white animate-scale-in overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Habits for {date}</h2>
        </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4" ref={body}>
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {habits.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ background: h.color }}
                />
                <div className="text-sm font-medium">{h.name}</div>
              </div>

              <button
                onClick={() => handleToggle(h.id)}
                className={`px-3 py-1 rounded-md ${
                  isCompleted(h.id, date)
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {isCompleted(h.id, date) ? "Done" : "Mark"}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

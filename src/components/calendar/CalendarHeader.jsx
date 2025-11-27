import React from "react";
import { ChartLine } from "lucide-react";

export default function CalendarHeader({
  currentMonth,
  goNext,
  goPrev,
  onToggleView,
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={goPrev}
          className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-transform duration-150 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          aria-label="prev"
        >
          <span className="text-gray-700">◀</span>
        </button>

        <button
          onClick={goNext}
          className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-transform duration-150 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          aria-label="next"
        >
          <span className="text-gray-700">▶</span>
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">{currentMonth}</h2>

      <button
        onClick={onToggleView}
        aria-label="analytics"
        className="inline-flex items-center px-4 py-2 gap-2 cursor-pointer rounded-lg text-white bg-black shadow-md hover:shadow-xl transition-transform duration-150 ease-out transform active:scale-95 active:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300/30"
      >
        <ChartLine className="w-4 h-4 opacity-95" />
        <span className="whitespace-nowrap font-medium">Show Analytics</span>
      </button>
    </div>
  );
}

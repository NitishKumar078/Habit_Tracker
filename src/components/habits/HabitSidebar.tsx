import useHabits from "../../hooks/useHabits";
import HabitItem from "./HabitItem";
import HabitFilters from "./HabitFilters";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

const CATEGORY_ICONS: Record<string, string> = {
  sport: "fa-person-running",
  "skill development": "fa-code",
  health: "fa-glass-water",
  learning: "fa-book",
  custom: "fa-brain",
};

export default function HabitSidebar({ mode = "today" }) {
  const { habits, toggleCompletion, isCompleted, getBestStreak } = useHabits();
  const today = dayjs().format("YYYY-MM-DD");

  const [filteredHabits, setFilteredHabits] = useState(habits);

  useEffect(() => {
    setFilteredHabits(habits);
  }, [habits]);

  const shouldShowFilters = habits.length > 10;

  return (
    <div className="bg-white m-1 p-2 rounded-2xl shadow-soft border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-center">Status</h3>
      </div>

      {/* Filters */}
      {shouldShowFilters && (
        <HabitFilters
          habits={habits}
          onChange={setFilteredHabits}
        />
      )}

      {/* Habit List */}
      <div className="flex flex-col gap-3 max-h-[60vh] overflow-auto pr-2">
        {filteredHabits.length === 0 ? (
          <div className="text-sm text-gray-500">
            {habits.length === 0
              ? "Nothing to mark"
              : "No habits match your search"}
          </div>
        ) : mode === "drawer" ? (
          filteredHabits.map((h) => <HabitItem key={h.id} habit={h} />)
        ) : (
          // mode === 'today'
          filteredHabits.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3 " >
                <div className={`size-8 rounded-lg  text-black flex items-center justify-center sm:flex`} style={{
                  background: h.color
                }}>
                  <i className={`fa-solid ${CATEGORY_ICONS[h.category] || "fa-brain"}`}></i>
                </div>
                {/* <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ background: h.color }}
                /> */}
                <div className="text-sm font-medium">
                  {isCompleted(h.id, today) ? <s >{h.name}</s> : h.name}
                </div>
                <div className="text-xs text-orange-500 ml-auto">
                  🔥 {getBestStreak(h.id)}
                </div>
              </div>

              <button
                onClick={() => toggleCompletion(h.id, today)}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${isCompleted(h.id, today)
                  ? "bg-green-500 text-white shadow-md hover:shadow-lg hover:bg-green-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
                  }`}
              >
                <span className="flex items-center gap-2">
                  {isCompleted(h.id, today) ? (
                    <>
                      <i className="fa-solid fa-check"></i>

                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-hourglass-half opacity-50"></i>

                    </>
                  )}
                </span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

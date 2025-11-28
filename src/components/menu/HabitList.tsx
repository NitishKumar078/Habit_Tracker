import { useRef, useState } from "react";
import { Edit, Trash2, SquarePlus } from "lucide-react";
import useHabits from "../../hooks/useHabits";
import AddHabitModal from "../habits/AddHabitModal";
import HabitFilters from "../habits/HabitFilters";
import { Habit } from "../../context/HabitContextCommon";

const CATEGORY_ICONS: Record<string, string> = {
  sport: "fa-person-running",
  "skill development": "fa-code",
  health: "fa-glass-water",
  learning: "fa-book",
  custom: "fa-brain",
};

export default function HabitList() {
  const ref = useRef(null);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const { habits, deleteHabit } = useHabits();

  // store filtered habits locally
  const [filteredHabits, setFilteredHabits] = useState(habits);

  return (
    <>
      <div
        ref={ref}
        className="fixed left-4 top-1/4 mt-3 -translate-y-1/4 z-40"
      >
        <div className="w-64 px-4 py-3 bg-white/40 backdrop-blur-lg border border-slate-200/20 rounded-2xl shadow-soft">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-center">Habits</h3>
            <button
              onClick={() => {
                setSelectedHabit(null);
                setShowEdit(true);
              }}
              className="p-1 rounded-md cursor-pointer hover:bg-slate-100"
            >
              <SquarePlus size={20} className="cursor-pointer" />
            </button>
          </div>

          {/* Filters */}
          <HabitFilters habits={habits} onChange={setFilteredHabits} />

          {/* Habits List */}
          <div className="overflow-y-auto max-h-80">
            {filteredHabits.length === 0 ? (
              <div className="text-sm mt-4 text-slate-500">
                <h5 className="text-black font-semibold">
                  {habits.length === 0
                    ? "There are no active habits."
                    : "No habits match your search."}
                </h5>
              </div>
            ) : (
              filteredHabits.map((h: Habit) => (
                <div
                  key={h.id}
                  className="group flex items-center  justify-between gap-3 p-2 rounded-md hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">

                    <div className={`size-6 rounded-lg  text-black flex items-center justify-center sm:flex`} style={{
                      background: h.color
                    }}>
                      <i className={`fa-solid ${CATEGORY_ICONS[h.category] || "fa-brain"}`}></i>
                    </div>
                    <div className="text-sm font-medium ">{h.name}</div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => {
                        setSelectedHabit(h);
                        setShowEdit(true);
                      }}
                      className="p-1 rounded-md hover:bg-slate-100"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => deleteHabit(h.id)}
                      className="p-1 rounded-md hover:bg-slate-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
            <div>
              Showing {filteredHabits.length} of {habits.length}
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <AddHabitModal
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          habit={selectedHabit || undefined}
        />
      )}
    </>
  );
}

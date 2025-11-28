import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import useHabits from "../../hooks/useHabits";
import AddHabitModal from "./AddHabitModal";
import { Habit } from "../../context/HabitContextCommon";

const CATEGORY_ICONS: Record<string, string> = {
  sport: "fa-person-running",
  "skill development": "fa-code",
  health: "fa-glass-water",
  learning: "fa-book",
  custom: "fa-brain",
};

interface Props {
  habit: Habit;
}

export default function HabitItem({ habit }: Props) {
  const { deleteHabit, getBestStreak } = useHabits();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <i className={`fa-solid ${CATEGORY_ICONS[habit.category] || "fa-brain"} text-sm`}></i>
        {/* <div
          className="w-3.5 h-3.5 rounded-full"
          style={{ background: habit.color }}
        /> */}
        <div className="text-sm font-medium">{habit.name}</div>
        <div className="text-xs text-orange-500 ml-auto">
          🔥 {getBestStreak(habit.id)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowEdit(true)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => deleteHabit(habit.id)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {showEdit && (
        <AddHabitModal
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          habit={habit}
        />
      )}
    </div>
  );
}

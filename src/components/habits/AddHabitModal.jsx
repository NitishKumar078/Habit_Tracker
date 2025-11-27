import React, { useState, useEffect, useRef } from "react";
import { useHabits } from "../../hooks/useHabits";

const ICONS = [
  { icon: "fa-person-running", color: "yellow" },
  { icon: "fa-book", color: "blue" },
  { icon: "fa-glass-water", color: "cyan" },
  { icon: "fa-bed", color: "indigo" },
  { icon: "fa-carrot", color: "orange" },
  { icon: "fa-code", color: "purple" },
  { icon: "fa-guitar", color: "rose" },
  { icon: "fa-briefcase", color: "slate" },
  { icon: "fa-leaf", color: "green" },
  { icon: "fa-brain", color: "pink" },
];

export default function AddHabitModal({ isOpen, onClose, habit }) {
  const { addHabit, editHabit } = useHabits();
  const [name, setName] = useState(habit?.name || "");
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0].icon);
  const [selectedColor, setSelectedColor] = useState(ICONS[0].color);
  const habitinput = useRef(null);

  useEffect(() => {
    if (habitinput.current) {
      habitinput.current.focus();
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const habitData = {
      name: trimmedName,
      color: selectedColor,
      icon: selectedIcon,
    };

    if (habit) {
      // Editing existing habit
      editHabit(habit.id, habitData);
    } else {
      // Creating new habit
      addHabit(habitData);
    }

    // Reset local state and close the modal
    setName("");
    onClose();
  };

  const handleIconSelect = (icon, color) => {
    setSelectedIcon(icon);
    setSelectedColor(color);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="absolute top-1/2 left-1/2 animate-fade-scale -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">
              {habit ? "Edit Habit" : "Create New Habit"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-500 mb-2">
                  Habit Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ref={(habitinput) => habitinput && habitinput.focus()}
                  required
                  placeholder="e.g. Read 30 mins"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-500 mb-2">
                  Icon & Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {ICONS.map(({ icon, color }) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => handleIconSelect(icon, color)}
                      className={`w-10 h-10  text-${color}-600  bg-${color}-200 rounded-lg flex items-center justify-center hover:scale-110 transition-transform ring-2 ring-offset-2 cursor-pointer
                        ${
                          selectedIcon === icon
                            ? "ring-primary-500"
                            : "ring-transparent"
                        }`}
                    >
                      {/* Assuming this is a Font Awesome icon class */}
                      <i className={`fa-solid ${icon}`}></i>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl"
                  disabled={!name.trim()} // Optionally disable if name is empty
                >
                  {habit ? "Save" : "Create Habit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

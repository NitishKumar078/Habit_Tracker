import React, { useState, useEffect, useRef } from "react";
import type { Habit } from "../../context/HabitContextCommon";
import useHabits from "../../hooks/useHabits";

const COLORS = ["yellow", "blue", "cyan", "indigo", "orange", "purple", "brown", "gray", "green", "pink"];

const CATEGORIES = ["sport", "skill development", "health", "learning", "custom"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  habit?: Habit;
}

export default function AddHabitModal({ isOpen, onClose, habit }: Props) {
  const { habits, addHabit, editHabit } = useHabits();
  const [name, setName] = useState(habit?.name || "");
  const [selectedColor, setSelectedColor] = useState(habit?.color || "yellow");
  const [category, setCategory] = useState(habit?.category || "sport");
  const [customCategory, setCustomCategory] = useState("");
  const [error, setError] = useState("");
  const habitinput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (habitinput.current) {
      habitinput.current.focus();
    }
    setError(""); // Clear error when modal opens
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) return;

    // Check for duplicate habit names
    const existingHabit = habits.find(h => h.name.toLowerCase() === trimmedName.toLowerCase() && h.id !== habit?.id);
    if (existingHabit) {
      setError("A habit with this name already exists.");
      return;
    }

    const finalCategory = category === "custom" ? customCategory.trim() || "custom" : category;

    const habitData = {
      name: trimmedName,
      color: selectedColor,
      category: finalCategory,
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
    setSelectedColor("yellow");
    setCategory("sport");
    setCustomCategory("");
    setError("");
    onClose();
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
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(""); // Clear error on input change
                  }}
                  ref={habitinput}
                  required
                  placeholder="e.g. Read 30 mins"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-500 outline-none"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-500 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                {category === "custom" && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    className="w-full px-4 py-3 mt-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-500 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10  rounded-lg hover:scale-110 transition-transform ring-2 ring-offset-2 cursor-pointer
                        ${selectedColor === color
                          ? "ring-black"
                          : "ring-transparent"
                        }`}
                      style={{ backgroundColor: color }}
                    >
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 active:scale-95 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 active:scale-95 transition-all duration-200"
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


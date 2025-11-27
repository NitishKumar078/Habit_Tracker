import HabitList from "../components/menu/HabitList";
import Calendar from "../components/calendar/Calendar";
import HabitSidebar from "../components/habits/HabitSidebar";
import { useState } from "react";
import AddHabitModal from "../components/habits/AddHabitModal";
import HabitStatsHeader from "../components/habits/HabitStatsHeader";
import { useHabits } from "../hooks/useHabits";
import HabitAnalyticsModal from "../components/HabitAnalyticsModal";
import { Plus } from "lucide-react";
import logoimg from "../assets/icon48.png";

export default function MainLayout() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [view, setView] = useState("calendar"); // 'calendar' or 'analytics'
  const { habits, getCompletionsForDate, getBestStreak } = useHabits();

  // Compute stats
  const today = new Date().toISOString().slice(0, 10);
  const completedToday = getCompletionsForDate(today).length;
  const completionRate =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  const bestStreak =
    habits.length > 0 ? Math.max(...habits.map((h) => getBestStreak(h.id))) : 0;

  const stats = {
    total: habits.length,
    completedToday,
    completionRate,
    bestStreak,
  };

  return (
    <div className="min-h-screen p-6 lg:p-10 flex">
      <p className="top-0 m-1 fixed text-lg font-semibold text-center bg-gradient-to-r from-red-500 to-green-300 bg-clip-text text-transparent">
        <img src={logoimg} alt="MY_Logo" className="size-5 inline" /> Habit
        Tracker
      </p>
      {/* Left sidebar menu */}
      <HabitList />

      {/* Main content area */}
      <div className="flex-1 ml-4 absolute top-1 lg:ml-48 flex flex-col">
        {/* Top stats header */}
        <HabitStatsHeader stats={stats} />

        {/* Main grid: Sidebar left, Calendar right */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-2 items-start w-full">
          <div className="lg:col-span-9 min-w-0 m-1 flex flex-col">
            {view === "calendar" ? (
              <Calendar onToggleView={() => setView("analytics")} />
            ) : (
              <HabitAnalyticsModal
                onToggleView={() => setView("calendar")}
                habits={habits}
              />
            )}
          </div>
          <div className="lg:col-span-3 min-w-0">
            <HabitSidebar mode="today" />
          </div>
        </div>
      </div>
      <button
        className="fixed right-6 cursor-pointer bottom-6 z-40 bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-black-600 hover:shadow-xl transition-transform duration-150 ease-out transform active:scale-95 active:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300/30 flex items-center gap-2"
        onClick={() => setIsAddOpen(true)}
      >
        <Plus size={20} /> Add
      </button>

      {isAddOpen && (
        <AddHabitModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      )}
    </div>
  );
}

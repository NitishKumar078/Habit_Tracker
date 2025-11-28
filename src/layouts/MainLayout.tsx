import HabitList from "../components/menu/HabitList";
import Calendar from "../components/calendar/Calendar";
import HabitSidebar from "../components/habits/HabitSidebar";
import { useState } from "react";
import AddHabitModal from "../components/habits/AddHabitModal";
import HabitStatsHeader from "../components/habits/HabitStatsHeader";
import useHabits from "../hooks/useHabits";
import HabitAnalyticsModal from "../components/habits/HabitAnalyticsModal";
import { Plus } from "lucide-react";
const logoimg = new URL("../assets/icon48.png", import.meta.url).href;
import FlippableCard from "../components/habits/FlippableCard";

export const CATEGORY_ICONS: Record<string, string> = {
  sport: "fa-person-running",
  "skill development": "fa-code",
  health: "fa-heart",
  learning: "fa-book",
  custom: "fa-brain",
};

export default function MainLayout() {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [view, setView] = useState<"calendar" | "analytics">("calendar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
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
    <div className="min-h-screen pt-8 lg:m-2 md:pt-0 p-4 md:p-9 lg:p-2 flex flex-col md:flex-row gap-4">
      <p className="top-0 m-1 fixed text-sm md:text-lg font-semibold text-center bg-linear-to-r from-red-500 to-green-300 bg-clip-text text-transparent">
        <img src={logoimg} alt="MY_Logo" className="size-4 md:size-5 inline" /> Habit
        Tracker
      </p>
      {/* Left sidebar menu (desktop) */}
      <HabitList />

      {/* Mobile menu button */}
      <div className="lg:hidden relative z-30">
        <button
          aria-label="Open menu"
          className="p-2 bg-white rounded-lg shadow-md"
          onClick={() => setIsMobileMenuOpen((s) => !s)}
        >
          ☰
        </button>
      </div>
      {isMobileMenuOpen && (
        <HabitList isDrawer onClose={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main content area */}
      <div className="flex-1 ml-0 md:ml-4 lg:ml-64 flex flex-col relative">
        {/* Top stats header */}
        <HabitStatsHeader stats={stats} />

        {/* Main grid: Sidebar left, Calendar right */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-2 items-start w-full">
          <div className="lg:col-span-9 min-w-0 m-1 flex flex-col w-full md:w-auto">
            <FlippableCard
              flipped={view !== "calendar"}
              front={<Calendar onToggleView={() => setView("analytics")} />}
              back={
                <HabitAnalyticsModal
                  onToggleView={() => setView("calendar")}
                  habits={habits}
                />
              }
            />
          </div>

        </div>

      </div>
      <div className="top-[123vh] absolute w-[83vw] flex md:block md:relative md:top-1 md:w-64">
        <HabitSidebar mode="today" />
      </div>
      <button
        className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40 bg-black text-white px-4 md:px-6 py-3 rounded-lg shadow-lg hover:bg-black-600 hover:shadow-xl transition-transform duration-150 ease-out transform active:scale-95 active:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300/30 flex items-center gap-2"
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

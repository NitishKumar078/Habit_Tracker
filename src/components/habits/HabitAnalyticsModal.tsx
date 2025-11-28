import { useMemo } from "react";
import { PieChart, Calendar1 } from "lucide-react";
import type { Habit } from "../../context/HabitContextCommon";
import useHabits from "../../hooks/useHabits";

const CATEGORY_ICONS: Record<string, string> = {
  sport: "fa-person-running",
  "skill development": "fa-code",
  health: "fa-glass-water",
  learning: "fa-book",
  custom: "fa-brain",
};


type HabitAnalyticsModalProps = {
  onToggleView: () => void;
  habits: Habit[];
};

type HabitPerformance = Habit & {
  checkIns: number;
  consistency: number;
  bestStreak: number;
};

export default function HabitAnalyticsModal({ onToggleView, habits }: HabitAnalyticsModalProps) {
  const today = new Date();
  const { getBestStreak } = useHabits();
  const last30 = [...Array(30)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (29 - i));
    return d.toISOString().slice(0, 10);
  });

  // ---- Build 30-day bar chart data ----
  const activityData = useMemo((): number[] => {
    return last30.map((date) => {
      let count = 0;
      habits.forEach((h) => {
        if (h.history && h.history[date]) count++;
      });
      return count;
    });
  }, [habits, last30]);

  // ---- Habit performance breakdown ----
  const habitPerformance = useMemo((): HabitPerformance[] => {
    return habits.map((h) => {
      const checkIns = Object.values(h.history || {}).filter(Boolean).length;

      // consistency = (# days completed / # days since creation)
      const start = new Date(h.startDate);
      const diff = Math.max(
        1,
        Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      );
      const consistency = Math.round((checkIns / diff) * 100);


      const bestStreak = getBestStreak(h.id);

      return {
        ...h,
        checkIns,
        consistency,
        bestStreak,
      };
    });
  }, [habits]);

  return (
    <div className="w-[60vw] bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PieChart className="text-blue-600" size={22} />
          <h2 className="text-xl font-bold">Analytics</h2>
        </div>
        <button
          onClick={onToggleView}
          className="inline-flex cursor-pointer items-center px-4 py-2 gap-2 rounded-lg text-white bg-black shadow-md hover:shadow-xl transition-transform duration-150 ease-out transform active:scale-95 active:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300/30"
        >
          <Calendar1 /> show calender
        </button>
      </div>

      {/* LAST 30 DAYS ACTIVITY */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-slate-500 mb-3">
          LAST 30 DAYS ACTIVITY
        </h4>

        <div className="flex items-end gap-1 h-28">
          {activityData.map((v, i) => (
            <div
              key={i}
              className="w-[7px] bg-blue-400 rounded-t"
              style={{
                height: `${v === 0 ? 6 : v * 12}px`,
                opacity: v === 0 ? 0.25 : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* HABIT PERFORMANCE */}
      <h4 className="text-xs font-semibold text-slate-500 mt-6 mb-3">
        HABIT PERFORMANCE
      </h4>

      <div className="grid grid-cols-2 gap-3">
        {habitPerformance.map((h) => (
          <div
            key={h.id}
            className="flex items-center justify-between bg-slate-50 rounded-xl p-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ background: h.color }}
              >
                <i className={`fa-solid ${CATEGORY_ICONS[h.category] || "fa-brain"}`} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{h.name}</span>
                <span className="text-xs text-slate-600">
                  {h.consistency}% CONSISTENCY
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium">{h.checkIns} Check-ins</div>
              <div className="text-xs text-slate-500">
                Best: {h.bestStreak} days
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


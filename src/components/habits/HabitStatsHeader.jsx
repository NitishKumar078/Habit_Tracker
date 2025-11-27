import React from "react";

export default function HabitStatsHeader({ stats }) {
  const {
    total = 0,
    completedToday = 0,
    completionRate = 0,
    bestStreak = 0,
  } = stats;

  return (
    <div className="w-full flex items-center gap-2 p-2">
      <StatCard
        label="TOTAL HABITS"
        value={total}
        valueColor="text-slate-900"
      />
      <StatCard
        label="COMPLETED TODAY"
        value={completedToday}
        valueColor="text-green-600"
      />
      <StatCard
        label="COMPLETION RATE (Today) "
        value={`${completionRate}%`}
        valueColor="text-indigo-600"
      />
      <StatCard
        label="BEST STREAK"
        value={bestStreak}
        valueColor="text-orange-500"
        streak
      />
    </div>
  );
}

function StatCard({ label, value, valueColor, streak }) {
  return (
    <div className="flex flex-col flex-1 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <span className="text-[11px] tracking-wider font-semibold text-slate-500 mb-1">
        {label}
      </span>

      <div className="flex items-center gap-1">
        <span className={`text-2xl font-semibold ${valueColor}`}>{value}</span>

        {/* fire emoji for streak */}
        {streak && <span className="text-orange-400 text-xl">🔥</span>}
      </div>
    </div>
  );
}

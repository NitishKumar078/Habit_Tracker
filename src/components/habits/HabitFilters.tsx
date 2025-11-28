import { useMemo, useState } from "react";
import type { Habit } from "../../context/HabitContextCommon";
import { Search } from "lucide-react";


type HabitFiltersProps = {
  habits: Habit[];
  onChange: (filtered: Habit[]) => void;
  minCountToShow?: number;
};

export default function HabitFilters({
  habits,
  onChange,
  minCountToShow = 10,
}: HabitFiltersProps) {
  const [query, setQuery] = useState<string>("");
  const [colorFilter, setColorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const shouldShow = habits.length >= minCountToShow;

  const colorOptions = useMemo((): string[] => {
    const s = new Set();
    habits.forEach((h) => h.color && s.add(h.color));
    return [...s] as string[];
  }, [habits]);

  const categoryOptions = useMemo((): string[] => {
    const s = new Set<string>();
    habits.forEach((h) => {
      if (h.category) {
        s.add(h.category);
      }
    });
    return [...s].filter(Boolean) as string[];
  }, [habits]);

  const filtered = useMemo((): Habit[] => {
    const q = query.trim().toLowerCase();
    return habits.filter((h) => {
      const matchesQuery = q
        ? h.name.toLowerCase().includes(q) ||
        (h.category && h.category.toLowerCase().includes(q))
        : true;
      const matchesColor = colorFilter ? h.color === colorFilter : true;
      const matchesCategory = categoryFilter
        ? h.category === categoryFilter
        : true;
      return matchesQuery && matchesColor && matchesCategory;
      // return matchesQuery && matchesCategory;
    });
  }, [habits, query, colorFilter, categoryFilter]); //habits, query, colorFilter, categoryFilter

  // expose filtered list upward
  onChange(filtered);

  if (!shouldShow) return null;

  return (
    <div className="mb-3">
      {/* Search */}
      <div className="flex items-center gap-2 mb-2">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search habits..."
            className="w-full pl-9 pr-8 py-2 text-sm rounded-lg bg-white/70 border border-slate-200/60"
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={14} />
          </div>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Color Filter */}
      {colorOptions.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="w-full py-2 text-sm rounded-lg bg-white/70 border border-slate-200/60"
          >
            <option value="">All colors</option>
            {colorOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {colorFilter && (
            <button
              onClick={() => setColorFilter("")}
              className="px-2 py-1 text-xs rounded-md bg-slate-100"
              title="Clear color filter"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Category Filter */}
      {categoryOptions.length > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full py-2 text-sm rounded-lg bg-white/70 border border-slate-200/60"
          >
            <option value="">All categories</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {categoryFilter && (
            <button
              onClick={() => setCategoryFilter("")}
              className="px-2 py-1 text-xs rounded-md bg-slate-100"
              title="Clear category filter"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

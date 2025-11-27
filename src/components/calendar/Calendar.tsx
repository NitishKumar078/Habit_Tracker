import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarDayModal from "./CalendarDayModal";
import { useCalendar } from "../../hooks/useCalendar";
import { useHabits } from "../../hooks/useHabits";

interface Props {
  onToggleView: () => void;
}

export default function Calendar({ onToggleView }: Props) {
  const { habits } = useHabits();
  const { currentMonth, goNext, goPrev, days } = useCalendar({
    habits,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="w-[60vw] bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
      <CalendarHeader
        currentMonth={currentMonth}
        goNext={goNext}
        goPrev={goPrev}
        onToggleView={onToggleView}
      />
      <CalendarGrid days={days} onDayClick={setSelectedDate} />
      {selectedDate && (
        <CalendarDayModal
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          habits={habits}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  selectedDate, 
  onDateSelect, 
  minDate, 
  maxDate 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const days = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const previousMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    // Don't allow going to months before current month
    if (newMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(newMonth);
    }
  };

  const nextMonth = () => {
    // Allow going up to 6 months in advance
    const maxMonth = new Date(today.getFullYear(), today.getMonth() + 6, 1);
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    if (newMonth <= maxMonth) {
      setCurrentMonth(newMonth);
    }
  };

  const isDateSelectable = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const isInCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const isNotPast = date >= today || date.toDateString() === today.toDateString();
    const isWithinRange = (!minDate || dateString >= minDate) && (!maxDate || dateString <= maxDate);
    
    return isInCurrentMonth && isNotPast && isWithinRange;
  };

  const formatDateForComparison = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-3 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 group"
        >
          <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>
        
        <h2 className="text-xl font-bold text-gray-900">
          {currentMonth.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
        
        <button
          onClick={nextMonth}
          className="p-3 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 group"
        >
          <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-bold text-gray-600 py-3">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          const dateString = formatDateForComparison(date);
          const isSelected = dateString === selectedDate;
          const isSelectable = isDateSelectable(date);
          const isToday = date.toDateString() === today.toDateString();

          return (
            <button
              key={index}
              onClick={() => isSelectable && onDateSelect(dateString)}
              disabled={!isSelectable}
              className={`
                p-3 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105
                ${isSelected 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105' 
                  : isSelectable 
                    ? 'hover:bg-rose-50 hover:text-rose-600 text-gray-900 hover:shadow-md' 
                    : 'text-gray-400 cursor-not-allowed'
                }
                ${isToday && !isSelected ? 'ring-2 ring-rose-200 bg-rose-50' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
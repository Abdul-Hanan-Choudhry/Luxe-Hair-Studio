import React from 'react';
import { Clock } from 'lucide-react';
import { TimeSlot } from '../types';
import { formatTime } from '../utils/timeSlots';

interface TimeSlotsProps {
  timeSlots: TimeSlot[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({ 
  timeSlots, 
  selectedTime, 
  onTimeSelect 
}) => {
  if (timeSlots.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-rose-100">
        <div className="text-center">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Date First</h3>
          <p className="text-gray-600">
            Please choose a date from the calendar to see available time slots
          </p>
        </div>
      </div>
    );
  }

  const availableSlots = timeSlots.filter(slot => slot.available);
  const unavailableSlots = timeSlots.filter(slot => !slot.available);

  if (availableSlots.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-rose-100">
        <div className="text-center">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Available Times</h3>
          <p className="text-gray-600">
            Sorry, there are no available time slots for this date. Please try another date.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="h-6 w-6 text-rose-600" />
        <h3 className="text-xl font-bold text-gray-900">Available Times</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {availableSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => onTimeSelect(slot.time)}
            className={`
              p-4 text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105
              ${selectedTime === slot.time
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 hover:shadow-md border border-rose-200'
              }
            `}
          >
            {formatTime(slot.time)}
          </button>
        ))}
      </div>

      {unavailableSlots.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Unavailable Times</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {unavailableSlots.map((slot) => (
              <div
                key={slot.time}
                className="p-4 text-center rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
              >
                {formatTime(slot.time)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
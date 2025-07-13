import { TimeSlot, Staff, Booking } from '../types';

export const generateTimeSlots = (
  staff: Staff,
  selectedDate: string,
  serviceDuration: number,
  existingBookings: Booking[]
): TimeSlot[] => {
  const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const workingHours = staff.workingHours[dayOfWeek];

  if (!workingHours.isWorking) {
    return [];
  }

  const slots: TimeSlot[] = [];
  const [startHour, startMinute] = workingHours.start.split(':').map(Number);
  const [endHour, endMinute] = workingHours.end.split(':').map(Number);

  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;

  // Generate slots every 30 minutes
  for (let time = startTime; time <= endTime - serviceDuration; time += 30) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // Check if this slot conflicts with existing bookings
    const isBooked = existingBookings.some(booking => {
      if (booking.date === selectedDate && booking.staffId === staff.id) {
        const bookingTime = booking.time;
        const [bookingHour, bookingMinute] = bookingTime.split(':').map(Number);
        const bookingStartTime = bookingHour * 60 + bookingMinute;
        // Get the service duration from the booking (default to 60 minutes if not found)
        const bookingEndTime = bookingStartTime + 60; // This would come from the booking's service duration in a real app

        return (time >= bookingStartTime && time < bookingEndTime) || 
               (time + serviceDuration > bookingStartTime && time < bookingStartTime);
      }
      return false;
    });

    // Skip slots that are in the past for today
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const isPastTime = selectedDate === today && time <= currentTime;

    slots.push({
      time: timeString,
      available: !isBooked && !isPastTime,
      staffId: staff.id
    });
  }

  return slots;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
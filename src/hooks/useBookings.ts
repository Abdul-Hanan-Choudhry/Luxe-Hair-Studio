import { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import { Booking } from '../types';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await bookingAPI.getBookings();
        setBookings(data.bookings || data);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBookings();
  }, []);

  const addBooking = async (bookingData: any) => {
    try {
      const newBooking = await bookingAPI.createBooking(bookingData);
      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  };

  const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
    try {
      const updatedBooking = await bookingAPI.updateBooking(bookingId, updates);
      setBookings(prev => prev.map(booking =>
        booking.id === bookingId ? updatedBooking : booking
      ));
      return updatedBooking;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  };

  const deleteBooking = async (bookingId: string) => {
    try {
      await bookingAPI.deleteBooking(bookingId);
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  };

  return {
    bookings,
    loading,
    addBooking,
    updateBooking,
    deleteBooking
  };
};
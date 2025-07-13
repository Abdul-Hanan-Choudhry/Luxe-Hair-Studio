import { useState } from 'react';
import { BookingFormData, Service, Staff, Customer } from '../types';

export const useBooking = () => {
  const [bookingData, setBookingData] = useState<BookingFormData>({
    service: null,
    staff: null,
    date: '',
    time: '',
    customer: {
      name: '',
      email: '',
      phone: '',
      notes: ''
    }
  });

  const updateService = (service: Service) => {
    setBookingData(prev => ({ ...prev, service }));
  };

  const updateStaff = (staff: Staff) => {
    setBookingData(prev => ({ ...prev, staff }));
  };

  const updateDateTime = (date: string, time: string) => {
    setBookingData(prev => ({ ...prev, date, time }));
  };

  const updateCustomer = (customer: Customer) => {
    setBookingData(prev => ({ ...prev, customer }));
  };

  const resetBooking = () => {
    setBookingData({
      service: null,
      staff: null,
      date: '',
      time: '',
      customer: {
        name: '',
        email: '',
        phone: '',
        notes: ''
      }
    });
  };

  return {
    bookingData,
    updateService,
    updateStaff,
    updateDateTime,
    updateCustomer,
    resetBooking
  };
};
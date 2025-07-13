import React from 'react';
import { Calendar, Clock, User, DollarSign, Phone, Mail } from 'lucide-react';
import { BookingFormData } from '../types';
import { formatDate, formatTime } from '../utils/timeSlots';

interface BookingSummaryProps {
  bookingData: BookingFormData;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ bookingData }) => {
  const { service, staff, date, time, customer } = bookingData;

  if (!service || !staff || !date || !time) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Summary</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <Calendar className="h-4 w-4 text-rose-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Service</p>
            <p className="text-base font-semibold text-gray-700">{service.name}</p>
            <p className="text-sm text-gray-500">{service.duration} minutes</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <User className="h-4 w-4 text-rose-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Staff</p>
            <p className="text-base font-semibold text-gray-700">{staff.name}</p>
            <p className="text-sm text-gray-500">{staff.title}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <Calendar className="h-4 w-4 text-rose-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Date</p>
            <p className="text-base font-semibold text-gray-700">{formatDate(date)}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <Clock className="h-4 w-4 text-rose-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Time</p>
            <p className="text-base font-semibold text-gray-700">{formatTime(time)}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-100 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Total Investment</span>
            </div>
            <span className="text-2xl font-bold text-emerald-600">${service.price}</span>
          </div>
        </div>

        {customer.name && (
          <>
            <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Customer Information</h4>
              
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{customer.name}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{customer.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{customer.phone}</span>
              </div>
              
              {customer.notes && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-900">Notes</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">{customer.notes}</p>
                </div>
              )}
            </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
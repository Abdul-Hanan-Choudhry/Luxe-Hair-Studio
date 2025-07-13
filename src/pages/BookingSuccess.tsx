import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { BookingFormData } from '../types';
import { formatDate, formatTime } from '../utils/timeSlots';

export const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const handleNewBooking = () => {
    navigate('/book');
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const savedBooking = localStorage.getItem('lastBooking');
    if (savedBooking) {
      setBookingData(JSON.parse(savedBooking));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-rose-100">
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600">
              Your luxury appointment has been successfully booked at Luxe Hair Studio
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 mb-8 border border-rose-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Appointment Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-rose-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-500">Service</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {bookingData?.service?.name || 'Signature Cut & Style'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-rose-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-500">Stylist</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {bookingData?.staff?.name || 'Isabella Martinez'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-rose-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {bookingData?.date ? formatDate(bookingData.date) : 'Monday, January 15, 2025'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-rose-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-500">Time</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {bookingData?.time ? formatTime(bookingData.time) : '10:00 AM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {bookingData?.service && (
              <div className="mt-6 pt-6 border-t border-rose-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-700">Total Investment</span>
                  <span className="text-2xl font-bold text-rose-600">${bookingData.service.price}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 mb-8 border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-900 mb-4">
              What's Next?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-3 text-emerald-800">
                <p className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Confirmation email sent to your inbox</span>
                </p>
                <p className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Calendar invitation attached</span>
                </p>
              </div>
              <div className="space-y-3 text-emerald-800">
                <p className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Reminder notifications will be sent</span>
                </p>
                <p className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>You can reschedule or cancel anytime</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleNewBooking}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <span>Book Another Appointment</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleBackToHome}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
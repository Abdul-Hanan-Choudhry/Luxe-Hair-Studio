import React from 'react';
import { Calendar, Clock, User, Phone, Mail, Eye, Check, X, Trash2, Star } from 'lucide-react';
import { Booking } from '../types';
import { formatDate, formatTime } from '../utils/timeSlots';

interface BookingCardProps {
  booking: Booking;
  onView: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onComplete: () => void;
  onDelete: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onView,
  onConfirm,
  onCancel,
  onComplete,
  onDelete
}) => {
  // Handle both populated and non-populated booking data
  const service = typeof booking.serviceId === 'object' ? booking.serviceId : null;
  const staffMember = typeof booking.staffId === 'object' ? booking.staffId : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <Check className="h-4 w-4" />;
      case 'completed':
        return <Star className="h-4 w-4" />;
      case 'cancelled':
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Customer Info */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-semibold text-gray-900">{booking.customerName}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-3 w-3" />
              <span>{booking.customerEmail}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-3 w-3" />
              <span>{booking.customerPhone}</span>
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-1">
            <p className="font-medium text-gray-900">{service?.name}</p>
            <p className="text-sm text-gray-600">{staffMember?.name}</p>
            <p className="text-sm font-semibold text-emerald-600">${service?.price}</p>
          </div>

          {/* Date & Time */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">{formatDate(booking.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">{formatTime(booking.time)}</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center">
            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              <span className="capitalize">{booking.status}</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onView}
              className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            
            {booking.status === 'pending' && (
              <button
                onClick={onConfirm}
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                title="Confirm Booking"
              >
                <Check className="h-4 w-4" />
              </button>
            )}
            
            {(booking.status === 'pending' || booking.status === 'confirmed') && (
              <button
                onClick={onCancel}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Cancel Booking"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {booking.status === 'confirmed' && (
              <button
                onClick={onComplete}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                title="Mark as Completed"
              >
                <Star className="h-4 w-4" />
              </button>
            )}
            
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Booking"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
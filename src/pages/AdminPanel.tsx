import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Clock, Search, Filter, Plus, Eye, Check, X, Edit, Trash2 } from 'lucide-react';
import { Header } from '../components/Header';
import { BookingCard } from '../components/BookingCard';
import { BookingModal } from '../components/BookingModal';
import { StatsCard } from '../components/StatsCard';
import { bookingAPI } from '../services/api';
import { Booking, BookingStats } from '../types';

interface AdminPanelProps {
  auth: {
    user: any;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
  };
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ auth }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, loading: authLoading } = auth;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats>({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    todayBookings: 0,
    revenue: 0
  });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // All hooks above this line!
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Load data
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [bookingsData, statsData] = await Promise.all([
          bookingAPI.getBookings({ search: searchTerm, status: statusFilter, date: dateFilter }),
          bookingAPI.getStats()
        ]);
        setBookings(bookingsData.bookings || bookingsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [searchTerm, statusFilter, dateFilter]);

  // Filter bookings
  const filteredBookings = bookings;

  const handleBookingAction = async (bookingId: string, action: 'confirm' | 'cancel' | 'complete') => {
    try {
      const statusMap = {
        confirm: 'confirmed' as const,
        cancel: 'cancelled' as const,
        complete: 'completed' as const
      };
      
      console.log('Updating booking:', { bookingId, action, status: statusMap[action] });
      
      const result = await bookingAPI.updateBooking(bookingId, { status: statusMap[action] });
      console.log('Update result:', result);
      
      // Reload data
      const [bookingsData, statsData] = await Promise.all([
        bookingAPI.getBookings({ search: searchTerm, status: statusFilter, date: dateFilter }),
        bookingAPI.getStats()
      ]);
      setBookings(bookingsData.bookings || bookingsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error updating booking:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      alert('Failed to update booking. Please try again.');
    }
  };

  // Add updateBooking for BookingModal
  const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
    try {
      await bookingAPI.updateBooking(bookingId, updates);
      // Reload data
      const [bookingsData, statsData] = await Promise.all([
        bookingAPI.getBookings({ search: searchTerm, status: statusFilter, date: dateFilter }),
        bookingAPI.getStats()
      ]);
      setBookings(bookingsData.bookings || bookingsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking. Please try again.');
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingAPI.deleteBooking(bookingId);
        
        // Reload data
        const [bookingsData, statsData] = await Promise.all([
          bookingAPI.getBookings({ search: searchTerm, status: statusFilter, date: dateFilter }),
          bookingAPI.getStats()
        ]);
        setBookings(bookingsData.bookings || bookingsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAdminLink={false} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">Manage your salon bookings and appointments</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleBackToHome}
              className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              Back to Website
            </button>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatsCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={Calendar}
            color="blue"
          />
          <StatsCard
            title="Pending"
            value={stats.pendingBookings}
            icon={Clock}
            color="yellow"
          />
          <StatsCard
            title="Confirmed"
            value={stats.confirmedBookings}
            icon={Check}
            color="green"
          />
          <StatsCard
            title="Today"
            value={stats.todayBookings}
            icon={Users}
            color="purple"
          />
          <StatsCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={DollarSign}
            color="emerald"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-rose-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
            
            <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-2xl shadow-lg border border-rose-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Bookings ({filteredBookings.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking._id || booking.id}
                  booking={booking}
                  onView={() => handleViewBooking(booking)}
                  onConfirm={() => handleBookingAction(booking._id || booking.id, 'confirm')}
                  onCancel={() => handleBookingAction(booking._id || booking.id, 'cancel')}
                  onComplete={() => handleBookingAction(booking._id || booking.id, 'complete')}
                  onDelete={() => handleDeleteBooking(booking._id || booking.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBooking(null);
          }}
          onUpdate={(updates) => {
            updateBooking(selectedBooking._id || selectedBooking.id, updates);
            setSelectedBooking({ ...selectedBooking, ...updates });
          }}
        />
      )}
    </div>
  );
};
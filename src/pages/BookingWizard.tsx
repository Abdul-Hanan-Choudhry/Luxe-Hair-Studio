import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { BookingProgress } from '../components/BookingProgress';
import { ServiceCard } from '../components/ServiceCard';
import { StaffCard } from '../components/StaffCard';
import { Calendar } from '../components/Calendar';
import { TimeSlots } from '../components/TimeSlots';
import { CustomerForm } from '../components/CustomerForm';
import { BookingSummary } from '../components/BookingSummary';
import { useBooking } from '../hooks/useBooking';
import { servicesAPI, staffAPI, bookingAPI } from '../services/api';
import { Service, Staff, TimeSlot } from '../types';

export const BookingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [availableStaff, setAvailableStaff] = useState<Staff[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const {
    bookingData,
    updateService,
    updateStaff,
    updateDateTime,
    updateCustomer,
    resetBooking
  } = useBooking();

  const steps = ['Select Service', 'Choose Staff', 'Pick Date & Time', 'Your Details'];

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, staffData] = await Promise.all([
          servicesAPI.getServices(),
          staffAPI.getStaff()
        ]);
        setServices(servicesData);
        setStaff(staffData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle pre-selected service and staff from localStorage
  useEffect(() => {
    // Check for pre-selected service from localStorage
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
      const service = JSON.parse(selectedService);
      updateService(service);
      localStorage.removeItem('selectedService');
    }
    // Check for pre-selected staff from localStorage
    const selectedStaff = localStorage.getItem('selectedStaff');
    if (selectedStaff) {
      const staff = JSON.parse(selectedStaff);
      updateStaff(staff);
      localStorage.removeItem('selectedStaff');
    }
  }, [updateService, updateStaff]);

  // Filter staff based on selected service
  useEffect(() => {
    if (bookingData.service) {
      // Debug logging
      console.log('Selected service id:', bookingData.service.id || bookingData.service._id);
      staff.forEach(member => {
        console.log('Staff:', member.name, 'services:', member.services.map((s: any) => s._id || s.id || s));
      });
      const filteredStaff = staff.filter(member =>
        member.services.some((s: any) =>
          (typeof s === 'string'
            ? s
            : (s._id || s.id || '').toString()
          ) === (bookingData.service!.id || bookingData.service!._id || '').toString()
        )
      );
      setAvailableStaff(filteredStaff);

      // Only auto-select if not already selected
      if (
        filteredStaff.length === 1 &&
        (!bookingData.staff || bookingData.staff.id !== filteredStaff[0].id)
      ) {
        updateStaff(filteredStaff[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData.service, staff]);

  // Generate time slots when staff and date are selected
  useEffect(() => {
    const loadTimeSlots = async () => {
      if (bookingData.staff && bookingData.date && bookingData.service) {
        try {
          const staffId = bookingData.staff.id || bookingData.staff._id;
          if (!staffId) {
            console.error('No staff ID available');
            setTimeSlots([]);
            return;
          }
          const slots = await bookingAPI.getAvailableSlots(
            staffId,
            bookingData.date,
            bookingData.service.duration
          );
          setTimeSlots(slots);
        } catch (error) {
          console.error('Error loading time slots:', error);
          setTimeSlots([]);
        }
      }
    };
    
    loadTimeSlots();
  }, [bookingData.staff, bookingData.date, bookingData.service]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0:
        return bookingData.service !== null;
      case 1:
        return bookingData.staff !== null;
      case 2:
        return bookingData.date !== '' && bookingData.time !== '';
      case 3:
        return bookingData.customer.name !== '' && 
               bookingData.customer.email !== '' && 
               bookingData.customer.phone !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleServiceSelect = (service: Service) => {
    updateService(service);
    // Reset staff selection when service changes
    if (bookingData.staff && !bookingData.staff.services.includes(service.id)) {
      updateStaff(availableStaff[0] || null);
    }
    setCurrentStep(1); // Move to the next step after selecting a service
  };

  const handleStaffSelect = (staff: Staff) => {
    updateStaff(staff);
    setCurrentStep(2); // Move to the next step after selecting staff
  };

  const handleDateSelect = (date: string) => {
    updateDateTime(date, '');
  };

  const handleTimeSelect = (time: string) => {
    updateDateTime(bookingData.date, time);
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Create booking via API
      const serviceId = bookingData.service!.id || bookingData.service!._id;
      const staffId = bookingData.staff!.id || bookingData.staff!._id;
      
      if (!serviceId || !staffId) {
        throw new Error('Missing service or staff ID');
      }
      
      const bookingPayload = {
        serviceId,
        staffId,
        customerName: bookingData.customer.name,
        customerEmail: bookingData.customer.email,
        customerPhone: bookingData.customer.phone,
        date: bookingData.date,
        time: bookingData.time,
        notes: bookingData.customer.notes
      };
      
      const newBooking = await bookingAPI.createBooking(bookingPayload);
      
      // Store booking data for success page
      localStorage.setItem('lastBooking', JSON.stringify({
        ...bookingData,
        id: newBooking.id || newBooking._id
      }));
      
      navigate('/booking-success');
    } catch (error) {
      console.error('Error creating booking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to create booking: ${errorMessage}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking system...</p>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choose Your Service
              </h2>
              <p className="text-gray-600">
                Select the service you'd like to book
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.id || (service as any)._id}
                  service={service}
                  onSelect={handleServiceSelect}
                  isSelected={bookingData.service?.id === service.id}
                />
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Your Specialist
              </h2>
              <p className="text-gray-600">
                Choose from our qualified staff members
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {availableStaff.map((member) => (
                <StaffCard
                  key={member.id || (member as any)._id}
                  staff={member}
                  onSelect={handleStaffSelect}
                  isSelected={bookingData.staff?.id === member.id}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Pick Your Date & Time
              </h2>
              <p className="text-gray-600">
                Select your preferred appointment date and time
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Calendar
                selectedDate={bookingData.date}
                onDateSelect={handleDateSelect}
                minDate={new Date().toISOString().split('T')[0]}
              />
              
              {bookingData.date && (
                <TimeSlots
                  timeSlots={timeSlots}
                  selectedTime={bookingData.time}
                  onTimeSelect={handleTimeSelect}
                />
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Complete Your Booking
              </h2>
              <p className="text-gray-600">
                Please provide your contact information
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <CustomerForm
                customer={bookingData.customer}
                onCustomerUpdate={updateCustomer}
                onSubmit={handleBookingSubmit}
                isSubmitting={isSubmitting}
              />
              
              <BookingSummary bookingData={bookingData} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookingProgress
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />
        
        <div className="mb-8">
          {renderStepContent()}
        </div>
        
        {currentStep < 3 && (
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-8 py-4 text-gray-600 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg disabled:transform-none"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
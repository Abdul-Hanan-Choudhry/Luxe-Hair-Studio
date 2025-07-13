export interface Service {
  id: string;
  _id?: string; // MongoDB ID
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  image?: string;
}

export interface Staff {
  id: string;
  _id?: string; // MongoDB ID
  name: string;
  title: string;
  avatar?: string;
  services: string[]; // service IDs
  workingHours: WorkingHours;
}

export interface WorkingHours {
  [key: string]: {
    start: string;
    end: string;
    isWorking: boolean;
  };
}

export interface Booking {
  id: string;
  _id?: string; // MongoDB ID
  serviceId: string;
  staffId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  staffId?: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingFormData {
  service: Service | null;
  staff: Staff | null;
  date: string;
  time: string;
  customer: Customer;
}

export interface AdminUser {
  id: string;
  _id?: string; // MongoDB ID
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
}

export interface BookingStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  todayBookings: number;
  revenue: number;
}
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// API utility functions
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    credentials: 'include', // Always include credentials for CORS
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Clear invalid token and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminUser');
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Booking API
export const bookingAPI = {
  // Get all bookings with filters
  getBookings: (filters: any = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });
    return apiRequest(`/bookings?${params}`);
  },

  // Get booking statistics
  getStats: () => apiRequest('/bookings/stats'),

  // Create new booking
  createBooking: (bookingData: any) => 
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),

  // Update booking
  updateBooking: (id: string, updates: any) =>
    apiRequest(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  // Delete booking
  deleteBooking: (id: string) =>
    apiRequest(`/bookings/${id}`, {
      method: 'DELETE',
    }),

  // Get available time slots
  getAvailableSlots: (staffId: string, date: string, duration?: number) => {
    const params = new URLSearchParams();
    if (duration) params.append('duration', String(duration));
    return apiRequest(`/bookings/available-slots/${staffId}/${date}?${params}`);
  },
};

// Services API
export const servicesAPI = {
  // Get all services
  getServices: (filters: any = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });
    return apiRequest(`/services?${params}`);
  },

  // Get service by ID
  getService: (id: string) => apiRequest(`/services/${id}`),

  // Create service (admin only)
  createService: (serviceData: any) =>
    apiRequest('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    }),

  // Update service (admin only)
  updateService: (id: string, updates: any) =>
    apiRequest(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  // Delete service (admin only)
  deleteService: (id: string) =>
    apiRequest(`/services/${id}`, {
      method: 'DELETE',
    }),
};

// Staff API
export const staffAPI = {
  // Get all staff
  getStaff: (filters: any = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });
    return apiRequest(`/staff?${params}`);
  },

  // Get staff by ID
  getStaffMember: (id: string) => apiRequest(`/staff/${id}`),

  // Create staff member (admin only)
  createStaff: (staffData: any) =>
    apiRequest('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData),
    }),

  // Update staff member (admin only)
  updateStaff: (id: string, updates: any) =>
    apiRequest(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  // Delete staff member (admin only)
  deleteStaff: (id: string) =>
    apiRequest(`/staff/${id}`, {
      method: 'DELETE',
    }),
};

// Auth API
export const authAPI = {
  // Login
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Register
  register: (userData: { name: string; email: string; password: string; role?: string }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Get current user
  getCurrentUser: () => apiRequest('/auth/me'),
};

// Email API
export const emailAPI = {
  // Send test email
  sendTestEmail: () =>
    apiRequest('/email/test', {
      method: 'POST',
    }),

  // Resend booking confirmation
  resendConfirmation: (bookingId: string) =>
    apiRequest(`/email/resend-confirmation/${bookingId}`, {
      method: 'POST',
    }),

  // Send booking update
  sendUpdate: (bookingId: string) =>
    apiRequest(`/email/send-update/${bookingId}`, {
      method: 'POST',
    }),
};

// Health check
export const healthCheck = () => apiRequest('/health');
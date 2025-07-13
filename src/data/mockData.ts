import { Service, Staff, Booking } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Signature Cut & Style',
    description: 'Precision haircut with personalized styling consultation and luxury finish',
    duration: 90,
    price: 125,
    category: 'Hair Design',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Color Transformation',
    description: 'Complete color makeover with premium Olaplex treatment and gloss finish',
    duration: 180,
    price: 285,
    category: 'Color Services',
    image: 'https://images.pexels.com/photos/3993465/pexels-photo-3993465.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Balayage Highlights',
    description: 'Hand-painted highlights for natural, sun-kissed dimension',
    duration: 150,
    price: 225,
    category: 'Color Services',
    image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Keratin Treatment',
    description: 'Smoothing treatment for frizz-free, manageable hair for up to 4 months',
    duration: 120,
    price: 195,
    category: 'Hair Treatments',
    image: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    name: 'Bridal Hair & Makeup',
    description: 'Complete bridal beauty package with trial session included',
    duration: 240,
    price: 450,
    category: 'Special Occasions',
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    name: 'Hair Extensions',
    description: 'Premium tape-in or clip-in extensions for length and volume',
    duration: 120,
    price: 350,
    category: 'Extensions',
    image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '7',
    name: 'Deep Conditioning Treatment',
    description: 'Intensive moisture therapy with scalp massage and steam treatment',
    duration: 60,
    price: 85,
    category: 'Hair Treatments',
    image: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '8',
    name: 'Men\'s Cut & Style',
    description: 'Modern men\'s haircut with beard trim and styling',
    duration: 45,
    price: 65,
    category: 'Men\'s Services',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const staff: Staff[] = [
  {
    id: '1',
    name: 'Isabella Martinez',
    title: 'Master Colorist & Creative Director',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['1', '2', '3', '5'],
    workingHours: {
      monday: { start: '09:00', end: '18:00', isWorking: true },
      tuesday: { start: '09:00', end: '18:00', isWorking: true },
      wednesday: { start: '09:00', end: '18:00', isWorking: true },
      thursday: { start: '09:00', end: '18:00', isWorking: true },
      friday: { start: '09:00', end: '18:00', isWorking: true },
      saturday: { start: '08:00', end: '17:00', isWorking: true },
      sunday: { start: '10:00', end: '16:00', isWorking: false }
    }
  },
  {
    id: '2',
    name: 'Sophia Chen',
    title: 'Senior Stylist & Extension Specialist',
    avatar: 'https://images.pexels.com/photos/3992679/pexels-photo-3992679.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['1', '4', '6', '7'],
    workingHours: {
      monday: { start: '10:00', end: '19:00', isWorking: true },
      tuesday: { start: '10:00', end: '19:00', isWorking: true },
      wednesday: { start: '10:00', end: '19:00', isWorking: true },
      thursday: { start: '10:00', end: '19:00', isWorking: true },
      friday: { start: '10:00', end: '19:00', isWorking: true },
      saturday: { start: '09:00', end: '18:00', isWorking: true },
      sunday: { start: '11:00', end: '17:00', isWorking: false }
    }
  },
  {
    id: '3',
    name: 'Aria Thompson',
    title: 'Bridal & Special Events Specialist',
    avatar: 'https://images.pexels.com/photos/3992640/pexels-photo-3992640.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['1', '5', '7'],
    workingHours: {
      monday: { start: '09:00', end: '17:00', isWorking: true },
      tuesday: { start: '09:00', end: '17:00', isWorking: true },
      wednesday: { start: '09:00', end: '17:00', isWorking: true },
      thursday: { start: '09:00', end: '17:00', isWorking: true },
      friday: { start: '09:00', end: '17:00', isWorking: true },
      saturday: { start: '08:00', end: '18:00', isWorking: true },
      sunday: { start: '10:00', end: '16:00', isWorking: true }
    }
  },
  {
    id: '4',
    name: 'Marcus Rodriguez',
    title: 'Men\'s Grooming Specialist',
    avatar: 'https://images.pexels.com/photos/3992663/pexels-photo-3992663.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['8', '1'],
    workingHours: {
      monday: { start: '08:00', end: '16:00', isWorking: true },
      tuesday: { start: '08:00', end: '16:00', isWorking: true },
      wednesday: { start: '08:00', end: '16:00', isWorking: true },
      thursday: { start: '08:00', end: '16:00', isWorking: true },
      friday: { start: '08:00', end: '16:00', isWorking: true },
      saturday: { start: '09:00', end: '17:00', isWorking: true },
      sunday: { start: '10:00', end: '15:00', isWorking: false }
    }
  }
];

export const bookings: Booking[] = [
  {
    id: '1',
    serviceId: '1',
    staffId: '1',
    customerName: 'Emma Williams',
    customerEmail: 'emma@email.com',
    customerPhone: '(555) 123-4567',
    date: '2025-01-15',
    time: '10:00',
    status: 'confirmed',
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: '2',
    serviceId: '2',
    staffId: '1',
    customerName: 'Olivia Johnson',
    customerEmail: 'olivia@email.com',
    customerPhone: '(555) 234-5678',
    date: '2025-01-16',
    time: '14:00',
    status: 'confirmed',
    createdAt: '2025-01-11T14:00:00Z'
  },
  {
    id: '3',
    serviceId: '5',
    staffId: '3',
    customerName: 'Ava Davis',
    customerEmail: 'ava@email.com',
    customerPhone: '(555) 345-6789',
    date: '2025-01-17',
    time: '11:00',
    status: 'pending',
    createdAt: '2025-01-12T11:00:00Z'
  }
]
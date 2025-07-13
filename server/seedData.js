import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Staff from './models/Staff.js';
import User from './models/User.js';
dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxe-hair-studio');
    
    console.log('🌱 Seeding database...');
    
    // Clear existing data
    await Promise.all([
      Service.deleteMany({}),
      Staff.deleteMany({}),
      User.deleteMany({})
    ]);
    
    // Seed Services
    const services = await Service.insertMany([
      {
        name: 'Signature Cut & Style',
        description: 'Precision haircut with personalized styling consultation and luxury finish',
        duration: 90,
        price: 125,
        category: 'Hair Design',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Color Transformation',
        description: 'Complete color makeover with premium Olaplex treatment and gloss finish',
        duration: 180,
        price: 285,
        category: 'Color Services',
        image: 'https://images.pexels.com/photos/3993465/pexels-photo-3993465.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Balayage Highlights',
        description: 'Hand-painted highlights for natural, sun-kissed dimension',
        duration: 150,
        price: 225,
        category: 'Color Services',
        image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Keratin Treatment',
        description: 'Smoothing treatment for frizz-free, manageable hair for up to 4 months',
        duration: 120,
        price: 195,
        category: 'Hair Treatments',
        image: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Bridal Hair & Makeup',
        description: 'Complete bridal beauty package with trial session included',
        duration: 240,
        price: 450,
        category: 'Special Occasions',
        image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Hair Extensions',
        description: 'Premium tape-in or clip-in extensions for length and volume',
        duration: 120,
        price: 350,
        category: 'Extensions',
        image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Deep Conditioning Treatment',
        description: 'Intensive moisture therapy with scalp massage and steam treatment',
        duration: 60,
        price: 85,
        category: 'Hair Treatments',
        image: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Men\'s Cut & Style',
        description: 'Modern men\'s haircut with beard trim and styling',
        duration: 45,
        price: 65,
        category: 'Men\'s Services',
        image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]);
    
    // Seed Staff
    const staff = await Staff.insertMany([
      {
        name: 'Isabella Martinez',
        title: 'Master Colorist & Creative Director',
        email: 'isabella@luxehairstudio.com',
        phone: '(555) 123-4567',
        avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
        services: [services[0]._id, services[1]._id, services[2]._id, services[4]._id],
        workingHours: {
          monday: { start: '09:00', end: '18:00', isWorking: true },
          tuesday: { start: '09:00', end: '18:00', isWorking: true },
          wednesday: { start: '09:00', end: '18:00', isWorking: true },
          thursday: { start: '09:00', end: '18:00', isWorking: true },
          friday: { start: '09:00', end: '18:00', isWorking: true },
          saturday: { start: '08:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        specialties: ['Color Correction', 'Balayage', 'Creative Color'],
        experience: 15
      },
      {
        name: 'Sophia Chen',
        title: 'Senior Stylist & Extension Specialist',
        email: 'sophia@luxehairstudio.com',
        phone: '(555) 234-5678',
        avatar: 'https://images.pexels.com/photos/3992679/pexels-photo-3992679.jpeg?auto=compress&cs=tinysrgb&w=400',
        services: [services[0]._id, services[3]._id, services[5]._id, services[6]._id],
        workingHours: {
          monday: { start: '10:00', end: '19:00', isWorking: true },
          tuesday: { start: '10:00', end: '19:00', isWorking: true },
          wednesday: { start: '10:00', end: '19:00', isWorking: true },
          thursday: { start: '10:00', end: '19:00', isWorking: true },
          friday: { start: '10:00', end: '19:00', isWorking: true },
          saturday: { start: '09:00', end: '18:00', isWorking: true },
          sunday: { start: '11:00', end: '17:00', isWorking: false }
        },
        specialties: ['Extensions', 'Hair Treatments', 'Precision Cuts'],
        experience: 12
      },
      {
        name: 'Aria Thompson',
        title: 'Bridal & Special Events Specialist',
        email: 'aria@luxehairstudio.com',
        phone: '(555) 345-6789',
        avatar: 'https://images.pexels.com/photos/3992640/pexels-photo-3992640.jpeg?auto=compress&cs=tinysrgb&w=400',
        services: [services[0]._id, services[4]._id, services[6]._id],
        workingHours: {
          monday: { start: '09:00', end: '17:00', isWorking: true },
          tuesday: { start: '09:00', end: '17:00', isWorking: true },
          wednesday: { start: '09:00', end: '17:00', isWorking: true },
          thursday: { start: '09:00', end: '17:00', isWorking: true },
          friday: { start: '09:00', end: '17:00', isWorking: true },
          saturday: { start: '08:00', end: '18:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: true }
        },
        specialties: ['Bridal Hair', 'Updos', 'Special Events'],
        experience: 10
      },
      {
        name: 'Marcus Rodriguez',
        title: 'Men\'s Grooming Specialist',
        email: 'marcus@luxehairstudio.com',
        phone: '(555) 456-7890',
        avatar: 'https://images.pexels.com/photos/3992663/pexels-photo-3992663.jpeg?auto=compress&cs=tinysrgb&w=400',
        services: [services[7]._id, services[0]._id],
        workingHours: {
          monday: { start: '08:00', end: '16:00', isWorking: true },
          tuesday: { start: '08:00', end: '16:00', isWorking: true },
          wednesday: { start: '08:00', end: '16:00', isWorking: true },
          thursday: { start: '08:00', end: '16:00', isWorking: true },
          friday: { start: '08:00', end: '16:00', isWorking: true },
          saturday: { start: '09:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '15:00', isWorking: false }
        },
        specialties: ['Men\'s Cuts', 'Beard Styling', 'Classic Grooming'],
        experience: 8
      }
    ]);
    
    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@luxehairstudio.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    
    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${services.length} services`);
    console.log(`👥 Created ${staff.length} staff members`);
    console.log(`🔐 Created admin user: admin@luxehairstudio.com / admin123`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
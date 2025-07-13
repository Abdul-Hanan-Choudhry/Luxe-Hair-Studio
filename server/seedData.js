import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const seedData = async () => {
  try {
    await client.connect();
    const db = client.db('luxe-hair-studio');
    console.log('🌱 Seeding database...');

    // Clear existing data
    await Promise.all([
      db.collection('services').deleteMany({}),
      db.collection('staff').deleteMany({}),
      db.collection('users').deleteMany({}),
      db.collection('bookings').deleteMany({})
    ]);

    // Seed Services
    const services = [
      {
        name: 'Signature Cut & Style',
        description: 'Precision haircut with personalized styling consultation and luxury finish',
        duration: 90,
        price: 125,
        category: 'Hair Design',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Color Transformation',
        description: 'Complete color makeover with premium Olaplex treatment and gloss finish',
        duration: 180,
        price: 285,
        category: 'Color Services',
        image: 'https://images.pexels.com/photos/3993465/pexels-photo-3993465.jpeg?auto=compress&cs=tinysrgb&w=800',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Balayage Highlights',
        description: 'Hand-painted highlights for natural, sun-kissed dimension',
        duration: 150,
        price: 225,
        category: 'Color Services',
        image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Keratin Treatment',
        description: 'Smoothing treatment for frizz-free, manageable hair for up to 4 months',
        duration: 120,
        price: 195,
        category: 'Hair Treatments',
        image: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=800',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bridal Hair & Makeup',
        description: 'Complete bridal beauty package with trial session included',
        duration: 240,
        price: 450,
        category: 'Special Occasions',
        image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hair Extensions',
        description: 'Premium tape-in or clip-in extensions for length and volume',
        duration: 120,
        price: 350,
        category: 'Extensions',
        image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=800',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Deep Conditioning Treatment',
        description: 'Intensive moisture therapy with scalp massage and steam treatment',
        duration: 60,
        price: 85,
        category: 'Hair Treatments',
        image: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=800',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Men\'s Cut & Style',
        description: 'Modern men\'s haircut with beard trim and styling',
        duration: 45,
        price: 65,
        category: 'Men\'s Services',
        image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    const servicesResult = await db.collection('services').insertMany(services);

    // Seed Staff
    const staff = [
      {
        name: 'Isabella Martinez',
        title: 'Master Colorist & Creative Director',
        email: 'isabella@luxehairstudio.com',
        phone: '(555) 123-4567',
        avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
        services: [servicesResult.insertedIds[0], servicesResult.insertedIds[1], servicesResult.insertedIds[2], servicesResult.insertedIds[4]],
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
        experience: 15,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sophia Chen',
        title: 'Senior Stylist & Extension Specialist',
        email: 'sophia@luxehairstudio.com',
        phone: '(555) 234-5678',
        avatar: 'https://images.pexels.com/photos/3992679/pexels-photo-3992679.jpeg?auto=compress&cs=tinysrgb&w=400',
        services: [servicesResult.insertedIds[0], servicesResult.insertedIds[3], servicesResult.insertedIds[5], servicesResult.insertedIds[6]],
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
        experience: 12,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aria Thompson',
        title: 'Bridal & Special Events Specialist',
        email: 'aria@luxehairstudio.com',
        phone: '(555) 345-6789',
        avatar: 'https://images.pexels.com/photos/3992640/pexels-photo-3992640.jpeg?auto=compress&cs=tinysrgb&w=400',
        services: [servicesResult.insertedIds[0], servicesResult.insertedIds[4], servicesResult.insertedIds[6]],
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
        experience: 10,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Marcus Rodriguez',
        title: 'Men\'s Grooming Specialist',
        email: 'marcus@luxehairstudio.com',
        phone: '(555) 456-7890',
        avatar: 'https://images.pexels.com/photos/3992663/pexels-photo-3992663.jpeg?auto=compress&cs=tinysrgb&w=400',
        services: [servicesResult.insertedIds[7], servicesResult.insertedIds[0]],
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
        experience: 8,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    const staffResult = await db.collection('staff').insertMany(staff);

    // Create admin user
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const adminUser = {
      name: 'Admin User',
      email: 'admin@luxehairstudio.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await db.collection('users').insertOne(adminUser);

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
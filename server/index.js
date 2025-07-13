import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import serviceRoutes from './routes/services.js';
import staffRoutes from './routes/staff.js';
import emailRoutes from './routes/email.js';

const app = express();

// MongoDB Connection
let db;
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb+srv://abdulhananch404:Abdul%40123@cluster0.edajo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
    
    // Get the database instance
    db = client.db("luxe-hair-studio");
    
    // Make db available globally
    app.locals.db = db;
    
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Check your MONGODB_URI in .env file');
    console.log('💡 Make sure your MongoDB Atlas cluster is accessible');
    console.log('💡 Verify your username, password, and database name');
    
    // Don't exit the process, let it continue without database
    console.log('⚠️  Server will continue without database connection');
  }
};

// Security middleware
app.use(helmet());

// Set permissive Referrer-Policy and Content-Security-Policy for images
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' https://images.pexels.com data:; script-src 'self'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Rate limiting
if (process.env.NODE_ENV === 'production') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
}

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || '*'); // Reflect the request origin
  },
  credentials: true
}));

// If you have issues with preflight requests, add:
app.options('*', cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/email', emailRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: db ? 'Connected' : 'Not Connected'
  });
});

// Serve static files from the frontend build
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../dist')));

// Serve index.html for all non-API routes (for client-side routing)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service configured with: ${process.env.EMAIL_USER}`);
});
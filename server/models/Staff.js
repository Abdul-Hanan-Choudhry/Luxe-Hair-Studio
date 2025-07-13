import mongoose from 'mongoose';

const workingHoursSchema = new mongoose.Schema({
  start: String,
  end: String,
  isWorking: Boolean
}, { _id: false });

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  workingHours: {
    monday: workingHoursSchema,
    tuesday: workingHoursSchema,
    wednesday: workingHoursSchema,
    thursday: workingHoursSchema,
    friday: workingHoursSchema,
    saturday: workingHoursSchema,
    sunday: workingHoursSchema
  },
  isActive: {
    type: Boolean,
    default: true
  },
  specialties: [String],
  experience: {
    type: Number, // years
    default: 0
  }
}, {
  timestamps: true
});

const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
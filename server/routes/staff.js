import express from 'express';
import Staff from '../models/Staff.js';
const router = express.Router();

// Get all staff
router.get('/', async (req, res) => {
  try {
    const { serviceId, isActive } = req.query;
    
    let query = {};
    if (isActive !== undefined && isActive !== 'all') query.isActive = isActive === 'true';
    if (serviceId) query.services = serviceId;
    
    const staff = await Staff.find(query)
      .populate('services', 'name category')
      .sort({ name: 1 });
    
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error: error.message });
  }
});

// Get staff by ID
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate('services');
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff member', error: error.message });
  }
});

// Create new staff member (admin only)
router.post('/', async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    await staff.populate('services');
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error creating staff member', error: error.message });
  }
});

// Update staff member (admin only)
router.put('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('services');
    
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff member', error: error.message });
  }
});

// Delete staff member (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    
    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff member', error: error.message });
  }
});

export default router;
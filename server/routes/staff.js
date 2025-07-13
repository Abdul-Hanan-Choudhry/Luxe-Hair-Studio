import express from 'express';
const router = express.Router();

// Get all staff
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { serviceId, isActive } = req.query;
    let query = {};
    if (isActive !== undefined && isActive !== 'all') query.isActive = isActive === 'true';
    if (serviceId) query.services = serviceId;
    const staff = await db.collection('staff').find(query).sort({ name: 1 }).toArray();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error: error.message });
  }
});

// Get staff by ID
router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const staff = await db.collection('staff').findOne({ _id: req.params.id });
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
    const db = req.app.locals.db;
    const staff = req.body;
    staff.createdAt = new Date();
    staff.updatedAt = new Date();
    const result = await db.collection('staff').insertOne(staff);
    res.status(201).json({ ...staff, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating staff member', error: error.message });
  }
});

// Update staff member (admin only)
router.put('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const staff = await db.collection('staff').findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    
    if (!staff.value) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    
    res.json(staff.value);
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff member', error: error.message });
  }
});

// Delete staff member (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const staff = await db.collection('staff').findOneAndDelete({ _id: req.params.id });
    
    if (!staff.value) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    
    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff member', error: error.message });
  }
});

export default router;
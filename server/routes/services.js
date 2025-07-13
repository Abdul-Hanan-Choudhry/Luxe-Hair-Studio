import express from 'express';
const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { category, isActive } = req.query;
    let query = {};
    if (category) query.category = category;
    if (isActive !== undefined && isActive !== 'all') query.isActive = isActive === 'true';
    const services = await db.collection('services').find(query).sort({ category: 1, name: 1 }).toArray();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const service = await db.collection('services').findOne({ _id: req.params.id });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
});

// Create new service (admin only)
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const service = req.body;
    service.createdAt = new Date();
    service.updatedAt = new Date();
    const result = await db.collection('services').insertOne(service);
    res.status(201).json({ ...service, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
});

// Update service (admin only)
router.put('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const service = req.body;
    service.updatedAt = new Date();
    const result = await db.collection('services').findOneAndUpdate(
      { _id: req.params.id },
      { $set: service },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(result.value);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});

// Delete service (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const result = await db.collection('services').findOneAndDelete({ _id: req.params.id });
    
    if (!result.value) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

export default router;
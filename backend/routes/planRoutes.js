const express = require('express');
const router = express.Router();
const { 
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
} = require('../controllers/planController');

const { protect, admin } = require('../middleware/authMiddleware');

// Public routes (no authentication needed for viewing plans)
router.get('/', getPlans);
router.get('/:id', getPlanById);

// Protected admin routes
router.post('/', protect, admin, createPlan);
router.put('/:id', protect, admin, updatePlan);
router.delete('/:id', protect, admin, deletePlan);

module.exports = router;

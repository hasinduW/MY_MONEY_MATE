const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  cancelSubscription
} = require('../controllers/subscriptionController');

router.route('/')
  .post(protect, createSubscription)
  .get(protect, getSubscriptions);

router.route('/:id')
  .get(protect, getSubscriptionById)
  .put(protect, updateSubscription)
  .delete(protect, cancelSubscription);

module.exports = router;
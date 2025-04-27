const Subscription = require('../models/subscription');

// @desc    Create new subscription
// @route   POST /api/subscribe
// @access  Private
const createSubscription = async (req, res) => {
  try {
    const subscription = new Subscription({
      user: req.user._id,
      ...req.body
    });

    const createdSubscription = await subscription.save();
    res.status(201).json(createdSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all subscriptions
// @route   GET /api/subscribe
// @access  Private
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscriptionById = async (req, res) => {
    try {
      const subscription = await Subscription.findOne({
        _id: req.params.id,
        user: req.user._id
      });
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // @desc    Update subscription
  // @route   PUT /api/subscribe/:id
  // @access  Private
  const updateSubscription = async (req, res) => {
    try {
      const subscription = await Subscription.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id
        },
        req.body,
        { new: true }
      );
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // @desc    Cancel subscription
  // @route   DELETE /api/subscribe/:id
  // @access  Private
  const cancelSubscription = async (req, res) => {
    try {
      const subscription = await Subscription.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id
        },
        { status: 'cancelled' },
        { new: true }
      );
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      res.json({ message: 'Subscription cancelled', subscription });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Add other controller methods (getSubscriptionById, updateSubscription, cancelSubscription)

module.exports = {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  cancelSubscription
};
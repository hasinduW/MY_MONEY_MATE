const { protect } = require('../middleware/authMiddleware');
const Subscription = require('../models/subscription');
const router = require('../routes/subscriptionRoutes');

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

// subscriptionController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { priceID } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceID,
        quantity: 1,
      }],
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
};

//router.post('/create-checkout-session',protect, createCheckoutSession);

module.exports = {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  cancelSubscription
};
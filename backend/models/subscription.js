// backend/models/Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Plan'
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  paymentMethod: String,
  transactionId: String
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
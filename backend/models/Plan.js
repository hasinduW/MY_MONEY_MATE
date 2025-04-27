import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  decimal: { type: String },
  discount: { type: Number },
  features: [{ type: String }],
  users: { type: String },
  billingPeriod: {
    type: String,
    enum: ['monthly', 'annually'],
    default: 'monthly'
  },
  annualPrice: {
    type: Number
  },
  annualDiscount: {
    type: Number
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  userLimit: {
    type: Number,
    default: 1
  }
}, { timestamps: true });


export default  mongoose.model('Plan', planSchema);
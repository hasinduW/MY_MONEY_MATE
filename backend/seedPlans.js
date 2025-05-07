import Plan from './models/Plan.js';
import dotenv from 'dotenv';

dotenv.config();

const mongoose = await import('mongoose');
await mongoose.connect(process.env.MONGO_URI);

const plans = [
  {
    name: 'Simple Start',
    price: 49,
    decimal: '70',
    discount: 14,
    discountedPrice: 56,
    discountText: 'Save US$14/mo for 3 months',
    features: [
      'Track income & expenses',
      'Send unlimited invoices',
      'Connect your bank',
      'Track GST and VAT',
      'Insights & reports',
      'Progress invoicing',
      
    ],
    users: 'For one user, plus your accountant',
    annualPrice:205,
    annualDiscount: 103,
    isPopular: true,
    billingCycle: 'monthly', // Added new field
    trialPeriod: '30-day free trial' // Added new fiel
  },
  // Add other plans similarly
];

const seedPlans = async () => {
  try{
    await Plan.deleteMany();
    await Plan.insertMany(plans);
    console.log('Plans seeded!');
    process.exit(0);
  }catch(error){
  console.error('Error seeding plans:',error);
  process.exit(1);
  }
};

seedPlans();
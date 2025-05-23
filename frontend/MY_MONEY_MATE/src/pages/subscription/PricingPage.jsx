import React, { useEffect, useState } from 'react';
import PricingCard from "../../components/PricingCard.jsx";
import { getPlans } from "../../utils/api.js";
import '../../styles/pricing.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../utils/apiPaths.js";

const PricingPage = () => {
  
  const [plans, setPlans] = useState([{
      name: "Simple ",
      price: "9",
      decimal: "50",
      discount: "10",
      priceID:"price_1RLoaH2cJaDtHw4WkfTf1PmQ",
      features: [
        "Track income & expenses",
        "Send unlimited custom invoices & quotes",
        "Connect your bank",
        "Track GST and VAT",
        "Insights & reports",
        "Progress invoicing"
      ],
    },
    {
      name: "Pro",
      price: "14",
      decimal: "80",
      discount: "14",
      priceID: "price_1RLoke2cJaDtHw4WtLSTFhGp",
      features: [
        "Track income & expenses",
        "Send unlimited custom invoices & quotes",
        "Connect your bank",
        "Track GST and VAT",
        "Insights & reports",
        "Progress invoicing",
        "Manage bills & payments",
        "Multi-currency"
      ],
      
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSelectedPlan = (plan) => {
    navigate('/checkout', { state: { selectedPlan: plan } });
  };

  /*if (loading) return <div>Loading...</div>;*/
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="side-by-side-pricing-container">
      <h1 className="pricing-header">Find Your Perfect Financial Plan</h1>

      <div className="side-by-side-cards">
      {plans.map((plan) => (
        <PricingCard 
        key={plan.name} 
        plan={plan}
        onSelectPlan={handleSelectedPlan}
        showDiscountDuration = {true} />
      ))}
      </div>
    </div>
  );
};

export default PricingPage;
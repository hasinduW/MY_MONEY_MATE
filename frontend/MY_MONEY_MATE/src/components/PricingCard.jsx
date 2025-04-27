import React from 'react';
//import PropTypes from 'prop-types';
import '../styles/pricing.css';
import {useNavigate} from 'react-router-dom';

const PricingCard = ({ plan, onSelectPlan}) => {
  const navigate = useNavigate();

  const handleSelectPlan = () =>{
    navigate('/subscription/checkout',{ state: { selectedPlan:plan}});
  }

  return (
    <div className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
      {plan.isPopular && <div className="popular- badge">Most popular</div>}
      
      <h3 className="plan-name">{plan.name}</h3>
      
      <div className="price-display">
        <span className="currency">US$</span>
        <span className="price">{plan.price}</span>
        <span className="decimal">{plan.decimal}</span>
        <span className="period">/mo</span>
      </div>
    
      {plan.discount && (
        <p className="discount">Save US${plan.discount}/mo for 3 months</p>
      )}
      
      <button className="select-btn" onClick={() =>handleSelectPlan(plan)}>
           Select plan
      </button>

      <p className="trial">Start a free 30-day trial</p>
      
      <ul className="features-list">
        {plan.features.map((feature, index) => (
          <li key={index}>
            <span className="tick">✓</span> {feature}
          </li>
        ))}
      </ul>
      
      {plan.users && <p className="users">{plan.users}</p>}
    </div>
  );
};

export default PricingCard;
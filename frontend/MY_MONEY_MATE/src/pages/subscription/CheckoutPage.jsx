import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../styles/pricing.css';
const BASE_URL = "http://localhost:8000";  

//const [isLoading, setIsLoading] = useState(false);

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [businessLocation, setBusinessLocation] = useState('');

  const plans = {
    simple: {
      name: "Simple ",
      features: [
        "Track income & expenses",
        "Send unlimited custom invoices & quotes",
        "Connect your bank",
        "Track GST and VAT",
        "Insights & reports",
        "Progress invoicing"
      ],
      price: 9.50,
      priceId: 'price_1RLoaH2cJaDtHw4WkfTf1PmQ',
      annualPriceId : 'price_1RMLWO2cJaDtHw4W2shzQLda',
      discountedPrice: 19,
      annualPrice: 102.50,
      annualDiscount: 103.00,
      discountText: "You're saving US$28.50"
    },
    pro: {
      name: "Pro",
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
      price: 28.80,
      priceId :'price_1RLoke2cJaDtHw4WtLSTFhGp',
      annualPriceId : 'price_1RMLYY2cJaDtHw4WoT13zm72',
      discountedPrice: 28.80, 
      annualPrice: 345.60,   
      annualDiscount: 157.00, 
      discountText: "You're saving US$42"
    }
  };

  const selectedPlan = state?.selectedPlan ? plans[state.selectedPlan.name.toLowerCase()] || plans.simple : plans.simple;  const [billingPeriod, setBillingPeriod] = useState('monthly');


  if (!selectedPlan) {
    return <div>No plan selected. Please go back and select a plan.</div>;
  }
      
  const handleSubscribe = async ()=>{
    console.log("handleSubscribe clicked");
    if (!businessLocation.trim()) {
      setError("Please enter your business location");
      //return;
    }
    setIsLoading(true);
    setError(null);
    console.log("start try");
    try{
      const priceID = billingPeriod === 'monthly' ? 
        selectedPlan.priceId : 
        selectedPlan.annualPriceId;

      const response = await fetch ("http://localhost:8000/create-checkout-session",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({priceID:priceID})
      })
      if (!response.ok) {
        console.log('not ok');
        throw new Error('Failed to create checkout session');
      }
      const {url} = await response.json();
      console.log(url);
      window.location.href =  url;
    }
    catch(error){
      setError('Failed to proceed to payment. Please try again.');
      console.log("Error:",error);

    }
    finally{
      setIsLoading(false);
    }
  }

  {/*const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and payment processing
    console.log({
      plan: selectedPlan.name,
      billingPeriod,
      businessLocation
    });
  };*/}

  return (
    <div className="checkout-container">
      <h1 className="checkout-header">Choose a plan to suit your business</h1>

      <div className="checkout-content">
        <div className="left-section">
        
        <div className="summary-section">
         <h3>Summary</h3>
            <div className="benefits-inline">
            <div className="benefit-item-inline">
            <span className="check-icon">✓</span>
            <span>Unlimited support</span>
        </div>
        <div className="benefit-item-inline">
          <span className="check-icon">✓</span>
          <span>No annual contract</span>
        </div>
        <div className="benefit-item-inline">
          <span className="check-icon">✓</span>
          <span>Cancel anytime</span>
        </div>
        </div>
      </div>

          <div className="business-info">
            <div className="form-group">
              <label>Your business location</label>
              <div className="input-with-info">
               <input
                  type="text"
                  value={businessLocation}
                  onChange={(e) => setBusinessLocation(e.target.value)}
                  required
                  placeholder="eg: Sri Lanka"
                />
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
      
            <div className="subscription-section">
              <div className="subscription-header">
               <label>Your subscription</label>
                
            </div>

            <div className="subscription-box">
             <div className="subscription-left">
              <input type="radio" name="subscription" checked readOnly />
              <span className="buy-now-text">Buy now</span>
           </div>
          <div className="subscription-right">
            <span className="limited-offer">LIMITED OFFER</span>
            <div className="discount-details">
            <strong>50% off for 3 months</strong>
            <div className="small-text">plus free guided setup</div>
         </div>
       </div>
      </div>
    </div>

          </div>

          <div className="billing-section">
            <h4>Billing period</h4>
            <div className="billing-options">
              <div
                className={`billing-option ${billingPeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                <div className="option-header">
                  <span className="option-title">Monthly</span>
                  <span className="option-price">US${selectedPlan.discountedPrice}/mo</span>
                </div>
                <div className="option-savings">{selectedPlan.discountText}</div>
              </div>
              <div
                className={`billing-option ${billingPeriod === 'annually' ? 'active' : ''}`}
                onClick={() => setBillingPeriod('annually')}
              >
                <div className="option-header">
                  <span className="option-title">Annually</span>
                  <span className="option-price">US${selectedPlan.annualPrice}/yr</span>
                </div>
                <div className="option-savings">You're saving US${selectedPlan.annualDiscount}</div>
              </div>
            </div>

            <div className="offer-banner">
              <p><strong>70% off for 3 months</strong> plus free guided setup</p>
            </div>
          </div>

          <div className="plan-features-mobile">
            
            
          </div>
        </div>

        <div className="right-section">
          <div className="plan-summary">
            <h3>Your QuickBooks plan</h3>
            <div className="selected-plan">
              <h4>{selectedPlan.name}</h4>
              <ul>
                {selectedPlan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="price-summary">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>US${billingPeriod === 'monthly' ? selectedPlan.discountedPrice : selectedPlan.annualPrice}</span>
            </div>
            <button type="button" className="continue-btn" onClick={() => handleSubscribe()}
              // disabled={isLoading || !businessLocation.trim()}
              >
                {isLoading ? "Processing..." : "Continue"} 

                  
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
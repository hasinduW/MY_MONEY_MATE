import React from 'react';
import '../../styles/PaymentSuccess.css'; // We'll create this for styling

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="payment-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="48px" height="48px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h1 className="payment-success-title">Payment Successful!</h1>
        <p className="payment-success-message">
          Thank you for your subscription. You now have access<br />
          to all the amazing features!
        </p>
        <button className="payment-success-button">
          Back to Main
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
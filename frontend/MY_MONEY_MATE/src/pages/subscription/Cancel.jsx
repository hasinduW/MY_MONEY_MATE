import React from 'react';
import '../../styles/PaymentCancelled.css';

const PaymentCancelled = () => {
  return (
    <div className="payment-cancelled-container">
      <div className="payment-cancelled-card">
        <div className="payment-cancelled-header">
        <div className="payment-success-icon-wrapper">
            <svg className="payment-cancelled-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d32f2f">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>            </svg>
          </div>
          <h1 className="payment-cancelled-title">Payment Cancelled</h1>
        </div>
        <p className="payment-cancelled-message">
          No worries! You can try again whenever you're ready.
          <br /><br />
          If you have any questions, feel free to contact our support team.
        </p>
        <div className="payment-cancelled-buttons">
          <button className="payment-cancelled-button try-again">
            Try Again
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
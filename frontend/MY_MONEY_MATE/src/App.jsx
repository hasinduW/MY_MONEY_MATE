import React from "react";
import UserProvider from "./context/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { API_URL } from "/src/utils/api.js";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Income from "./pages/Dashboard/Income";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import { Toaster } from "react-hot-toast";
import PricingPage from './pages/subscription/PricingPage';
import './styles/pricing.css';
import CheckoutPage from './pages/subscription/CheckoutPage';
import Success from "./pages/subscription/Success";
import Cancel from "./pages/subscription/Cancel";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login"  element={<Login />} />
            <Route path="/signup"  element={<SignUp />} />
            <Route path="/dashboard"  element={<Home />} />
            <Route path="/income"  element={<Income />} />
            <Route path="/expense"  element={<Expense />} />
            <Route path='/pricing'  element={<PricingPage/>}/>
            <Route path='/subscription/checkout'  element={<CheckoutPage/>}/>
            <Route path='/success'  element={<Success/>}/>
            <Route path= '/cancel'  element={<Cancel/>}/>
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize:'13px'
            },
          }}
        />
      
      </UserProvider>
    </div>
  );
};

export default App;

const Root = () =>{
  // check if token existsnin localStorage
const isAuthenticated =!!localStorage.getItem("token");


// Redirect to dashboard if authenticated, otherwise to login
return isAuthenticated ? (
  <Navigate to="/dashboard" />
) : (
  <Navigate to ="/login" />
);
};

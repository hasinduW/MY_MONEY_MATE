import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Income from "./pages/Dashboard/Income";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
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
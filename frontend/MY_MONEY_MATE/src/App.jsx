import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Income from "./pages/Dashboard/Income";
import Home from "./pages/Dashboard/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

// Root Component (Add Some Content)
const Root = () => {
  return (
    <div>
      <h1>Welcome to My Money Mate</h1>
    </div>
  );
};

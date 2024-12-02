import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Hero from './components/Hero/Hero';
import Choose from './components/restaurants/Choose';
import Checkout from './components/checkout/Checkout';
import MDBBQ from './components/restaurants/MDBBQ';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Conditional rendering of Hero component only on the home page */}
        <Routes>
          <Route path="/" element={<Hero />} /> {/* Show Hero only on the homepage */}
          <Route path="/choose" element={<Choose />} /> {/* Route for Choose */}
          <Route path="/restaurants/:restaurantId" element={<MDBBQ />} /> {/* Dynamic Route for Restaurant */}
          <Route path="/checkout" element={<Checkout />} /> {/* Route for Checkout page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

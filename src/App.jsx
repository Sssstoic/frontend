import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Hero from './components/Hero/Hero';
import Choose from './components/restaurants/Choose';
import Checkout from './components/checkout/Checkout';
import MDBBQ from './components/restaurants/MDBBQ';
import Popup from './components/popup/Popup';
import { auth } from './components/_utils/Firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut from Firebase

const App = () => {
  const [showPopup, setShowPopup] = useState(false); 
  const [user, setUser] = useState(null); // User state to track the logged-in user
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track login status

  const HandlePopup = () => {
    setShowPopup(true); // Handle the popup visibility
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out user from Firebase
      setUser(null); // Clear user state
      setIsUserLoggedIn(false); // Set isUserLoggedIn to false after logout
      setShowPopup(false); // Close the popup after logout
    } catch (error) {
      console.error("Error signing out:", error.message); // Handle errors if any
    }
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Update user state when logged in
        setIsUserLoggedIn(true); // Set isUserLoggedIn to true when logged in
      } else {
        setUser(null); // Set user to null when logged out
        setIsUserLoggedIn(false); // Set isUserLoggedIn to false when logged out
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    // Close the popup if the user is logged in
    if (user) {
      setShowPopup(false); // Automatically close popup after login/signup
    }
  }, [user]);

  return (
    <Router>
      <div className="overflow-x-hidden">
        <Navbar 
          user={user} 
          HandlePopup={HandlePopup} 
          handleLogout={handleLogout} 
          isUserLoggedIn={isUserLoggedIn} // Pass the login status to Navbar
        />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/restaurants/:restaurantId" element={<MDBBQ />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Popup 
          showPopup={showPopup} 
          setShowPopup={setShowPopup} 
          setUser={setUser} 
          setIsUserLoggedIn={setIsUserLoggedIn} // Pass setIsUserLoggedIn to Popup
        />
      </div>
    </Router>
  );
};

export default App;

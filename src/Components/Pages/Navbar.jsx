import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showConfirm, setShowConfirm] = useState(false); // Popup state

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>

        {user ? (
          <>
            <div className='welcome-text'><span>Welcome, {user.name}</span></div>
            <button className='logout-btn' onClick={() => setShowConfirm(true)}>Logout</button>
          </>
        ) : (
          <Link to="/auth">Login / Signup</Link>
        )}
      </div>

      {/* ✅ LOGOUT ALERT - NAV DIV NI BAHAR RAKHYU CHE */}
      {showConfirm && (
        <div className="logout-overlay">
          <div className="logout-card">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout, <span>{user.name}</span>?</p>
            <div className="logout-popup-btns">
              <button onClick={handleLogout} className="confirm-btn">Yes, Logout</button>
              <button onClick={() => setShowConfirm(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
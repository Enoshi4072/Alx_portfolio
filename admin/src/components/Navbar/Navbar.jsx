import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={assets.logo} alt="Logo" className="navbar-logo" />
      </div>
      <div className="navbar-profile">
        <img src={assets.profile_image} alt="Profile" className="navbar-profile-image" />
      </div>
    </nav>
  );
};

export default Navbar;

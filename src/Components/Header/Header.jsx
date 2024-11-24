import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css';
import logo from "./logo.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img className="logoImage" src={logo} alt="Logo" />
        RecipeApp
      </div>
      <div className="favorites">
        <Link to="/favorites" className="favorites-link">Favorites</Link>
      </div>
    </div>
  );
};

export default Header;

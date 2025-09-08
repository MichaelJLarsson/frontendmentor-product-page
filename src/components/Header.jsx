import React from 'react';

const Header = () => {
  return (
    <header>
      <button
        className="hamburger-menu md:hidden"
        type="button"
        aria-label="Menu"
      ></button>
      <a href="#" className="logo">
        <img src="/images/logo.svg" alt="Sneaker Company logo" />
      </a>
      <nav className="main-navigation hidden md:grid">
        <ul>
          <li><a href="#">Collections</a></li>
          <li><a href="#">Men</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <button className="cart-button" type="button">
        <img src="/images/icon-cart.svg" alt="Shopping cart icon" />
      </button>
      <button
        type="button"
        className="user-avatar"
        aria-label="User avatar"
      ></button>
    </header>
  );
};

export default Header;
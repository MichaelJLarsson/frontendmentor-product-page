import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import polyfill from "@oddbird/css-anchor-positioning/fn";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const anchorRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!anchorRef.current || !targetRef.current) {
      console.log("ANCHOR IS SUPPORTED");
      return null;
    }
    console.log("ANCHOR NOT SUPPORTED, INITIALIZING");
    polyfill();
  }, [anchorRef, targetRef]);

  const handleMenuClick = (ev) => {
    ev.preventDefault();
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header>
      <button
        className="hamburger-menu md:hidden"
        type="button"
        aria-label="Menu"
        onClick={(ev) => handleMenuClick(ev)}
      />
      <a
        href="#"
        className="logo"
      >
        <img
          src="/images/logo.svg"
          alt="Sneaker Company logo"
        />
      </a>
      <nav className="main-navigation hidden md:grid">
        <ul>
          <li>
            <a href="#">Collections</a>
          </li>
          <li>
            <a href="#">Men</a>
          </li>
          <li>
            <a href="#">Women</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <button
        className="cart-button"
        type="button"
        popoverTarget="shopping-cart"
        ref={anchorRef}
      >
        <img
          src="/images/icon-cart.svg"
          alt="Shopping cart icon"
        />
      </button>
      <button
        type="button"
        className="user-avatar"
        aria-label="User avatar"
      />
      <Sidebar
        open={isSidebarOpen}
        handleClose={handleMenuClick}
      />

      {/* Shopping cart */}
      <dialog
        popover=""
        id="shopping-cart"
        ref={targetRef}
        className="shopping-cart bg-white"
      >
        <div className="cart-block cart-header">
          <h3>Cart</h3>
        </div>
        <div className="cart-block cart-body flex justify-center items-center min-h-[200px]">
          <p>
            <strong>Your cart is empty.</strong>
          </p>
        </div>
      </dialog>
    </header>
  );
};

export default Header;

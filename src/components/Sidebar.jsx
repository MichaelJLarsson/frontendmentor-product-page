import React from 'react';

const Sidebar = () => {
  return (
    <>
      <div className="sidepanel sm:block">
        <button className="close" aria-label="Close panel">
          X
        </button>
        <nav className="main-menu">
          <ul>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Men</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div className="tint"></div>
    </>
  );
};

export default Sidebar;
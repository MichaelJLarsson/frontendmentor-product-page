import clsx from "clsx";
import React from "react";

const Sidebar = ({ open, handleClose }) => {
  return (
    <>
      <div className={clsx("sidepanel sm:block", open ? "open" : "")}>
        <button
          className="close"
          aria-label="Close panel"
          onClick={(ev) => handleClose(ev)}
        >
          X
        </button>
        <nav className="main-menu">
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
      </div>
      <div
        className={clsx("tint", !open ? "hidden" : "")}
        onClick={(ev) => handleClose(ev)}
      />
    </>
  );
};

export default Sidebar;

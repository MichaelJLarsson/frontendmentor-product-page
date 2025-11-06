import clsx from "clsx";
import React from "react";

const Sidebar = ({ open, handleClose }) => {
  const [isDesktop, setIsDesktop] = React.useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 640px)").matches
      : false
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = (e) => setIsDesktop(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
    } else {
      mq.addListener(onChange);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", onChange);
      } else {
        mq.removeListener(onChange);
      }
    };
  }, []);

  return (
    <>
      <div className={clsx("sidepanel sm:block", open ? "open" : "")}>
        <button
          className="close"
          aria-label="Close panel"
          onClick={(ev) => handleClose(ev)}
          inert={isDesktop}
          tabIndex={isDesktop ? -1 : undefined}
        >
          X
        </button>
        <nav
          className="main-menu"
          inert={isDesktop}
          tabIndex={isDesktop ? -1 : undefined}
        >
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

      {/* Background tint */}
      <div
        className={clsx("tint", !open ? "closed" : "open")}
        onClick={(ev) => handleClose(ev)}
        tabIndex="-1"
      />
    </>
  );
};

export default Sidebar;

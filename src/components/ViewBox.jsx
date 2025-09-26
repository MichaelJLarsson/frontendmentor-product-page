import { useEffect, useRef } from "react";
import CloseIcon from "../images/icon-close.svg?react";

const ViewBox = ({ children, isOpen, close }) => {
  const viewBoxRef = useRef(null);

  const lightDismiss = ({ target: dialog }) => {
    if (dialog.nodeName === "DIALOG") dialog.close("dismiss");
    close();
  };

  useEffect(() => {
    // Close viewbox when clicking outside
    viewBoxRef.current.addEventListener("click", lightDismiss);

    // Update state on close w esc key
    const closeOnEsc = (e) => {
      e.key === "Escape" && close();
    };
    viewBoxRef.current.addEventListener("keydown", closeOnEsc);

    // Remove event listeners on unmount
    return () => {
      if (viewBoxRef.current) {
        viewBoxRef.current.removeEventListener("click", lightDismiss);
        viewBoxRef.current.removeEventListener("keydown", closeOnEsc);
      }
    };
  }, []);

  useEffect(() => {
    isOpen && viewBoxRef.current.showModal();
  }, [isOpen]);

  const handleCloseClick = () => {
    viewBoxRef.current.close("dismiss");
    close();
  };

  return (
    <dialog
      popover=""
      className="viewbox center-center invisible md:visible p-5 w-[640px] bg-transparent"
      ref={viewBoxRef}
    >
      <div className="dialog-header flex justify-end mb-6">
        <button
          className="close-button"
          aria-label="Close viewbox"
          onClick={handleCloseClick}
        >
          <CloseIcon />
        </button>
      </div>
      {children}
    </dialog>
  );
};

export default ViewBox;

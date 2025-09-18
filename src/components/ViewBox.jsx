import { useEffect, useRef } from "react";
import CloseIcon from "../images/icon-close.svg?react";

const ViewBox = ({ children }) => {
  const viewBoxRef = useRef(null);

  const lightDismiss = ({ target: dialog }) => {
    if (dialog.nodeName === "DIALOG") dialog.close("dismiss");
  };

  useEffect(() => {
    viewBoxRef.current.showModal();
    // Close viewbox when clicking outside
    viewBoxRef.current.addEventListener("click", lightDismiss);
  }, []);

  const handleCloseClick = () => {
    viewBoxRef.current.close("dismiss");
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

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

  return (
    <dialog
      popover=""
      className="viewbox hidden md:block p-5 w-[640px] absolute top-[10%] left-[50%] translate-x-[-50%] bg-transparent"
      ref={viewBoxRef}
    >
      <div className="dialog-header flex justify-end mb-6">
        <button
          className="close-button"
          aria-label="Close viewbox"
        >
          <CloseIcon />
        </button>
      </div>
      {children}
    </dialog>
  );
};

export default ViewBox;

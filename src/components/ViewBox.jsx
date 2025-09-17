import { useEffect, useRef } from "react";

const ViewBox = ({ children }) => {
  const viewBoxRef = useRef(null);

  const lightDismiss = ({ target: dialog }) => {
    if (dialog.nodeName === "DIALOG") dialog.close("dismiss");
  };

  useEffect(() => {
    // Close viewbox when clicking outside
    viewBoxRef.current.addEventListener("click", lightDismiss);
  }, []);

  return (
    <dialog
      popover=""
      className="viewbox p-1 w-[500px] absolute top-[10%] left-[50%] translate-x-[-50%] bg-transparent"
      ref={viewBoxRef}
    >
      <button
        className="close-button hidden"
        aria-label="Close viewbox"
      >
        X
      </button>
      {children}
    </dialog>
  );
};

export default ViewBox;

import { useEffect, useRef } from "react";

const ViewBox = ({ children }) => {
  const viewBoxRef = useRef(null);

  useEffect(() => {
    viewBoxRef.current.showModal();
  }, []);

  return (
    <dialog
      popover=""
      className="viewbox w-[500px] absolute top-[10%] left-[50%] translate-x-[-50%] bg-transparent"
      ref={viewBoxRef}
    >
      <button
        className="close-button"
        aria-label="Close viewbox"
      />
      {children}
    </dialog>
  );
};

export default ViewBox;

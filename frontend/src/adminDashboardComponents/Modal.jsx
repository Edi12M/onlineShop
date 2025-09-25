import { useEffect } from "react";

function Modal({ children, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent backdrop click from closing
      >
        <button className="modal-close" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

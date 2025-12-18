import { useEffect } from "react";

function Modal({ children, onClose, title = "Add Product" }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(3px)",
        transition: "opacity 0.3s ease-in-out",
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-semibold text-dark">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

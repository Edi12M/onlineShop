function Buttons({ children, type = "button", onSelect, variant = "primary" }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} px-4 py-2 fw-semibold`}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}

export default Buttons;

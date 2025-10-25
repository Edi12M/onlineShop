function Buttons({ children, type = "button", onSelect, variant = "primary", className = "" }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} px-3 py-2 me-2 ${className}`} 
      onClick={onSelect}
    >
      {children}
    </button>
  );
}

export default Buttons;

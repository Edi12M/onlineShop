function Buttons({ children, type = "button", onSelect }) {
    return (
        <button 
            type={type} 
            className="logIn-buttons" 
            onClick={onSelect}>
            {children}
        </button>
    );
}

export default Buttons;

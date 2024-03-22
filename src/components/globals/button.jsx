const Button = ({ type, className, children }) => {
  return (
    <button type={type} className={`custom-button ${className}`}>
      {children}
    </button>
  )
}

export default Button

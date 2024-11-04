import PropTypes from 'prop-types';

const Button = ({ label, size = 'md', className = '', icon: Icon }) => {
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  return (
    <button
      className={`btn ${sizeClasses[size]} transition-transform transform hover:scale-105 ${className}`}
    >
      {Icon && <Icon className="mr-2" />}
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  icon: PropTypes.elementType,
};

export default Button;

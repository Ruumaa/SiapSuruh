import PropTypes from 'prop-types';

const StatusButton = ({ label }) => {
  if (label === 'Selesai') {
    return (
      <button className="btn btn-success btn-sm h-10 text-white">
        {label}
      </button>
    );
  } else if (label === 'Berjalan') {
    return <button className="btn btn-secondary btn-sm h-10">{label}</button>;
  } else {
    return (
      <button className="btn btn-primary btn-sm h-10 hover:text-white">
        {label}
      </button>
    );
  }
};

StatusButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default StatusButton;

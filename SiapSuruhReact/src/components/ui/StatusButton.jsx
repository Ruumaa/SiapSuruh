const StatusButton = ({ label, onClick }) => {
  if (label === 'COMPLETED') {
    return (
      <button
        onClick={onClick}
        className="btn btn-success btn-sm h-10 text-white w-full "
      >
        {label}
      </button>
    );
  } else if (label === 'PROCCESSED') {
    return (
      <button
        onClick={onClick}
        className="btn bg-yellow-500 hover:bg-yellow-600 text-white btn-sm h-10  w-full "
      >
        {label}
      </button>
    );
  } else if (label === 'REJECTED') {
    return (
      <button
        onClick={onClick}
        className="btn bg-red-500 hover:bg-red-600 text-white btn-sm h-10  w-full "
      >
        {label}
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className="btn bg-black/20 btn-sm h-10  w-full "
      >
        {label}
      </button>
    );
  }
};

export default StatusButton;

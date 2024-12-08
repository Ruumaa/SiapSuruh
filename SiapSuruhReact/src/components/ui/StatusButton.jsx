const StatusButton = ({ label, onClick }) => {
  if (label === 'Selesai') {
    return (
      <button
        onClick={onClick}
        className="btn btn-success btn-sm h-10 text-white w-full"
      >
        {label}
      </button>
    );
  } else if (label === 'Berjalan') {
    return (
      <button
        onClick={onClick}
        className="btn bg-yellow-500 hover:bg-yellow-600 text-white btn-sm h-10  w-full"
      >
        {label}
      </button>
    );
  } else {
    return (
      <button onClick={onClick} className="btn bg-black/20 btn-sm h-10  w-full">
        {label}
      </button>
    );
  }
};

export default StatusButton;

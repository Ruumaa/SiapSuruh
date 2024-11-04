import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const buttons = [
    { label: 'Register', path: '/register', className: 'btn-outline' },
    {
      label: 'Login Jasa',
      path: '/login-jasa',
      className: 'btn-primary hover:text-white',
    },
    {
      label: 'Login Pengguna',
      path: '/login-user',
      className: 'btn-primary hover:text-white',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-between">
      {/* Text */}
      <div className="flex flex-col w-1/2">
        <h1 className="text-7xl font-semibold">Perlu Bantuan Dadakan?</h1>
        <h2 className="text-2xl mt-4">Kami siap membantu Anda kapan saja!</h2>
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-4 w-1/2">
        {buttons.map(({ label, path, className }) => (
          <div
            key={label}
            className={`btn btn-lg ${className}`}
            onClick={() => navigate(path)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

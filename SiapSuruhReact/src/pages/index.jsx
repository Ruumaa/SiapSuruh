import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   // Ambil data dari backend
  //   axios
  //     .get('http://localhost:5000/users')
  //     .then((response) => {
  //       setUsers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching users:', error);
  //     });
  // }, []);

  const navigate = useNavigate();
  const buttons = [
    { label: 'Register', path: '/register', className: 'btn-outline' },
    {
      label: 'Login Jasa',
      path: '/provider/login',
      className: 'btn-primary hover:text-white',
    },
    {
      label: 'Login Pengguna',
      path: '/user/login',
      className: 'btn-primary hover:text-white',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-between">
      {/* Text */}
      <div className="flex flex-col w-1/2">
        <h1 className="text-7xl font-semibold">Perlu Bantuan Dadakan?</h1>
        {/* <h1 className="text-7xl font-semibold">{users[0].name}</h1> */}
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

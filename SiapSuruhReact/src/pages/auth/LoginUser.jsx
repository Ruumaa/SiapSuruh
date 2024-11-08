import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/user/home');
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login <br />
          <span className="text-sm text-gray-500 font-normal line-clamp-1">
            sebagai pengguna
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full input input-bordered  focus:outline-none mt-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full input input-bordered  focus:outline-none mt-2"
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary hover:text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;

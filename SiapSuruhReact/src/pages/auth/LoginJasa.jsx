import { useNavigate } from 'react-router-dom';
import { useLoginJasa } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const LoginJasa = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate: login, isPending } = useLoginJasa();

  const handleLogin = ({ username, password }) => {
    login(
      { username, password },
      {
        onSuccess: () => {
          navigate('/provider/home');
          toast.success('Login Success');
        },
        onError: (error) => toast.error(`${error.message}`),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login <br />{' '}
          <span className="text-sm text-gray-500 font-normal line-clamp-1">
            sebagai jasa
          </span>
        </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full input input-bordered  focus:outline-none mt-2"
              {...register('username')}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full input input-bordered  focus:outline-none mt-2"
              {...register('password')}
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full btn btn-primary hover:text-white"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginJasa;

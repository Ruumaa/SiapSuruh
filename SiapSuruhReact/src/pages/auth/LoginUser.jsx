import { useNavigate } from 'react-router-dom';
import { useLoginUser } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import ErrorText from '../../components/ui/ErrorText';

const LoginUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: login, isPending } = useLoginUser();
  const navigate = useNavigate();

  const handleLogin = ({ username, password }) => {
    login(
      { username, password },
      {
        onSuccess: () => {
          navigate('/user/home');
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
          Login <br />
          <span className="text-sm text-gray-500 font-normal line-clamp-1">
            sebagai pengguna
          </span>
        </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full input input-bordered  focus:outline-none mt-2"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <ErrorText errorMessage={errors.username.message} />
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full input input-bordered  focus:outline-none mt-2"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <ErrorText errorMessage={errors.password.message} />
            )}
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

export default LoginUser;

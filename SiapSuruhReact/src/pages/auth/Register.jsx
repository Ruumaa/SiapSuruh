import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import ErrorText from '../../components/ui/ErrorText';

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { role: 'Pengguna' },
  });
  const { mutate: registerUser, isPending } = useRegister();

  const handleRegister = ({
    username,
    email,
    password,
    phone_number,
    address,
    role,
  }) => {
    registerUser(
      { username, email, password, phone_number, address, role },
      {
        onSuccess: () => {
          navigate('/');
          toast.success('Register Success');
        },
        onError: (error) => toast.error(`${error.message}`),
      }
    );
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white shadow-md p-8 rounded-lg w-full max-w-md space-y-6 "
      >
        <div>
          <h2 className="text-2xl font-bold text-center">Daftar</h2>
          <p className="text-center text-gray-600">
            Jadilah bagian dari <span className="font-bold">SiapSuruh.</span>
          </p>
        </div>
        {/* Nama */}
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
            className="input input-bordered  focus:outline-none w-full "
          />
          {errors.username && (
            <ErrorText errorMessage={errors.username.message} />
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className="input input-bordered  focus:outline-none w-full "
          />
          {errors.email && <ErrorText errorMessage={errors.email.message} />}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="input input-bordered  focus:outline-none w-full "
          />
          {errors.password && (
            <ErrorText errorMessage={errors.password.message} />
          )}
        </div>

        {/* No HP */}
        <div>
          <input
            type="tel"
            placeholder="Nomor Handphone"
            {...register('phone_number', {
              required: 'Nomor Handphone is required',
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Nomor handphone tidak valid (10-15 angka)',
              },
            })}
            className="input input-bordered  focus:outline-none w-full "
          />
          {errors.phone_number && (
            <ErrorText errorMessage={errors.phone_number.message} />
          )}
        </div>

        {/* Alamat */}
        <div>
          <input
            type="text"
            placeholder="Alamat"
            {...register('address', { required: 'Address is required' })}
            className="input input-bordered  focus:outline-none w-full"
          />
          {errors.address && (
            <ErrorText errorMessage={errors.address.message} />
          )}
        </div>

        {/* Role */}
        <div className="form-control w-full">
          <label className="label font-semibold">Daftar Sebagai:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="USER"
                defaultChecked
                {...register('role', { required: 'Role is required' })}
                className="radio radio-black dark:radio-white"
              />
              <span>Pengguna</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="JASA"
                {...register('role', { required: 'Role is required' })}
                className="radio radio-black dark:radio-white"
              />
              <span>Jasa</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={isPending}
          type="submit"
          className="btn w-full btn-primary hover:text-white"
        >
          {isPending ? 'Mendaftarkan...' : 'Daftar'}
        </button>
      </form>
    </div>
  );
};

export default Register;

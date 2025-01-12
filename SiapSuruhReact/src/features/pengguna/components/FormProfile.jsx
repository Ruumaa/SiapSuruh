import { useForm } from 'react-hook-form';
import { useEditProfile } from '../hooks/useUserHooks';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import ErrorText from '../../../components/ui/ErrorText';
import { fetchWithAuth } from '../../../api/fetchWithAuth';

const FormProfile = () => {
  const user_id = localStorage.getItem('user_id');
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
  } = useForm({
    defaultValues: async () => {
      const respone = await fetchWithAuth(`/users/${user_id}`);
      return respone.data;
    },

    // defaultValues: async () => useGetUserById(user_id),
  });

  const { mutate: editUser, isPending } = useEditProfile();

  const handleEditUser = (formValues) => {
    const updatedData = {};

    Object.keys(dirtyFields).forEach((field) => {
      updatedData[field] = formValues[field];
    });

    editUser(
      {
        id: user_id,
        data: updatedData,
      },
      {
        onSuccess: () => toast.success('New edit saved!'),
        onError: (error) => toast.error(`${error.message}`),
      }
    );
  };

  if (isPending) return <Loading />;

  return (
    <>
      {/* Form */}
      <form
        onSubmit={handleSubmit(handleEditUser)}
        className="bg-white shadow-md p-8 rounded-lg w-[46rem] my-20"
      >
        <h2 className="text-2xl font-bold text-center">Perbarui Profile</h2>
        <div className="flex items-center justify-center w-full my-6">
          <div className="w-1/2 flex items-center justify-center">
            <div className=" size-60 rounded-full">
              <img
                src="/img-placeholder.svg"
                className="rounded-full"
                alt="user-img"
              />
            </div>
          </div>
          <div className="w-1/2 space-y-4 ">
            {/* Username */}
            <div>
              <label className="font-semibold sm pl-1">Username</label>
              <input
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
                className="input input-bordered  focus:outline-none w-full "
              />
              {errors.username && (
                <ErrorText errorMessage={errors.address.message} />
              )}
            </div>
            {/* Email */}
            <div>
              <label className="font-semibold sm pl-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                className="input input-bordered  focus:outline-none w-full "
              />
              {errors.email && (
                <ErrorText errorMessage={errors.email.message} />
              )}
            </div>
            {/* No HP */}
            <div>
              <label className="font-semibold sm pl-1">Nomor Handphone</label>
              <input
                type="tel"
                {...register('phone_number', {
                  required: 'Nomor Handphone is required',
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: 'Nomor handphone tidak valid (10-15 angka)',
                  },
                })}
                placeholder="Nomor Handphone"
                className="input input-bordered  focus:outline-none w-full "
              />
              {errors.phone_number && (
                <ErrorText errorMessage={errors.phone_number.message} />
              )}
            </div>
            {/* Alamat */}
            <div>
              <label className="font-semibold sm pl-1">Alamat</label>
              <input
                type="text"
                {...register('address', { required: 'Address is required' })}
                placeholder="Address"
                className="input input-bordered  focus:outline-none w-full"
              />
              {errors.address && (
                <ErrorText errorMessage={errors.address.message} />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isDirty}
          className="btn w-full btn-primary hover:text-white disabled:bg-black/90 disabled:text-white/10"
        >
          Simpan
        </button>
      </form>
    </>
  );
};

export default FormProfile;

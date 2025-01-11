import { useForm } from 'react-hook-form';
import { useEditProfile, useGetUserById } from '../hooks/useUserHooks';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import ErrorText from '../../../components/ui/ErrorText';

const FormProfile = () => {
  const user_id = localStorage.getItem('user_id');
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
  } = useForm({
    defaultValues: async () =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useGetUserById(user_id),
  });

  const { mutate: editUser, isPending } = useEditProfile();

  const handleEditUser = (formValues) => {
    const updatedData = {};

    // Hanya masukkan field yang berubah (dirtyFields) ke dalam updatedData
    Object.keys(dirtyFields).forEach((field) => {
      updatedData[field] = formValues[field];
    });

    // Jika tidak ada perubahan, hindari memanggil API
    if (Object.keys(updatedData).length === 0) {
      toast.info('Tidak ada perubahan untuk disimpan.');
      return;
    }
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
            <div className="size-60 rounded-full bg-gray-200"></div>
          </div>
          <div className="w-1/2 space-y-6 ">
            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
                className="input input-bordered  focus:outline-none w-full "
              />
              {errors.address && (
                <ErrorText errorMessage={errors.address.message} />
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
              {errors.email && (
                <ErrorText errorMessage={errors.email.message} />
              )}
            </div>
            {/* No HP */}
            <div>
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

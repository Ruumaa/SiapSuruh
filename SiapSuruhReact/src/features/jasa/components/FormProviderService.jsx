import { useForm } from 'react-hook-form';
import { useEditProvService } from '../hooks/providerHooks';
import ErrorText from '../../../components/ui/ErrorText';
import { fetchWithAuth } from '../../../api/fetchWithAuth';

const FormProviderService = () => {
  const user_id = localStorage.getItem('user_id');
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
  } = useForm({
    defaultValues: async () => {
      const response = await fetchWithAuth(`/providers/user/${user_id}`);
      let dataField = {
        provider_name: response.data.provider_name,
        bio: response.data.bio,
        title: response.data.Service.title,
        description: response.data.Service.description,
        price: response.data.Service.price,
      };
      return dataField;
    },
  });

  const { mutate: editProvService, isPending } = useEditProvService();

  const handleEditProvService = (formValues) => {
    const updatedData = {};

    Object.keys(dirtyFields).forEach((field) => {
      updatedData[field] = formValues[field];
    });

    editProvService({
      id: user_id,
      data: updatedData,
    });
  };

  return (
    <>
      {/* Form */}
      <form
        onSubmit={handleSubmit(handleEditProvService)}
        className="bg-white shadow-md p-8 rounded-lg w-[46rem] my-20"
      >
        <h2 className="text-2xl font-bold text-center">
          Perbarui Jasa dan Layanan
        </h2>
        <div className="flex items-center justify-center w-full my-6">
          <div className="space-y-4 w-full">
            {/* Nama Jasa */}
            <div>
              <label className="font-semibold sm pl-1">Nama Jasa</label>
              <input
                type="text"
                placeholder="Agus Widodo"
                {...register('provider_name', {
                  required: 'Provider Name is required',
                })}
                className="input input-bordered  focus:outline-none w-full "
              />
              {errors.provider_name && (
                <ErrorText errorMessage={errors.provider_name.message} />
              )}
            </div>
            {/* Bio */}
            <div>
              <label className="font-semibold sm pl-1">Bio Jasa</label>
              <textarea
                type="text"
                placeholder="Memperbaiki segala macam masalah perkuncian anda"
                {...register('bio', { required: 'Bio is required' })}
                className="textarea textarea-bordered  focus:outline-none w-full "
              />
              {errors.bio && <ErrorText errorMessage={errors.bio.message} />}
            </div>
            {/* Title Service */}
            <div>
              <label className="font-semibold sm pl-1">Nama Layanan</label>
              <input
                type="text"
                placeholder="Agus Kunci"
                {...register('title', {
                  required: 'Service Title is required',
                })}
                className="input input-bordered  focus:outline-none w-full "
              />
              {errors.title && (
                <ErrorText errorMessage={errors.title.message} />
              )}
            </div>
            {/* Description Service */}
            <div>
              <label className="font-semibold sm pl-1">Deskripsi Layanan</label>
              <textarea
                type="text"
                placeholder="Berpengalaman dalam manajemen kunci"
                {...register('description', {
                  required: 'Service Description is required',
                })}
                className="textarea textarea-bordered  focus:outline-none w-full "
              />
              {errors.description && (
                <ErrorText errorMessage={errors.description.message} />
              )}
            </div>
            {/* Price Service */}
            <div>
              <label className="font-semibold sm pl-1">Harga Layanan</label>
              <input
                type="text"
                placeholder="50000"
                {...register('price', {
                  required: 'Service Price is required',
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Harga hanya boleh berisi angka.',
                  },
                })}
                className="input input-bordered  focus:outline-none w-full "
              />
              {errors.price && (
                <ErrorText errorMessage={errors.price.message} />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending || !isDirty}
          className="btn w-full btn-primary hover:text-white disabled:bg-black/90 disabled:text-white/10"
        >
          {isPending ? 'Loading...' : 'Perbarui'}
        </button>
      </form>
    </>
  );
};

export default FormProviderService;

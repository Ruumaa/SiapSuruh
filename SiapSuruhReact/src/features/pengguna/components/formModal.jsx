import { useForm } from 'react-hook-form';
import { useCreateOrder } from '../hooks/useUserHooks';
import { toast } from 'react-toastify';
import ErrorText from '../../../components/ui/ErrorText';
import { useNavigate } from 'react-router-dom';

const FormModal = ({ isModalOpen, handleModal, provider_id, service_id }) => {
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleOrder = ({ details, location, order_date, total_price }) =>
    createOrder(
      {
        user_id,
        service_id,
        provider_id,
        details,
        location,
        order_date,
        total_price,
      },
      {
        onSuccess: () => {
          handleModal();
          navigate('/user/home/pesanan');
          toast.success('Create Order Success');
        },
        onError: (error) => toast.error(`${error.message}`),
      }
    );

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="font-semibold text-lg">Form Permintaan Jasa</h2>
              <form onSubmit={handleSubmit(handleOrder)}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Detail Jasa</span>
                  </label>
                  <textarea
                    placeholder="Detail tentang jasa"
                    className="textarea textarea-bordered"
                    {...register('details', { required: true })}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Lokasi</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan lokasi"
                    className="input input-bordered"
                    {...register('location', { required: true })}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Tanggal</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    {...register('order_date', { required: true })}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Harga Jasa </span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered ${
                      errors.total_price ? 'input-error' : ''
                    }`}
                    placeholder="Harga Jasa yang ingin dibayarkan"
                    {...register('total_price', {
                      pattern: {
                        value: /^[0-9]*$/,
                        message: 'Harga jasa hanya boleh berisi angka.',
                      },
                    })}
                  />
                  {errors.total_price && (
                    <ErrorText errorMessage={errors.total_price.message} />
                  )}
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleModal()}
                  >
                    Tutup
                  </button>
                  <button
                    disabled={isPending}
                    type="submit"
                    className="btn btn-primary hover:text-white"
                  >
                    {isPending ? 'Mendaftarkan...' : 'Pesan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;

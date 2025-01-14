import { IDRConverter } from '../../../utils/IDRConverter';
import { useEditOrderStatus } from '../../pengguna/hooks/useUserHooks';
import { formatDate } from '../../../utils/ParseDate';

const DetailsModalProvider = ({ isOpen, handleModal, order }) => {
  const { mutate: editOrder, isPending } = useEditOrderStatus();
  const handleEditOrderStatus = (id, status) => {
    editOrder({ id, data: { status } });
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box p-6 rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Detail Pesanan
              </h2>
            </div>

            {/* Order Details with aligned keys and bold values */}
            <div className="text-gray-700 space-y-3">
              <div className="flex justify-between">
                <span className="w-52 text-gray-800">Tanggal</span>
                <span className="font-bold">
                  {formatDate(order.order_date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Lokasi</span>
                <span className="font-bold">{order.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Detail Jasa</span>
                <span className="font-bold text-right">{order.details}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Status Pembayaran</span>
                <span className="font-bold">{order.payment_status}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Harga</span>
                <span className="font-bold text-green-600">
                  {IDRConverter(order.total_price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Status</span>
                <span
                  className={`font-bold ${
                    order.status === 'COMPLETED'
                      ? 'text-green-500'
                      : order.status === 'REJECTED'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}

            <div className="mt-6 justify-end w-full overflow-hidden">
              <button
                className="btn btn-sm w-full mt-2 h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 "
                onClick={handleModal}
              >
                Tutup
              </button>
              <div className="flex gap-2 mt-2">
                <div className="w-1/2">
                  <button
                    disabled={order.status !== 'PENDING'}
                    className="btn btn-sm w-full h-10 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-100 disabled:text-gray-300"
                    onClick={() => {
                      handleModal();
                      handleEditOrderStatus(order.id, 'REJECTED');
                    }}
                  >
                    {isPending ? 'Loading...' : 'Tolak Pesanan'}
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    disabled={order.status !== 'PENDING'}
                    className="btn btn-sm w-full h-10 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-100 disabled:text-gray-300"
                    onClick={() => {
                      handleModal();
                      handleEditOrderStatus(order.id, 'PROCCESSED');
                    }}
                  >
                    {isPending ? 'Loading...' : 'Terima Pesanan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsModalProvider;

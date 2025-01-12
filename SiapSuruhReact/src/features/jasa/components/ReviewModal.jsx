const ReviewModal = ({ isOpen, handleModal, order }) => {
  const isProvider = location.pathname.startsWith('/provider/home');

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
            {/* <div className="text-gray-700 space-y-3">
              <div className="flex justify-between">
                <span className="w-32 text-gray-800">Kategori</span>
                <span className="font-bold">{order.kategori}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-32  text-gray-800">Tanggal</span>
                <span className="font-bold">
                  {order.tanggal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-32  text-gray-800">Lokasi</span>
                <span className="font-bold">{order.lokasi}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-32  text-gray-800">Detail Jasa</span>
                <span className="font-bold clear-start">
                  {order.detailjasa}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-32  text-gray-800">Metode Pembayaran</span>
                <span className="font-bold">{order.metode_pembayaran}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-32  text-gray-800">Harga</span>
                <span className="font-bold text-green-600">
                  Rp. {order.harga.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-32  text-gray-800">Status</span>
                <span
                  className={`font-bold ${
                    order.status === 'Selesai'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="btn btn-sm h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 "
                onClick={handleModal}
              >
                Tutup
              </button>
              {order.status !== 'Selesai' && (
                <button
                  className="btn btn-sm h-10 bg-green-600 text-white hover:bg-green-700"
                  onClick={handleModal}
                  disabled={isProvider}
                >
                  Selesaikan Pesanan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;

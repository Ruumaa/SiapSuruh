const FormModal = ({
  isModalOpen,
  handleModal,
  paymentMethod,
  handlePaymentMethod,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="font-semibold text-lg">Form Permintaan Jasa</h2>
              <form>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Jasa yang Dibutuhkan</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan jasa yang dibutuhkan"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Detail Jasa</span>
                  </label>
                  <textarea
                    placeholder="Detail tentang jasa"
                    className="textarea textarea-bordered"
                    required
                  ></textarea>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Metode Pembayaran</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={paymentMethod} // Set the value from state
                    onChange={handlePaymentMethod} // Handle change
                    required
                  >
                    <option value="" disabled>
                      Pilih metode pembayaran
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="Dompet Digital">Dompet Digital</option>
                  </select>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Lokasi</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan lokasi"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Tanggal</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Jam (Opsional)</span>
                  </label>
                  <input type="time" className="input input-bordered" />
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleModal()}
                  >
                    Tutup
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Kirim
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

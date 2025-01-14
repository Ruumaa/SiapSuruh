import { useState } from 'react';
import { useCreateReport } from '../hooks/useUserHooks';

const ReportModal = ({
  isOpenReport,
  handleModal,
  handleReportModal,
  provider_id,
  user_id,
}) => {
  const [desc, setDesc] = useState('');
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const { mutate: createReport, isPending } = useCreateReport();

  const handleReport = (e) => {
    e.preventDefault();
    createReport({
      reported_provider_id: provider_id,
      reported_by_id: user_id,
      description: desc,
    });
    setDesc('');
    handleModal();
    handleReportModal();
  };
  return (
    <>
      {isOpenReport && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box p-6 rounded-lg shadow-lg border border-gray-200 max-w-[25rem] mx-auto">
            {/* Header */}
            <div className=" items-center">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Laporkan Pesanan
              </h2>
            </div>
            {/* Content */}
            <form onSubmit={handleReport}>
              <div className="w-full">
                <p className="text-gray-700 my-5">
                  Apakah Anda yakin ingin melaporkan pesanan ini? Jika ya,
                  silahkan laporkan di bawah ini.
                </p>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Laporkan keluhan anda"
                  value={desc}
                  onChange={handleDesc}
                ></textarea>
              </div>
              {/* Buttons */}
              <div className="w-full flex gap-x-2 mt-5 items-center">
                <div className="w-1/2">
                  <button
                    type="button"
                    className="btn btn-sm w-full h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 "
                    onClick={handleReportModal}
                  >
                    Tutup
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    className="btn btn-sm w-full h-10 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-100 disabled:text-gray-300"
                    type="submit"
                  >
                    {isPending ? 'Loading...' : 'Laporkan'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportModal;

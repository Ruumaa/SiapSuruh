import { formatDate } from '../../../utils/ParseDate';
import { useEditReport } from '../hooks/adminHooks';

const DetailModal = ({ isOpen, handleModal, report }) => {
  const { mutate: editReport, isPending } = useEditReport();

  const handleEditReport = (action_taken) => {
    editReport({ id: report.id, data: { action_taken } });
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box p-6 rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="w-full text-xl font-bold text-gray-800 text-center mb-4">
                Detail Laporan
              </h2>
            </div>

            {/* report Details with aligned keys and bold values */}
            <div className="text-gray-700 space-y-3">
              <div className="flex justify-between">
                <span className="w-52 text-gray-800">Nama Jasa</span>
                <span className="font-bold">
                  {report.Provider.Service.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Penyedia Jasa</span>
                <span className="font-bold">
                  {report.Provider.provider_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Username Pengguna</span>
                <span className="font-bold text-right">
                  {report.User.username}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Email Pengguna</span>
                <span className="font-bold text-right">
                  {report.User.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">
                  Jasa Diblokir Hingga
                </span>
                <span className="font-bold">
                  {report.blocked_until !== null
                    ? formatDate(report.blocked_until)
                    : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Alasan</span>
                <span className="font-bold">{report.description}</span>
              </div>

              <div className="flex justify-between">
                <span className="w-52  text-gray-800">Tindakan Admin</span>
                <span
                  className={`font-bold ${
                    report.action_taken === 'NONE'
                      ? 'text-green-500'
                      : report.action_taken === 'DELETION'
                      ? 'text-red-500'
                      : report.action_taken === 'SUSPENSION'
                      ? 'text-yellow-500'
                      : 'text-gray-500'
                  }`}
                >
                  {report.action_taken}
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
                <div className="w-1/3">
                  <button
                    disabled={report.action_taken === 'DELETION'}
                    className="btn btn-sm w-full h-10 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-100 disabled:text-gray-300"
                    onClick={() => {
                      handleModal();
                      handleEditReport('DELETION');
                    }}
                  >
                    {isPending ? 'Loading...' : 'Blokir Jasa'}
                  </button>
                </div>
                <div className="w-1/3">
                  <button
                    disabled={
                      report.action_taken === 'DELETION' ||
                      report.action_taken === 'SUSPENSION'
                    }
                    className="btn btn-sm w-full h-10 bg-yellow-500 text-white hover:bg-yellow-600 disabled:bg-gray-100 disabled:text-gray-300"
                    onClick={() => {
                      handleModal();
                      handleEditReport('SUSPENSION');
                    }}
                  >
                    {isPending ? 'Loading...' : 'Suspensi Jasa'}
                  </button>
                </div>
                <div className="w-1/3">
                  <button
                    disabled={report.action_taken === 'NONE'}
                    className="btn btn-sm w-full h-10 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-100 disabled:text-gray-300"
                    onClick={() => {
                      handleModal();
                      handleEditReport('NONE');
                    }}
                  >
                    {isPending ? 'Loading...' : 'Aktifkan Jasa'}
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

export default DetailModal;

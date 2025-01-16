import { GrUserWorker } from 'react-icons/gr';
import { FaRegUser, FaRegClock } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { useGetReports } from '../../features/admin/hooks/adminHooks';
import Loading from '../../components/Loading';
import ErrorPage from '../../components/ui/ErrorPage';
import DetailModal from '../../features/admin/components/DetailModal';
import { useState } from 'react';
import { formatDate } from '../../utils/ParseDate';

const Admin = () => {
  const [report, setReport] = useState({});

  const {
    isOpen,
    handleModal,
    isLoading,
    error,
    filteredData,
    searchQuery,
    setSearchQuery,
  } = useGetReports();

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  const handleClick = (id) => {
    setReport(filteredData.find((report) => report.id === id));
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start w-full my-20 ">
        {/* Search Fitur */}
        <div className="mb-8 w-full max-w-md flex gap-x-3">
          <input
            type="text"
            placeholder="Cari berdasarkan nama pengguna dan penyedia jasa"
            className="input input-bordered w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Card */}
        <div className="w-full grid grid-cols-2 gap-5 p-4">
          {filteredData.map((report) => {
            return (
              <div
                key={report.id}
                className="w-full bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:scale-105 hover:shadow-xl duration-300"
                onClick={() => {
                  handleClick(report.id);
                  handleModal();
                }}
              >
                {/* Title report */}
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Report Id - {report.id}
                </h3>

                {/* Icon Penyedia Jasa */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <GrUserWorker size={20} className="text-yellow-500" />
                    <span className="text-gray-600 font-semibold">
                      {report.Provider.provider_name},{' '}
                      {report.Provider.Service.title}
                    </span>
                  </div>
                </div>

                {/* Username */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <FaRegUser size={20} className="text-blue-500" />
                    <span className="text-gray-600 font-semibold">
                      {report.User.username}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <IoIosMail size={20} className="text-indigo-500" />
                    <span className="text-gray-600 font-semibold">
                      {report.User.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <FaRegClock size={20} className="text-red-500" />
                    <span className="text-gray-600 font-semibold">
                      Diblokir hingga :
                      {report.blocked_until
                        ? formatDate(report.blocked_until)
                        : ' -'}
                    </span>
                  </div>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Container Flex */}
                <div className="flex justify-between items-center">
                  {/* Report Desc*/}
                  <div className=" font-bold">{report.description}</div>
                  {/* Status */}
                  <span
                    className={`text-sm font-semibold py-1 px-3 rounded-full ${
                      report.action_taken === 'DELETION'
                        ? 'bg-red-100 text-red-600'
                        : report.action_taken === 'NONE'
                        ? 'bg-green-100 text-green-600'
                        : report.action_taken === 'SUSPENSION'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {report.action_taken}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {report && (
        <DetailModal
          isOpen={isOpen}
          handleModal={handleModal}
          report={report}
        />
      )}
    </>
  );
};

export default Admin;

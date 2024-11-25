import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { laporanData } from '../../utils/laporan.utils';
import { GrUserWorker } from 'react-icons/gr';
import { FaRegUser, FaRegClock } from 'react-icons/fa';
import { jasaData } from '../../utils/jasa.utils';

const Admin = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = laporanData.filter(
    (laporan) =>
      laporan.penyediaJasa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laporan.namaPengguna.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const namaJasa = jasaData.map((jasa) => jasa.namaJasa);

  const handleClick = (id) => {
    navigate(`/admin/laporan/${id}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-start w-full my-20 ">
      {/* Search Fitur */}
      <div className="mb-8 w-full max-w-md flex gap-x-3">
        <input
          type="text"
          placeholder="Cari berdasarkan nama user atau jasa"
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Card */}
      <div className="w-full grid grid-cols-2 gap-5 p-4">
        {filteredData.map((laporan) => {
          return (
            <div
              key={laporan.id}
              className="w-full bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:scale-105 hover:shadow-xl duration-300"
              onClick={() => handleClick(laporan.id)}
            >
              {/* Title Laporan */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Laporan #{laporan.id}
              </h3>

              {/* Icon Penyedia Jasa */}
              <div className="flex items-center mb-2">
                <div className="flex items-center space-x-2">
                  <GrUserWorker size={20} className="text-yellow-500" />
                  <span className="text-gray-600 font-semibold">
                    {laporan.penyediaJasa}, {namaJasa[laporan.jasa_id]}
                  </span>
                </div>
              </div>

              {/* Tanggal */}
              <div className="flex items-center mb-2">
                <div className="flex items-center space-x-2">
                  <FaRegUser size={20} className="text-blue-500" />
                  <span className="text-gray-600 font-semibold">
                    {laporan.namaPengguna}
                  </span>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-2">
                  <FaRegClock size={20} className="text-blue-500" />
                  <span className="text-gray-600 font-semibold">
                    {laporan.tanggal}
                  </span>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Container Flex */}
              <div className="flex justify-between items-center">
                {/* Jenis Laporan */}
                <div className=" font-bold">{laporan.jenisLaporan}</div>
                {/* Status */}
                <span
                  className={`text-sm font-semibold py-1 px-3 rounded-full ${
                    laporan.status === 'Diblokir'
                      ? 'bg-red-100 text-red-600'
                      : laporan.status === 'Ditangguhkan'
                      ? 'bg-orange-100 text-orange-600'
                      : laporan.status === 'Peringatan'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {laporan.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;

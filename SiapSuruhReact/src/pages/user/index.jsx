import { IoLocationSharp } from 'react-icons/io5';
// import { jasaData } from '../../utils/jasa.utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { avatarURL } from '../../utils';
import { fetchWithAuth } from '../../api/fetchWithAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import ErrorPage from '../../components/ui/ErrorPage';

const fetchServices = async () => {
  const response = await fetchWithAuth('/services');
  console.log(response.data, '<<<<<<<<<<<');
  return response.data;
};

const HomepageUser = () => {
  //  TODO: FETCH FROM PROVIDER API
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = (id) => {
    navigate(`/user/home/service/${id}`);
  };

  const {
    data: services = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  const filteredData = (services || []).filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  console.log(services);
  console.log(filteredData);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start w-full my-20 ">
        {/* Lokasi */}
        <div className="mb-4">
          <p className="text-lg font-semibold flex items-center">
            <IoLocationSharp className="mr-1 -mt-1" /> Jakarta, Indonesia
          </p>
        </div>

        {/* Search Fitur */}
        <div className="mb-8 w-full max-w-md flex gap-x-3">
          <input
            type="text"
            placeholder="Cari berdasarkan nama jasa atau kategori"
            className="input input-bordered w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Card */}
        <div className="w-full grid grid-cols-2 gap-5 p-4">
          {/* Card */}
          {filteredData.map((jasa) => {
            return (
              <div
                key={jasa.id}
                className="w-full  bg-white shadow-lg rounded-lg p-8 flex items-center cursor-pointer hover:scale-105 hover:shadow-xl duration-300"
                onClick={() => handleClick(jasa.id)}
              >
                <div className="avatar">
                  <div className="size-24 rounded-full bg-gray-300">
                    <img src={avatarURL(jasa.id)} alt="user-img" />
                  </div>
                </div>
                <div className="ml-4 space-y-2">
                  <h3 className="text-xl font-semibold">{jasa.namaJasa}</h3>
                  <p className="font-semibold text-gray-600">
                    {jasa.nama},{' '}
                    <span className="font-normal">{jasa.lokasi}</span>
                  </p>
                  <p className="text-gray-600 overflow-hidden overflow-ellipsis line-clamp-2">
                    {jasa.deskripsi}
                  </p>
                  <span className="badge badge-outline mt-2">
                    {jasa.kategori}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomepageUser;

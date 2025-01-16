import { IoLocationSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import ErrorPage from '../../components/ui/ErrorPage';
import { useProvider } from '../../features/pengguna/hooks/useUserHooks';

const HomepageUser = () => {
  const navigate = useNavigate();
  const { isLoading, error, filteredData, searchQuery, setSearchQuery } =
    useProvider();

  const handleClick = (id) => {
    navigate(`/user/home/service/${id}`);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

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
          {filteredData.length > 0 ? (
            filteredData.map((provider) => (
              <div
                key={provider.id}
                className="w-full  bg-white shadow-lg rounded-lg p-8 flex items-center cursor-pointer hover:scale-105 hover:shadow-xl duration-300"
                onClick={() => handleClick(provider.id)}
              >
                <div className="avatar">
                  <div className="size-24 rounded-full bg-gray-300">
                    <img src={'/img-placeholder.svg'} alt="user-img" />
                  </div>
                </div>
                <div className="ml-4 space-y-2">
                  <h3 className="text-xl font-semibold">
                    {provider.Service.title}
                  </h3>
                  <p className="font-semibold text-gray-600">
                    {provider.provider_name},{' '}
                    <span className="font-normal capitalize">
                      {provider.provider_name}
                    </span>
                  </p>
                  <p className="text-gray-600 overflow-hidden overflow-ellipsis line-clamp-2">
                    {provider.Service?.description ??
                      'Provider does not have a description'}
                  </p>
                  {/* Render Categories
                  <div className="flex flex-wrap gap-2 mt-2">
                    {provider.Categories.map((category) => (
                      <span key={category.id} className="badge badge-outline">
                        {category.name ?? 'Unknown'}
                      </span>
                    ))}
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <p className="font-semibold">Jasa Tidak Ditemukan</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomepageUser;

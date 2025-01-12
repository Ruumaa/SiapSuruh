import { useParams } from 'react-router-dom';
import { useState } from 'react';
import FormModal from '../../../features/pengguna/components/formModal';
import { useProviderById } from '../../../features/pengguna/hooks/useUserHooks';
import ErrorPage from '../../../components/ui/ErrorPage';
import Loading from '../../../components/Loading';
import { IDRConverter } from '../../../utils/IDRConverter';
import Rating from '../../../components/ui/Rating';

const Layanan = () => {
  const { provider_id } = useParams();
  const { provider, isLoading, error } = useProviderById(provider_id);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div
        key={provider.id}
        className="w-full bg-base-100 shadow-xl rounded-xl p-8 max-w-4xl"
      >
        <div className="flex flex-row gap-8 items-start">
          {/* Left Section - Avatar and Rating */}
          <div className="flex flex-col justify-center items-center space-y-4 mt-20">
            <div className="avatar">
              <div className="size-44 rounded-full ring ring-primary ring-offset-2">
                <img
                  src={'/img-placeholder.svg'}
                  alt="user-img"
                  className="bg-gray-300"
                />
              </div>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col items-center">
              <Rating rating={provider.rating} />
              <div className="text-sm text-gray-600 mt-1">
                {provider.rating} (
                <span className="font-semibold">{provider.total_reviews}</span>{' '}
                reviews)
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-sans text-primary">
                {provider.Service?.title}
              </h3>
              <div className="flex items-center gap-2">
                <div className="badge badge-primary">
                  {provider.provider_name}
                </div>
                <span className="text-gray-600">{provider.User.address}</span>
              </div>
            </div>

            {/* Bio Section */}
            <div className="prose">
              <div className="card bg-base-200 p-4 shadow-sm">
                <h4 className="font-semibold mb-2">About Provider</h4>
                <p className="text-gray-700">
                  {provider?.bio ?? 'Provider does not have a bio'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="card bg-base-200 p-4 shadow-sm">
              <h4 className="font-semibold mb-2">Service Description</h4>
              <p className="text-gray-700">
                {provider.Service?.description ??
                  'Provider does not have a description'}
              </p>
              <p className="text-gray-700 text-sm font-semibold mt-3">
                Start from : {IDRConverter(provider.Service?.price)}
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {provider.Categories.map((category) => (
                <span key={category.id} className="badge p-3 badge-outline">
                  {category.name ?? 'Unknown'}
                </span>
              ))}
            </div>

            {/* Button */}
            <div className="flex justify-end mt-6">
              <button
                className="btn btn-primary gap-2 hover:text-white"
                onClick={handleModal}
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <FormModal
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        provider_id={provider.id}
        service_id={provider.Service.id}
      />
    </div>
  );
};

export default Layanan;

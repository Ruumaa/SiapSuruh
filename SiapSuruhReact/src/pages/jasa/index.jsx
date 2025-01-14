import Loading from '../../components/Loading';
import ErrorPage from '../../components/ui/ErrorPage';
import Rating from '../../components/ui/Rating';
import OrderCard from '../../features/jasa/components/OrderCard';
import { useProviderByUserId } from '../../features/jasa/hooks/providerHooks';
import { IDRConverter } from '../../utils/IDRConverter';

const HomepageJasa = () => {
  const user_id = localStorage.getItem('user_id');
  const { provider, isLoading, error } = useProviderByUserId(user_id);

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div
        key={provider.id}
        className="w-full my-20 bg-white shadow-lg rounded-lg p-8 items-center max-w-4xl"
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
          </div>
        </div>
        <div className="w-full mt-5">
          <h1 className="text-xl font-semibold">Riwayat Pesanan</h1>
          {/* Layanan Card */}
          {provider?.Order && <OrderCard orders={provider?.Order} />}
        </div>
      </div>
    </div>
  );
};

export default HomepageJasa;

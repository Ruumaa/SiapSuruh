import Loading from '../../../components/Loading';
import ErrorPage from '../../../components/ui/ErrorPage';
import PesananCard from '../../../features/pengguna/components/PesananCard';
import { useOrdersByUserId } from '../../../features/pengguna/hooks/useUserHooks';

const Pesanan = () => {
  const user_id = localStorage.getItem('user_id');
  const { orders, isLoading, error } = useOrdersByUserId(user_id);

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  const otherOrder = orders.filter(
    (order) => order.status === 'PENDING' || order.status === 'REJECTED'
  );
  const processedOrder = orders.filter(
    (order) => order.status === 'PROCCESSED'
  );
  const completedOrder = orders.filter((order) => order.status === 'COMPLETED');

  return (
    <div className="w-full flex items-start justify-center min-h-screen">
      <div className="w-full my-20 bg-white shadow-lg rounded-lg p-8  max-w-4xl">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold">Pesanan Berlangsung</h1>
          {/* Pesanan Card */}
          <PesananCard orders={processedOrder} />
        </div>
        <h1 className="text-2xl font-semibold mt-4">Pesanan Selesai</h1>
        <PesananCard orders={completedOrder} />
        <h1 className="text-2xl font-semibold mt-4">Pesanan Lainnya</h1>
        <PesananCard orders={otherOrder} />
      </div>
    </div>
  );
};

export default Pesanan;

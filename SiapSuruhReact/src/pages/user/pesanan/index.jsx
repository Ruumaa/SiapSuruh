import PesananCard from '../../../features/jasa/components/PesananCard';
import { pesananJasaData } from '../../../utils/pesananJasa.utils';

const Pesanan = () => {
  const pesananBerjalan = pesananJasaData.filter(
    (pesanan) => pesanan.status === 'Berjalan'
  );
  const pesananSelesai = pesananJasaData.filter(
    (pesanan) => pesanan.status === 'Selesai'
  );
  return (
    <div className="w-full flex items-start justify-center min-h-screen">
      <div className="w-full my-20 bg-white shadow-lg rounded-lg p-8  max-w-4xl">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold">Pesanan Berlangsung</h1>
          <PesananCard pesananJasaData={[pesananBerjalan[0]]} />
        </div>
        <h1 className="text-2xl font-semibold">Pesanan Selesai</h1>
        <PesananCard pesananJasaData={pesananSelesai} />
      </div>
    </div>
  );
};

export default Pesanan;

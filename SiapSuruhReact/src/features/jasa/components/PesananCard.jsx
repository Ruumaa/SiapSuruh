import { useState } from 'react';
import StatusButton from '../../../components/ui/StatusButton';
import { avatarURL, formatToIDR } from '../../../utils';
import ReviewModal from './ReviewModal';

const PesananCard = ({ pesananJasaData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pesanan, setPesanan] = useState();

  const handleModal = (id) => {
    setIsOpen(!isOpen);
    setPesanan(pesananJasaData.find((pesanan) => pesanan.id === id));
  };

  return (
    <>
      <div className="space-y-4 mt-5">
        {pesananJasaData.map((pesanan) => (
          <div
            key={pesanan.id}
            className="bg-white shadow-md rounded-lg w-full py-2 px-4 grid grid-cols-4 items-center font-semibold border border-gray-200 gap-4"
          >
            {/* Kategori */}
            <div className="text-left">{pesanan.kategori}</div>

            {/* Nama dan Avatar */}
            <div className="flex items-center gap-x-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-gray-300">
                  <img src={avatarURL(pesanan.id)} alt="user-img" />
                </div>
              </div>
              <h3>{pesanan.nama}</h3>
            </div>

            {/* Harga */}
            <div className="pl-20 text-left">{formatToIDR(pesanan.harga)}</div>

            {/* Status */}
            <div className="pl-20 justify-self-left">
              <StatusButton
                label={pesanan.status}
                onClick={() => handleModal(pesanan.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <ReviewModal
        isOpen={isOpen}
        handleModal={handleModal}
        pesanan={pesanan}
      />
    </>
  );
};

export default PesananCard;

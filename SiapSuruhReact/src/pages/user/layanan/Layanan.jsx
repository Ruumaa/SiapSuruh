import { useParams } from 'react-router-dom';
import { jasaData } from '../../../utils/jasa.utils';
import { avatarURL } from '../../../utils/avatar.utils';
import { useState } from 'react';
import FormModal from '../../../features/layanan/formModal';

const Layanan = () => {
  const { jasa_id } = useParams();
  const jasa = jasaData.find((jasa) => jasa.id === parseInt(jasa_id));

  const [paymentMethod, setPaymentMethod] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value); // Update the state with the selected value
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div
        key={jasa.id}
        className="w-full  bg-white shadow-lg rounded-lg p-8 flex items-center max-w-4xl "
      >
        <div className="avatar">
          <div className="size-44 rounded-full bg-gray-300">
            <img src={avatarURL(jasa.id)} alt="user-img" />
          </div>
        </div>
        <div className="ml-4 space-y-4">
          <h3 className="text-3xl font-semibold">{jasa.namaJasa}</h3>
          <p className="font-semibold text-gray-600 text-xl ">
            {jasa.nama}, <span className="font-normal">{jasa.lokasi}</span>
          </p>
          <p className="text-gray-600 text-lg">{jasa.deskripsi}</p>
          <div className="flex justify-between">
            <span className="badge badge-outline mt-2 ">{jasa.kategori}</span>
          </div>
          <div className=" justify-end flex">
            <button
              className="btn btn-primary items-center hover:text-white"
              onClick={() => {
                handleModal();
              }}
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <FormModal
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        paymentMethod={paymentMethod}
        handlePaymentMethod={handlePaymentMethod}
      />
    </div>
  );
};

export default Layanan;

import { useState } from 'react';
import StatusButton from '../../../components/ui/StatusButton';
import { FaLocationDot } from 'react-icons/fa6';
import { IDRConverter } from '../../../utils/IDRConverter';
import DetailsModalProvider from './DetailsModalProvider';

const OrderCard = ({ orders }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState();

  const handleModal = (id) => {
    setIsOpen(!isOpen);
    setOrder(orders.find((order) => order.id === id));
  };

  return (
    <>
      <div className="space-y-4 mt-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg w-full py-2 px-4 grid grid-cols-4 items-center font-semibold border border-gray-200 gap-4"
          >
            {/* Kategori */}
            <div className="text-left flex items-center">
              <FaLocationDot className="mr-2" /> {order.location}
            </div>

            {/* Nama dan Avatar */}
            <div className="flex items-center gap-x-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-gray-300">
                  <img src={'/img-placeholder.svg'} alt="user-img" />
                </div>
              </div>
              <h3 className="font-normal">
                {order.User.email} {/* <span>{order.Service.title}</span> */}
              </h3>
            </div>

            {/* Harga */}
            <div className="pl-20 text-left">
              {IDRConverter(order.total_price)}
            </div>

            {/* Status */}
            <div className="pl-20 justify-self-left">
              <StatusButton
                label={order.status}
                onClick={() => handleModal(order.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <DetailsModalProvider
        isOpen={isOpen}
        handleModal={handleModal}
        order={order}
      />
    </>
  );
};

export default OrderCard;
import { useState } from 'react';
import { useCreateReview } from '../hooks/useUserHooks';

const ReviewModal = ({
  isOpenReview,
  handleReviewModal,
  handleDetailsModal,
  handleEditOrderStatus,
  orderProps,
}) => {
  const [rating, setRating] = useState(5);
  const { user_id, provider_id, id } = orderProps;

  const handleRating = (e) => {
    setRating(parseInt(e.target.value));
  };

  const { mutate: createReview, isPending } = useCreateReview();

  const handleReview = (e) => {
    e.preventDefault();
    createReview({
      user_id,
      provider_id,
      rating,
    });
    handleEditOrderStatus(id, 'COMPLETED');
    setRating(5);
    handleReviewModal();
    handleDetailsModal();
  };

  return (
    <>
      {isOpenReview && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box p-6 rounded-lg shadow-lg border border-gray-200 max-w-[25rem] mx-auto">
            {/* Header */}
            <div className="items-center">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Berikan Ulasan
              </h2>
            </div>
            {/* Content */}
            <form onSubmit={handleReview}>
              <div className="w-full">
                <p className="text-gray-700 my-5">
                  Berikan rating dan ulasan Anda untuk layanan ini
                </p>
                {/* Rating Input */}
                <div className="rating rating-lg flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <input
                      key={value}
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-orange-400"
                      value={value}
                      checked={rating === value}
                      onChange={handleRating}
                    />
                  ))}
                </div>
              </div>
              {/* Buttons */}
              <div className="w-full flex gap-x-2 mt-5 items-center">
                <div className="w-1/2">
                  <button
                    type="button"
                    className="btn btn-sm w-full h-10 bg-gray-100 text-gray-600 hover:bg-gray-200"
                    onClick={() => {
                      handleReviewModal();
                      handleEditOrderStatus(id, 'COMPLETED');
                    }}
                  >
                    Tutup
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    className="btn btn-sm w-full h-10 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-100 disabled:text-gray-300"
                    type="submit"
                    disabled={rating === 0}
                  >
                    {isPending ? 'Loading...' : 'Kirim Ulasan'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;

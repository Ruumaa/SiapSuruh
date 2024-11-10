import PesananCard from '../../features/jasa/components/PesananCard';
import { avatarURL } from '../../utils/avatar.utils';
import { jasaData } from '../../utils/jasa.utils';

const HomepageJasa = () => {
  const jasa = jasaData[0];
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div
        key={jasa.id}
        className="w-full my-20 bg-white shadow-lg rounded-lg p-8 items-center max-w-4xl"
      >
        <div className="flex">
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
            <div className=" justify-end flex"></div>
          </div>
        </div>
        {/* Rating */}
        <div className="w-full mt-5">
          <h1 className="text-2xl font-semibold">Rating Saya</h1>
          <div className="flex items-center">
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-slate-300"
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <h1 className="text-2xl font-semibold">Riwayat Pesanan</h1>
          {/* Layanan Card */}
          <PesananCard />
        </div>
      </div>
    </div>
  );
};

export default HomepageJasa;

import { useState } from 'react';

const FormProfileJasa = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    namaJasa: '',
    bio: '',
    category: '',
    nohp: '',
    address: '',
    role: 'Pengguna',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
    console.log(formData);
  };
  return (
    <>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-lg w-[46rem] my-20"
      >
        <h2 className="text-2xl font-bold text-center">Perbarui Profile</h2>
        <div className="flex items-center justify-center w-full my-6">
          <div className="w-1/2 flex items-start justify-center h-full">
            <div className="size-60 rounded-full bg-gray-200 hover:cursor-pointer"></div>
          </div>
          <div className="w-1/2 space-y-6 ">
            {/* Nama */}
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered  focus:outline-none w-full "
            />
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered  focus:outline-none w-full "
            />
            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered  focus:outline-none w-full "
            />
            {/* Nama Jasa */}
            <input
              type="text"
              name="namaJasa"
              placeholder="Nama Jasa"
              value={formData.namaJasa}
              onChange={handleChange}
              className="input input-bordered  focus:outline-none w-full "
            />
            {/* Bio */}
            <textarea
              type="text"
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="textarea textarea-bordered  focus:outline-none w-full "
            />
            {/* Kategori */}
            <input
              type="text"
              name="category"
              placeholder="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered  focus:outline-none w-full "
            />
            {/* No HP */}
            <input
              type="tel"
              name="nohp"
              placeholder="Nomor Handphone"
              value={formData.nohp}
              onChange={handleChange}
              className="input input-bordered  focus:outline-none w-full "
            />
            {/* Alamat */}
            <input
              type="text"
              name="address"
              placeholder="Alamat"
              value={formData.address}
              onChange={handleChange}
              className="input input-bordered  focus:outline-none w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn w-full btn-primary hover:text-white"
        >
          Simpan
        </button>
      </form>
    </>
  );
};

export default FormProfileJasa;

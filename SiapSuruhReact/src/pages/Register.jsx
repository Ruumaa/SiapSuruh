import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
    navigate('/');
    console.log(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-lg w-full max-w-md space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-center">Daftar</h2>
          <p className="text-center text-gray-600">
            Jadilah bagian dari <span className="font-bold">SiapSuruh.</span>
          </p>
        </div>
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

        {/* Role */}
        <div className="form-control w-full">
          <label className="label font-semibold">Daftar Sebagai:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="role"
                value="Pengguna"
                checked={formData.role === 'Pengguna'}
                onChange={handleChange}
                className="radio radio-black dark:radio-white"
              />
              <span>Pengguna</span>
            </label>
            <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="role"
                value="Jasa"
                checked={formData.role === 'Jasa'}
                onChange={handleChange}
                className="radio radio-black dark:radio-white"
              />
              <span>Jasa</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full btn-primary hover:text-white"
        >
          Daftar
        </button>
      </form>
    </div>
  );
};

export default Register;

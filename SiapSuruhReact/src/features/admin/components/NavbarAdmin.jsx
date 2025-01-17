import { HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const NavbarAdmin = ({ handleLogout }) => {
  return (
    <nav className="navbar w-full bg-black text-white max-w-sm mx-auto md:max-w-2xl xl:max-w-6xl flex justify-between items-center">
      <Link to={'/admin'} className="font-bold text-2xl font-sans">
        SiapSuruh<span className="text-gray-400 font-sans">Admin</span>.
      </Link>
      <div className="flex items-center gap-x-4">
        <div onClick={handleLogout} className="btn bg-white btn-sm h-10">
          Logout <HiOutlineLogout className="size-5" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;

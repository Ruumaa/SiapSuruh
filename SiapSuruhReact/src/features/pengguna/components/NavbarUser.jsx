import { HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const NavbarUser = ({ handleLogout }) => {
  return (
    <nav className="navbar w-full bg-black text-white max-w-sm mx-auto md:max-w-2xl xl:max-w-6xl flex justify-between items-center">
      <Link to={'/user/home'} className="font-bold text-2xl font-sans">
        SiapSuruh.
      </Link>
      <div className="flex items-center gap-x-4">
        <Link className="btn btn-ghost btn-sm h-10" to="/user/home/pesanan">
          Pesanan
        </Link>
        <Link className="btn btn-ghost btn-sm h-10" to="/user/home/profile">
          Profile
        </Link>
        <div onClick={handleLogout} className="btn bg-white btn-sm h-10">
          Logout <HiOutlineLogout className="size-5" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;

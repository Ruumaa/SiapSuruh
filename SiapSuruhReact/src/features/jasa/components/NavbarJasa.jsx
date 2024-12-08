import { HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const NavbarJasa = () => {
  return (
    <nav className="navbar w-full bg-black text-white max-w-sm mx-auto md:max-w-2xl xl:max-w-6xl flex justify-between items-center">
      <Link to={'/provider/home'} className="font-bold text-2xl font-sans">
        SiapSuruh.
      </Link>
      <div className="flex items-center gap-x-4">
        <Link className="btn btn-ghost btn-sm h-10" to="/provider/home/profile">
          Profile
        </Link>
        <Link to="/" className="btn bg-white btn-sm h-10">
          Logout <HiOutlineLogout className="size-5" />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarJasa;

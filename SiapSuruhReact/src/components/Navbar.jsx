import { Link, useLocation } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import NavbarAdmin from '../features/admin/components/NavbarAdmin';

const Navbar = () => {
  const location = useLocation();
  const isUser = location.pathname.startsWith('/user/home');
  const isProvider = location.pathname.startsWith('/provider/home');
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="w-full shadow-lg bg-black">
      {isAdmin ? (
        <NavbarAdmin />
      ) : (
        <nav className="navbar w-full bg-black text-white max-w-sm mx-auto md:max-w-2xl xl:max-w-6xl flex justify-between items-center">
          <Link
            to={isUser ? '/user/home' : isProvider ? '/provider/home' : '/'}
            className="font-bold text-2xl font-sans"
          >
            SiapSuruh.
          </Link>
          <div className="flex items-center gap-x-4">
            {isUser && (
              <Link
                className="btn btn-ghost btn-sm h-10"
                to="/user/home/pesanan"
              >
                Pesanan
              </Link>
            )}
            {isUser || isProvider ? (
              <Link to="/" className="btn bg-white btn-sm h-10">
                Logout <HiOutlineLogout className="size-5" />
              </Link>
            ) : (
              ''
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;

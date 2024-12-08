import { Link, useLocation } from 'react-router-dom';
import NavbarAdmin from '../features/admin/components/NavbarAdmin';
import NavbarUser from '../features/pengguna/components/NavbarUser';
import NavbarJasa from '../features/jasa/components/NavbarJasa';

const Navbar = () => {
  const location = useLocation();
  const isUser = location.pathname.startsWith('/user/home');
  const isProvider = location.pathname.startsWith('/provider/home');
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="w-full shadow-lg bg-black">
      {isAdmin ? (
        <NavbarAdmin />
      ) : isUser ? (
        <NavbarUser />
      ) : isProvider ? (
        <NavbarJasa />
      ) : (
        <nav className="navbar w-full bg-black text-white max-w-sm mx-auto md:max-w-2xl xl:max-w-6xl flex justify-between items-center">
          <Link to={'/'} className="font-bold text-2xl font-sans">
            SiapSuruh.
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Navbar;

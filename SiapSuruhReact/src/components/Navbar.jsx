// import { useLocation } from 'react-router-dom';
import NavbarAdmin from '../features/admin/components/NavbarAdmin';
import NavbarUser from '../features/pengguna/components/NavbarUser';
import NavbarJasa from '../features/jasa/components/NavbarJasa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const isUser = localStorage.getItem('role') === 'USER';
  const isProvider = localStorage.getItem('role') === 'PROVIDER';
  const isAdmin = localStorage.getItem('role') === 'ADMIN';
  return (
    <div className="w-full shadow-lg bg-black">
      {isAdmin ? (
        <NavbarAdmin handleLogout={handleLogout} />
      ) : isUser ? (
        <NavbarUser handleLogout={handleLogout} />
      ) : isProvider ? (
        <NavbarJasa handleLogout={handleLogout} />
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

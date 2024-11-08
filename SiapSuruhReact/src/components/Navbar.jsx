import { Link, useLocation } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';

const Navbar = () => {
  const location = useLocation();
  const isUser = location.pathname.startsWith('/user/home');
  const isProvider = location.pathname.startsWith('/provider/home');
  return (
    <div className="w-full shadow-lg bg-black">
      <nav className="navbar w-full bg-black text-white max-w-sm mx-auto md:max-w-2xl xl:max-w-6xl flex justify-between items-center">
        <Link
          to={isUser ? '/user/home' : isProvider ? '/provider/home' : '/'}
          className="font-bold text-2xl font-sans"
        >
          SiapSuruh.
        </Link>
        {isUser || isProvider ? (
          <Link to="/" className="btn bg-white btn-sm h-10">
            Logout <HiOutlineLogout className="size-5" />
          </Link>
        ) : (
          ''
        )}
      </nav>
    </div>
  );
};

export default Navbar;

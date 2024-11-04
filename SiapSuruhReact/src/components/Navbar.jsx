import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full shadow-lg bg-black">
      <nav className="navbar w-full bg-black text-white max-w-sm mx-auto md:max-w-2xl xl:max-w-6xl flex justify-between items-center">
        <Link to={'/'} className="font-bold text-2xl font-sans">
          SiapSuruh.
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;

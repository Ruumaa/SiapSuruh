import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import MainLayout from './components/MainLayout';
import LoginUser from './pages/auth/LoginUser';
import LoginJasa from './pages/auth/LoginJasa';
import Register from './pages/auth/Register';
import HomepageJasa from './pages/jasa';
import HomepageUser from './pages/user';
import Layanan from './pages/user/layanan';
import Admin from './pages/admin';
import Pesanan from './pages/user/pesanan';
import ProfileUser from './pages/user/profile';
import ProfileJasa from './pages/jasa/profile';
import RequireAuth from './middleware/requireAuth';

const App = () => {
  return (
    <Router>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/provider/login" element={<LoginJasa />} />

          {/* Jasa */}
          <Route element={<RequireAuth allowedRoles={['PROVIDER']} />}>
            <Route path="/provider/home" element={<HomepageJasa />} />
            <Route path="/provider/home/profile" element={<ProfileJasa />} />
          </Route>

          {/* User */}
          <Route element={<RequireAuth allowedRoles={['USER']} />}>
            <Route path="/user/home" element={<HomepageUser />} />
            <Route path="/user/home/pesanan" element={<Pesanan />} />
            <Route
              path="/user/home/service/:provider_id"
              element={<Layanan />}
            />
            <Route path="/user/home/profile" element={<ProfileUser />} />
          </Route>

          {/* Admin */}
          <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;

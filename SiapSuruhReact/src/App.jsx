import Navbar from './components/Navbar';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/provider/login" element={<LoginJasa />} />
          <Route path="/provider/home" element={<HomepageJasa />} />
          <Route path="/user/home" element={<HomepageUser />} />
          <Route path="/user/home/pesanan" element={<Pesanan />} />
          <Route path="/user/home/service/:provider_id" element={<Layanan />} />
          <Route path="/admin/dashboard" element={<Admin />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;

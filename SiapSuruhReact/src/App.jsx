import Navbar from './components/Navbar';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './components/MainLayout';
import LoginUser from './pages/LoginUser';
import LoginJasa from './pages/LoginJasa';
import Register from './pages/Register';
import HomepageJasa from './pages/jasa/HomepageJasa';
import HomepageUser from './pages/user/HomepageUser';
import Layanan from './pages/user/layanan/Layanan';
import Admin from './pages/admin/admin';

const App = () => {
  return (
    <Router>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/login-jasa" element={<LoginJasa />} />
          <Route path="/home-jasa" element={<HomepageJasa />} />
          <Route path="/home-user" element={<HomepageUser />} />
          <Route path="/home-user/layanan/:jasa_id" element={<Layanan />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;

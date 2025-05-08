import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8001/api/auth/logout', {}, { withCredentials: true });
      logout();
      navigate('/login');
    } catch (err) {
      alert('Đăng xuất thất bại!');
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Fakebook</Link>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Trang chủ</Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">Trang cá nhân</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Đăng nhập</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">Đăng ký</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 transition">Đăng xuất</button>
          )}
        </div>
      </div>
    </nav>
  );
}

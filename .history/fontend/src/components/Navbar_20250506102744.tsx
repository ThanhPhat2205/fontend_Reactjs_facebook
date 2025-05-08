import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Facebook</Link>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Trang chủ</Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">Trang cá nhân</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Đăng nhập</Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">Đăng ký</Link>
        </div>
      </div>
    </nav>
  );
}

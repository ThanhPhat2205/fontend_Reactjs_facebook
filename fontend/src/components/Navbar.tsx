import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">Fakebook</Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Trang chủ</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">Trang cá nhân</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Đăng nhập</Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-600">Đăng ký</Link>
      </div>
    </nav>
  );
}
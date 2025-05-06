import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; 
  bio: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu trùng khớp
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    try {
      await axios.post('http://localhost:8001/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        bio: formData.bio
      }, {
        withCredentials: true
      });

      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đăng ký thất bại! Email có thể đã tồn tại.';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký tài khoản</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Họ và tên</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-gray-700">Nhập lại mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Giới thiệu</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng ký
          </button>
        </form>

        <p className="mt-4 text-center">
          Đã có tài khoản? <a href="/login" className="text-blue-500">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import defaultAvatar from '../assets/default-avatar.png';

interface UserDto {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<UserDto>('http://localhost:8001/api/auth/me', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        alert('Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Đang tải thông tin...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-red-500">Không có dữ liệu người dùng</div>;
  }

 

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center space-x-6">
        <img
          src={user.avatarUrl || defaultAvatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {user.role}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Tiểu sử</h3>
        <p className="text-gray-700">{user.bio || 'Chưa có tiểu sử.'}</p>
      </div>
    </div>
  );
}

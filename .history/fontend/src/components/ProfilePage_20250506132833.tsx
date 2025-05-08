import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import defaultAvatar from '../assets/images.png';

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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<UserDto>('http://localhost:8001/api/auth/me', {
          withCredentials: true,
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          bio: response.data.bio || '',
        });
      } catch (error) {
        alert('Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('bio', formData.bio);
      if (avatarFile) {
        form.append('avatar', avatarFile);
      }

      const response = await axios.put<UserDto>(
        `http://localhost:8001/api/users/${user.id}`,
        form,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setUser(response.data);
      setIsEditing(false);
      setAvatarFile(null);
      setPreviewUrl(null);
      alert('Cập nhật thành công');
    } catch (error) {
      alert('Lỗi khi cập nhật thông tin');
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Đang tải thông tin...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-red-500">Không có dữ liệu người dùng</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      {!isEditing ? (
        <>
          <div className="flex items-center space-x-6">
            <img
              src={user.avatarUrl || defaultAvatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {user.role}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="ml-4 mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Chỉnh sửa thông tin
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Tiểu sử</h3>
            <p className="text-gray-700">{user.bio || 'Chưa có tiểu sử.'}</p>
          </div>
        </>
      ) : (
        <div>
          <div className="flex items-center space-x-6">
            <img
              src={previewUrl || user.avatarUrl || defaultAvatar}
              alt="Avatar Preview"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="Tên"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="Email"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder="Tiểu sử"
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Lưu
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setAvatarFile(null);
                setPreviewUrl(null);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

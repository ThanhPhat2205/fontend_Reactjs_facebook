import { useEffect, useState, ChangeEvent, useRef } from 'react';
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

interface UserUpdateRequest {
  name: string;
  email: string;
  bio: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserUpdateRequest>({
    name: '',
    email: '',
    bio: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        console.error('Error fetching user:', error);
        alert('Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Tạo URL preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!user) return;
  
    try {
      const form = new FormData();
  
      // Đúng tên là 'data' như trong @RequestPart("data")
      form.append('data', new Blob([JSON.stringify({
        name: formData.name,
        email: formData.email,
        bio: formData.bio
      })], { type: 'application/json' }));
  
      // Tên 'file' phải đúng với @RequestPart(value = "file")
      if (avatarFile) {
        form.append('file', avatarFile);
      }
  
      const response = await axios.put<UserDto>(
        `http://localhost:8001/api/users/${user.id}`,
        form,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        bio: response.data.bio || '',
      });
      setIsEditing(false);
      setAvatarFile(null);
      setPreviewUrl(null);
  
      alert('Cập nhật thành công');
    } catch (error) {
      console.error('Update error:', error);
      alert('Lỗi khi cập nhật thông tin');
    }
  };

  const handleCancel = () => {
    if (!user) return;
    
    
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio || '',
    });
    setAvatarFile(null);
    setPreviewUrl(null);
    setIsEditing(false);
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
        // Chế độ xem
        <>
          <div className="flex items-center space-x-6">
          <img
            src={user.avatarUrl ? `http://localhost:8001${user.avatarUrl}` : defaultAvatar}
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
        // Chế độ chỉnh sửa
        <div>
          <div className="flex items-center space-x-6 mb-4">
            <div className="relative">
            <img
  src={
    previewUrl ||
    (user.avatarUrl ? `http://localhost:8001${user.avatarUrl}?t=${new Date().getTime()}` : defaultAvatar)
  }
  alt="Avatar Preview"
  className="w-32 h-32 rounded-full object-cover border cursor-pointer"
  onClick={triggerFileInput}
/>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div>
              <button
                onClick={triggerFileInput}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Thay đổi ảnh đại diện
              </button>
              <p className="text-sm text-gray-500 mt-2">
                {avatarFile ? avatarFile.name : 'Chưa chọn ảnh mới'}
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiểu sử</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
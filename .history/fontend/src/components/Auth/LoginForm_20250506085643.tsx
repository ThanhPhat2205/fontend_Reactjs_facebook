import { useState } from 'react';
import { login } from '../../services/authService';
import { LoginRequest } from '../../types/user';

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(formData);
      onLoginSuccess(user);
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields same as before */}
    </form>
  );
}
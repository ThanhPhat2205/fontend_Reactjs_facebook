import api from './api';
import { User, LoginRequest, RegisterRequest } from '../';

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};
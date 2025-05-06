import api from './api';
import { Post, CreatePostRequest, LikePostResponse } from '../types/post';

export const getPosts = async (page = 1, limit = 10): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts', {
    params: { page, limit }
  });
  return response.data;
};

export const createPost = async (data: CreatePostRequest): Promise<Post> => {
  const formData = new FormData();
  formData.append('content', data.content);
  
  if (data.image) {
    formData.append('image', data.image);
  }

  const response = await api.post<Post>('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const likePost = async (postId: number): Promise<LikePostResponse> => {
  const response = await api.post<LikePostResponse>(`/posts/${postId}/like`);
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  await api.delete(`/posts/${postId}`);
};

export const getPostById = async (postId: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${postId}`);
  return response.data;
};

// Additional methods for comments
export const addComment = async (postId: number, content: string): Promise<Comment> => {
  const response = await api.post<Comment>(`/posts/${postId}/comments`, { content });
  return response.data;
};
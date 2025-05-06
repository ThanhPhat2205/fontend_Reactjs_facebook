export interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    role: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest extends LoginRequest {
    name: string;
    bio?: string;
  }
  
  // src/types/post.ts
  export interface Post {
    id: number;
    content: string;
    userId: number;
    createdAt: string;
    user: User;
  }
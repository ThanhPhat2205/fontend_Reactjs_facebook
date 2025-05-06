export interface Post {
    id: number;
    content: string;
    userId: number;
    createdAt: string;
    imageUrl?: string;
    likesCount: number;
    commentsCount: number;
    user: {
      id: number;
      name: string;
      avatarUrl?: string;
    };
  }
  
  export interface CreatePostRequest {
    content: string;
    image?: File; // Optional file upload
  }
  
  export interface LikePostResponse {
    likesCount: number;
    isLiked: boolean;
  }
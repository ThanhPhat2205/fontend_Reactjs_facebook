import { useEffect, useState } from 'react';
import { getPosts, likePost, deletePost } from '../services/postService';
import { Post } from '../types/post';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleLike = async (postId: number) => {
    try {
      const updatedPost = await likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likesCount: updatedPost.likesCount } 
          : post
      ));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (loading) return <div>Loading posts...</div>;

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-3">
            <img 
              src={post.user.avatarUrl || '/default-avatar.png'} 
              alt={post.user.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">{post.user.name}</span>
          </div>
          
          <p className="mb-3">{post.content}</p>
          
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt="Post content" 
              className="w-full rounded mb-3"
            />
          )}
          
          <div className="flex justify-between text-gray-500">
            <button 
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <span>👍</span>
              <span>{post.likesCount}</span>
            </button>
            
            <button 
              onClick={() => handleDelete(post.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
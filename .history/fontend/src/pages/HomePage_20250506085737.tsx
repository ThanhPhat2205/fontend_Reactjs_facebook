
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';
import { User, Post } from '../types';
import CreatePost from '../components/Post/CreatePost';
import PostList from '../components/Post/PostList';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        // const postsResponse = await getPosts(); 
        setCurrentUser(user);
        // setPosts(postsResponse);
      } catch {
        window.location.href = '/login';
      }
    };
    fetchData();
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {currentUser.name}!
      </h1>
      
      <CreatePost 
        onPostCreated={(newPost) => setPosts([newPost, ...posts])} 
      />
      
      <PostList posts={posts} />
    </div>
  );
}
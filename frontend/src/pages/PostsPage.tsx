import { useState, useEffect } from 'react';
import { postsApi, usersApi } from '../services/api';
import type { Post, User } from '../types';
import PostList from '../components/PostList';
import './PostsPage.css';

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [postsData, usersData] = await Promise.all([
        postsApi.getAll(),
        usersApi.getAll()
      ]);
      setPosts(postsData);
      setUsers(usersData);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="posts-page">
        <div className="container">
          <div className="loading">Loading posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <div className="container">
        <div className="page-header">
          <h1>Posts Management</h1>
          <p className="page-subtitle">
            View and manage all posts from users
          </p>
        </div>

        {error && (
          <div className="error">
            {error}
            <button onClick={loadData} className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
              Retry
            </button>
          </div>
        )}

        <PostList posts={posts} users={users} />
      </div>
    </div>
  );
};

export default PostsPage;

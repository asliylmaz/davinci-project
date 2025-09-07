import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usersApi, postsApi } from '../services/api';
import type { User, Post } from '../types';
import PostList from '../components/PostList';
import './UserDetailPage.css';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadUserData(parseInt(id));
    }
  }, [id]);

  const loadUserData = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const [userData, userPosts] = await Promise.all([
        usersApi.getById(userId),
        postsApi.getByUserId(userId)
      ]);
      setUser(userData);
      setPosts(userPosts);
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-detail-page">
        <div className="container">
          <div className="loading">Loading user details...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-detail-page">
        <div className="container">
          <div className="error">
            {error || 'User not found'}
            <Link to="/users" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/users">Users</Link>
          <span> / </span>
          <span>{user.name}</span>
        </div>

        <div className="user-profile">
          <div className="user-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-username">@{user.username}</p>
            <p className="user-email">{user.email}</p>
            <p className="user-id">ID: #{user.id}</p>
          </div>
        </div>

        <div className="user-posts-section">
          <h2>Posts by {user.name}</h2>
          <p className="posts-count">{posts.length} posts</p>
          
          {posts.length > 0 ? (
            <PostList posts={posts} users={[user]} />
          ) : (
            <div className="empty-state">
              <h3>No posts found</h3>
              <p>This user hasn't written any posts yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;

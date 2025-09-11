import { Link } from 'react-router-dom';
import { memo } from 'react';
import type { Post, User } from '../types';
import './PostList.css';

interface PostListProps {
  posts: Post[];
  users: User[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const PostListComponent = ({ posts, users, onEdit, onDelete }: PostListProps) => {
  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No posts found</h3>
        <p>There are no posts to display.</p>
      </div>
    );
  }

  return (
    <div className="posts-list">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <h3 className="post-title">{post.title}</h3>
            <span className="post-id">#{post.id}</span>
          </div>
          
          <div className="post-meta">
            <span className="post-author">
              Author: <Link to={`/users/${post.userId}`}>{getUserName(post.userId)}</Link>
            </span>
            <span className="post-user-id">User ID: {post.userId}</span>
          </div>
          
          {post.body && (
            <div className="post-body">
              <p>{post.body}</p>
            </div>
          )}
          
          <div className="post-actions">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(post)}
            >
              Edit
            </button>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const areEqual = (prev: PostListProps, next: PostListProps) => {
  if (prev.posts.length !== next.posts.length || prev.users.length !== next.users.length) return false;
  // Shallow compare ids to avoid costly deep checks
  const prevPostIds = prev.posts.map(p => p.id).join(',');
  const nextPostIds = next.posts.map(p => p.id).join(',');
  const prevUserIds = prev.users.map(u => u.id).join(',');
  const nextUserIds = next.users.map(u => u.id).join(',');
  return prevPostIds === nextPostIds && prevUserIds === nextUserIds && prev.onEdit === next.onEdit && prev.onDelete === next.onDelete;
};

const PostList = memo(PostListComponent, areEqual);

export default PostList;

import { useState, useEffect } from 'react';
import type { Post, CreatePostDto, UpdatePostDto } from '../types';
import './PostForm.css';

interface PostFormProps {
  post?: Post | null;
  users: Array<{ id: number; name: string }>;
  onSubmit: (postData: CreatePostDto | UpdatePostDto) => void;
  onCancel: () => void;
}

const PostForm = ({ post, users, onSubmit, onCancel }: PostFormProps) => {
  const [formData, setFormData] = useState({
    userId: 1,
    title: '',
    body: ''
  });

  useEffect(() => {
    if (post) {
      setFormData({
        userId: post.userId,
        title: post.title,
        body: post.body || ''
      });
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'userId' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="post-form">
      <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="userId" className="form-label">
              Author *
            </label>
            <select
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="form-input"
              required
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter post title"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="body" className="form-label">
            Content
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Enter post content"
            rows={8}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {post ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

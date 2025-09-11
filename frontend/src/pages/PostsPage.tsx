import { useState, useEffect } from 'react';
import { postsApi, usersApi } from '../services/api';
import type { Post, User, CreatePostDto, UpdatePostDto } from '../types';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import './PostsPage.css';
import { useToast } from '../components/Toast';

const PostsPage = () => {
  const { show } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

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

  const handleCreatePost = async (postData: CreatePostDto) => {
    try {
      const newPost = await postsApi.create(postData);
      setPosts(prev => [...prev, { ...newPost, id: Date.now() }]); // Simulate new ID
      setShowModal(false);
      show('Post created successfully');
    } catch (err) {
      setError('Failed to create post');
      console.error('Error creating post:', err);
    }
  };

  const handleUpdatePost = async (id: number, postData: UpdatePostDto) => {
    try {
      const updatedPost = await postsApi.update(id, postData);
      setPosts(prev => prev.map(post => 
        post.id === id ? { ...post, ...updatedPost } : post
      ));
      setEditingPost(null);
      setShowModal(false);
      show('Post updated successfully');
    } catch (err) {
      setError('Failed to update post');
      console.error('Error updating post:', err);
    }
  };

  const handleDeletePost = async (id: number) => {
    setConfirmId(id);
  };
  const confirmDelete = async () => {
    if (confirmId == null) return;
    try {
      await postsApi.delete(confirmId);
      setPosts(prev => prev.filter(post => post.id !== confirmId));
      setConfirmId(null);
      show('Post deleted successfully', 'info');
    } catch (err) {
      setError('Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setShowModal(true);
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setShowModal(true);
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
          <div>
            <h1>Posts Management</h1>
          </div>
          <button 
            className="btn btn-primary"
            onClick={openCreateModal}
          >
            + Add New Post
          </button>
        </div>

        {error && (
          <div className="error">
            {error}
            <button onClick={loadData} className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
              Retry
            </button>
          </div>
        )}

        <PostList 
          posts={posts} 
          users={users} 
          onEdit={openEditModal}
          onDelete={handleDeletePost}
        />

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <PostForm
              post={editingPost}
              users={users}
              onSubmit={(data: CreatePostDto | UpdatePostDto) => {
                if (editingPost) {
                  handleUpdatePost(editingPost.id, data as UpdatePostDto);
                } else {
                  handleCreatePost(data as CreatePostDto);
                }
              }}
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        )}

        {confirmId !== null && (
          <ConfirmModal
            title="Delete Post"
            message="This action cannot be undone. Are you sure?"
            confirmText="Delete"
            onConfirm={confirmDelete}
            onCancel={() => setConfirmId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PostsPage;

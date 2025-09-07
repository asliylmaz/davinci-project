import { useState, useEffect } from 'react';
import { usersApi } from '../services/api';
import type { User } from '../types';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await usersApi.getAll();
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: Omit<User, 'id'>) => {
    try {
      const newUser = await usersApi.create(userData);
      setUsers(prev => [...prev, { ...newUser, id: Date.now() }]); // Simulate new ID
      setShowModal(false);
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    try {
      const updatedUser = await usersApi.update(id, userData);
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, ...updatedUser } : user
      ));
      setEditingUser(null);
      setShowModal(false);
    } catch (err) {
      setError('Failed to update user');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersApi.delete(id);
        setUsers(prev => prev.filter(user => user.id !== id));
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="users-page">
        <div className="container">
          <div className="loading">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="container">
        <div className="page-header">
          <h1>Users Management</h1>
          <button 
            className="btn btn-primary"
            onClick={openCreateModal}
          >
            + Add New User
          </button>
        </div>

        {error && (
          <div className="error">
            {error}
            <button onClick={loadUsers} className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
              Retry
            </button>
          </div>
        )}

        <div className="users-grid">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={() => openEditModal(user)}
              onDelete={() => handleDeleteUser(user.id)}
            />
          ))}
        </div>

        {users.length === 0 && !loading && (
          <div className="empty-state">
            <h3>No users found</h3>
            <p>Click "Add New User" to create your first user.</p>
          </div>
        )}

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? 
                (data) => handleUpdateUser(editingUser.id, data) :
                handleCreateUser
              }
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default UsersPage;

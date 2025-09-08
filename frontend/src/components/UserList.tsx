import { Link } from 'react-router-dom';
import type { User } from '../types';
import UserCard from './UserCard';
import './UserList.css';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
  error?: string | null;
}

const UserList = ({ users, onEdit, onDelete, loading, error }: UserListProps) => {
  if (loading) {
    return (
      <div className="user-list">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="user-list">
        <div className="empty-state">
          <h3>No users found</h3>
          <p>There are no users to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-grid">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => onEdit(user)}
            onDelete={() => onDelete(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;

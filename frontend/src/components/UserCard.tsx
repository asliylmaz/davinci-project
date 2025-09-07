import { Link } from 'react-router-dom';
import type { User } from '../types';
import './UserCard.css';

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-username">@{user.username}</p>
        </div>
      </div>
      
      <div className="user-card-body">
        <div className="user-detail">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="user-detail">
          <span className="detail-label">ID:</span>
          <span className="detail-value">#{user.id}</span>
        </div>
      </div>
      
      <div className="user-card-actions">
        <Link 
          to={`/users/${user.id}`} 
          className="btn btn-primary btn-sm"
        >
          View Posts
        </Link>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={onEdit}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;

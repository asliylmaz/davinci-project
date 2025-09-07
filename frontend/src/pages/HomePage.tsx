import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-container">
        <h1 className="homepage-title">Welcome to User & Post Management</h1>
        <p className="homepage-subtitle">
          Manage users and their posts
        </p>
        
        <div className="homepage-links">
          <Link to="/users" className="homepage-link users-link">
            <div className="link-icon">👥</div>
            <div className="link-content">
              <h3>Users</h3>
              <p>View, create, edit and delete users</p>
            </div>
          </Link>
          
          <Link to="/posts" className="homepage-link posts-link">
            <div className="link-icon">📝</div>
            <div className="link-content">
              <h3>Posts</h3>
              <p>View, create, edit and delete posts</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

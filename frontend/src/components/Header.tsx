import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">📊</span>
          <span className="logo-text">UserPost Manager</span>
        </Link>
        
        <nav className="header-nav">
          <Link 
            to="/users" 
            className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}
          >
            Users
          </Link>
          <Link 
            to="/posts" 
            className={`nav-link ${location.pathname === '/posts' ? 'active' : ''}`}
          >
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

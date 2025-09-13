import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import UserDetailPage from './pages/UserDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';

function App() {
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://davinci-project-backend.onrender.com/api/health")
        .then(() => console.log("Backend keep-alive ping sent"))
        .catch(err => console.error("Keep-alive failed:", err));
    }, 5 * 60 * 1000); // 5 dakika

    return () => clearInterval(interval);
  }, []);
  
  return (
    <Router>
      <ErrorBoundary>
        <ToastProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:id" element={<UserDetailPage />} />
                <Route path="/posts" element={<PostsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

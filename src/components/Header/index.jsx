import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">EcoLeague</Link>
        </div>
        <nav>
          <Link to="/mission-control-dashboard">Dashboard</Link>
          <Link to="/quest-map">Quest Map</Link>
          <Link to="/learning-arena">Learning Arena</Link>
          <Link to="/community-impact-hub">Community Hub</Link>
          <Link to="/achievement-gallery">Achievements</Link>
          <Link to="/ngo-list">NGOs</Link>
        </nav>
        <div className="user-info">
          {currentUser ? (
            <>
              <span>{currentUser.email}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
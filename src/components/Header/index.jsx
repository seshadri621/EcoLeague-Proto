import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
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
          <p>EcoLeague</p>
        </div>
        <div className="user-info">
          {currentUser ? (
            <>
              <span>{currentUser.email}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <p>Guest</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { auth } from '../../../public/firebase'; // Adjust the path as needed
import { signOut } from 'firebase/auth';

const Profile = () => {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login.html';
    } catch (error) {
      console.error("Logout Error:", error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Profile Page</h1>
      <p>Welcome to your profile page!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

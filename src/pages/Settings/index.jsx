
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Settings = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <button 
        onClick={toggleTheme} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default Settings;

import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import { auth } from '../../../public/firebase';
import { signOut } from 'firebase/auth';

const Settings = () => {

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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Settings - EcoQuest</title>
        <meta name="description" content="Your EcoQuest settings page." />
      </Helmet>
      <Header />
      <main className="pt-16 max-w-4xl mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <label htmlFor="notifications" className="text-lg text-gray-600">Email Notifications</label>
                    <input type="checkbox" id="notifications" className="form-checkbox h-6 w-6 text-primary" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="privacy" className="text-lg text-gray-600">Public Profile</label>
                    <input type="checkbox" id="privacy" className="form-checkbox h-6 w-6 text-primary" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="theme" className="text-lg text-gray-600">Dark Mode</label>
                    <input type="checkbox" id="theme" className="form-checkbox h-6 w-6 text-primary" />
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
      </main>
      <footer className="bg-forest text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <p className="font-body">
            &copy; {new Date().getFullYear()} EcoQuest. Empowering environmental heroes worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Settings;

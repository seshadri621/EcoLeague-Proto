import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button } from 'components/ui';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
  const [level, setLevel] = useState('');
  const [points, setPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(data);
          setUsername(data?.username || '');
          setLevel(data?.level || 'Beginner');
          setPoints(data?.points || 0);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    const updates = {
      id: user.id,
      username,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setProfile(prev => ({ ...prev, username }));
      setIsEditing(false);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="flex justify-center">
         <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} session={null} />
      </div>
    );
  }

  return (
      <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Profile'}</Button>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Level:</strong> {level}</p>
          <p><strong>Points:</strong> {points}</p>
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
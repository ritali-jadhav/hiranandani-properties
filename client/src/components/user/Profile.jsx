import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', {
        name: profile.name,
        currentPassword: profile.currentPassword,
        newPassword: profile.newPassword
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={profile.email}
                disabled
                type="email"
              />
            </div>

            {isEditing && (
              <>
                <div>
                  <label className="text-sm font-medium">Current Password</label>
                  <Input
                    type="password"
                    value={profile.currentPassword}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                  />
                </div>
              </>
            )}

            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <Button type="submit">Save Changes</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
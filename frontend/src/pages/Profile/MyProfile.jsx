
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';
import EditProfileModal from '../../components/EditProfileModal';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        console.log('Sending token:', token);

        const res = await axios.get('/profile/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchMyProfile();
  }, []);

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
    alert('Profile updated!');
    setEditOpen(false);
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <button
          onClick={() => setEditOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        {user.role === 'Entrepreneur' && (
          <>
            <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
            <p><strong>Startup Description:</strong> {user.startup || 'N/A'}</p>
            {/* <p><strong>Funding Need:</strong> {user.fundingNeed || 'N/A'}</p> */}
            {user.pitchDeckUrl && (
              <p>
                <strong>Pitch Deck:</strong>{' '}
                <a href={user.pitchDeckUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                  View Pitch Deck
                </a>
              </p>
            )}
          </>
        )}

        {user.role === 'Investor' && (
          <>
            <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
            <p><strong>Investment Interests:</strong> {user.investmentInterests || 'N/A'}</p>
            <p><strong>Portfolio Companies:</strong> {user.portfolioCompanies || 'N/A'}</p>
          </>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
};

export default MyProfile;

import React, { useState, useEffect } from "react";
import { updateUserProfile,uploadAvatar } from "../api/user"; // or whatever file name you gave the file that contains updateUserProfile
import axios from '../api/axiosConfig'; // Adjust the path if needed

const EditProfileModal = ({ open, onClose, user, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
   startup: "",
    fundingNeed: "",
    investmentInterests: "",
    portfolioCompanies: "",
    avatar: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
      startup: user.startup || "",

        investmentInterests: user.investmentInterests || "",
        portfolioCompanies: user.portfolioCompanies || "",
      });
    }
  }, [user]);

  if (!open) return null;

 
const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "avatar") {
    setFormData((prev) => ({ ...prev, avatar: files[0] }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");

    let avatarUrl = null;

    // 1. Upload avatar first (if selected)
    if (formData.avatar) {
      const avatarForm = new FormData();
      avatarForm.append("avatar", formData.avatar);

      const avatarRes = await axios.post('/avatar/avatar', avatarForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      avatarUrl = avatarRes.data.avatar; // e.g. '/uploads/123_avatar.png'
    }

    // 2. Prepare profile update payload
    const profileData = {
      name: formData.name,
      bio: formData.bio,
        startup: formData.startup,
      fundingNeed: formData.fundingNeed,
      investmentInterests: formData.investmentInterests,
      portfolioCompanies: formData.portfolioCompanies,
    };

    if (avatarUrl) {
      profileData.avatar = avatarUrl; // optional: include avatar URL if uploaded
    }

    // 3. Send profile update
    const res = await axios.put('/profile/update', profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    onProfileUpdated(res.data);
  } catch (err) {
    console.error(err);
    alert("Failed to update profile");
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {user.role === "Entrepreneur" && (
            <>
              <input
                type="text"
                name="startup"
                placeholder="Startup Description"
                value={formData.startup}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="fundingNeed"
                placeholder="Funding Need"
                value={formData.fundingNeed}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </>
          )}
          {user.role === "Investor" && (
            <>
              <input
                type="text"
                name="investmentInterests"
                placeholder="Investment Interests"
                value={formData.investmentInterests}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="portfolioCompanies"
                placeholder="Portfolio Companies"
                value={formData.portfolioCompanies}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
             
            </>
          )}
 <label className="block text-sm font-medium text-gray-700">
                Upload Avatar
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

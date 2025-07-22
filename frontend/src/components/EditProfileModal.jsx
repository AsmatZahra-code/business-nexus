import React, { useState, useEffect } from "react";
import { updateUserProfile } from '../api/user'; // or whatever file name you gave the file that contains updateUserProfile


const EditProfileModal = ({ open, onClose, user, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    startupDescription: "",
    fundingNeed: "",
    investmentInterests: "",
    portfolioCompanies: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        startupDescription: user.startup || "",
      
        investmentInterests: user.investmentInterests || "",
        portfolioCompanies: user.portfolioCompanies || "",
      });
    }
  }, [user]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const updatedUser = await updateUserProfile(formData);
    onProfileUpdated(updatedUser);
  } catch (err) {
    alert("Error updating profile");
    console.error(err);
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
                name="startupDescription"
                placeholder="Startup Description"
                value={formData.startupDescription}
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

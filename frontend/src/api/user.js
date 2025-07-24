import axios from './axiosConfig';

export const getEntrepreneurs = async () => {
  const res = await axios.get('/users?role=entrepreneur');
  return res.data;
};
export const updateUserProfile = async (updates) => {
  const res = await axios.put('/profile/update', updates);
  return res.data;
};

// Upload avatar
export const uploadAvatar = async (avatarFile) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("avatar", avatarFile);

  const res = await axios.post("/api/avatar/avatar", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
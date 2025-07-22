import axios from './axiosConfig';

export const getEntrepreneurs = async () => {
  const res = await axios.get('/users?role=entrepreneur');
  return res.data;
};
export const updateUserProfile = async (updates) => {
  const res = await axios.put('/profile/update', updates);
  return res.data;
};
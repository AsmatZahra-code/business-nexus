import axios from './axiosConfig';

export const getEntrepreneurs = async () => {
  const res = await axios.get('/users?role=entrepreneur');
  return res.data;
};


import axios from '../api/axiosConfig';

export const registerUser = async ({ name, email, password, role }) => {
  try {
    const res = await axios.post('/auth/register', { name, email, password, role });

    const { token, user } = res.data;
    localStorage.setItem('token', token);
     localStorage.setItem('userId', user.id);
    console.log(user);
    return user;
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed');
    throw err;
  }
};

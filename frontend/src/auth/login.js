
import axios from '../api/axiosConfig';

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post('/auth/login', { email, password });

    const { token, user } = res.data;
    localStorage.setItem('token', token);
     localStorage.setItem('userId', user.id);
console.log(user);
    return user; // ✅ FIX: return user to the calling component
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
    throw err; // Optional: rethrow so caller can handle if needed
  }
};

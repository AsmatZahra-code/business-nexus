import { Navigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/authUtils';

const ProtectedRoute = ({ children, role }) => {
  const token = getToken();
  const userRole = getUserRole();

  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

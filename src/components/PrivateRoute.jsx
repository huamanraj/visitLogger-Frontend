import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or message
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
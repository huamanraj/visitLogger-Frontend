// OAuthCallback.jsx
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const session = await account.get();
                if (session) {
                    setUser(session);
                    window.location.href = '/dashboard'; // Force redirect
                }
            } catch (error) {
                window.location.href = '/login';
            }
        };

        handleCallback();
    }, []);

    return null;
};

export default OAuthCallback;
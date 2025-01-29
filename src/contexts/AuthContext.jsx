import { createContext, useContext, useState, useEffect } from 'react';
import { Client, Account, OAuthProvider } from 'appwrite';

const AuthContext = createContext();

// Validate environment variables
const validateEnvVariables = () => {
    const requiredVars = {
        VITE_APPWRITE_ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT,
        VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID
    };

    for (const [key, value] of Object.entries(requiredVars)) {
        if (!value) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    }
};

// Initialize Appwrite client
validateEnvVariables();

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

// Custom error class for authentication errors
class AuthError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'AuthError';
        this.code = code;
    }
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const checkSession = async () => {
            try {
                const currentUser = await account.get();
                if (mounted) {
                    setUser(currentUser);
                    setError(null);
                }
            } catch (error) {
                if (mounted) {
                    setUser(null);
                    // Only set error if it's not a "User not authenticated" error
                    if (error?.code !== 401) {
                        setError(new AuthError('Failed to check authentication status', error?.code));
                    }
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        checkSession();

        return () => {
            mounted = false;
        };
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            if (!email || !password) {
                throw new AuthError('Email and password are required', 'INVALID_CREDENTIALS');
            }

            await account.createEmailPasswordSession(email, password);
            const currentUser = await account.get();
            setUser(currentUser);
            return currentUser;
        } catch (error) {
            const authError = new AuthError(
                error?.message || 'Login failed',
                error?.code || 'UNKNOWN_ERROR'
            );
            setError(authError);
            throw authError;
        } finally {
            setLoading(false);
        }
    };


    const loginWithOAuth = async () => {
        try {
            setLoading(true);
            setError(null);
            await account.createOAuth2Session(
                OAuthProvider.Google,
                `${window.location.origin}/dashboard`,
                `${window.location.origin}/login`
            );
        } catch (error) {
            const authError = new AuthError(
                error?.message || 'OAuth login failed',
                error?.code || 'UNKNOWN_ERROR'
            );
            setError(authError);
            throw authError;
        } finally {
            setLoading(false);
        }
    };


    const signUp = async (email, password, name = ' ') => {
        try {
            setLoading(true);
            setError(null);

            if (!email || !password) {
                throw new AuthError('Email and password are required', 'INVALID_CREDENTIALS');
            }

            const userId = crypto.randomUUID();
            await account.create(userId, email, password, name);
            return login(email, password);
        } catch (error) {
            const authError = new AuthError(
                error?.message || 'Signup failed',
                error?.code || 'UNKNOWN_ERROR'
            );
            setError(authError);
            throw authError;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            setError(null);
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            const authError = new AuthError(
                error?.message || 'Logout failed',
                error?.code || 'UNKNOWN_ERROR'
            );
            setError(authError);
            throw authError;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email) => {
        try {
            setLoading(true);
            setError(null);
            await account.createRecovery(email, 'PASSWORD_RECOVERY_URL');
        } catch (error) {
            const authError = new AuthError(
                error?.message || 'Password reset failed',
                error?.code || 'UNKNOWN_ERROR'
            );
            setError(authError);
            throw authError;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        signUp,
        logout,
        resetPassword,
        loginWithOAuth, 
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

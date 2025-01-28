import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const { user, loading, login, signUp, error } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (mode === 'signup' && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            if (mode === 'login') {
                await login(formData.email, formData.password);
            } else {
                await signUp(formData.email, formData.password);
            }
            navigate('/dashboard');
        } catch (err) {
            setErrors((prev) => ({
                ...prev,
                submit: err.message || 'An error occurred. Please try again.',
            }));
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#000000] text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#000000] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-[#111111] p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold">
                        {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                </div>

                {errors.submit && (
                    <div className="bg-red-500 text-white px-4 py-3 rounded relative text-sm">
                        {errors.submit}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`appearance-none rounded-md block w-full px-3 py-2 bg-[#222222] border ${errors.email ? 'border-red-500' : 'border-gray-700'
                                    } text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Email address"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`appearance-none rounded-md block w-full px-3 py-2 bg-[#222222] border ${errors.password ? 'border-red-500' : 'border-gray-700'
                                    } text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Password"
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {mode === 'signup' && (
                            <div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`appearance-none rounded-md block w-full px-3 py-2 bg-[#222222] border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                                        } text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Confirm Password"
                                    disabled={isLoading}
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : mode === 'login' ? 'Sign in' : 'Sign up'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => {
                            setMode(mode === 'login' ? 'signup' : 'login');
                            setErrors({});
                        }}
                        className="text-blue-500 hover:text-blue-400 text-sm"
                    >
                        {mode === 'login'
                            ? "Don't have an account? Sign up"
                            : 'Already have an account? Sign in'}
                    </button>
                </div>

                {mode === 'login' && (
                    <div className="text-center">
                        <Link to="/forgot-password" className="text-blue-500 hover:text-blue-400 text-sm">
                            Forgot your password?
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;

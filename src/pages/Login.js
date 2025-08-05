import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        // Client-side validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            setTimeout(() => setIsLoading(false), 2000); // Ensure 2-second delay
            return;
        }

        try {
            const startTime = Date.now();
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const { token, message, role } = await response.json();
            if (!response.ok) {
                throw new Error(message || `HTTP error! Status: ${response.status}`);
            }

            sessionStorage.setItem('jwt', token);
            setIsAuthenticated(true);
            console.log('Success:', message);

            // Calculate remaining delay to ensure 2 seconds total
            const elapsedTime = Date.now() - startTime;
            const remainingDelay = Math.max(0, 2000 - elapsedTime);

            setTimeout(() => {
                form.reset();
                setIsLoading(false);
                if (role.toString().toUpperCase() === "ADMIN") {
                    navigate('/admin-Dashboard');
                } else {
                    navigate('/dashboard');
                }
            }, remainingDelay);
        } catch (error) {
            console.error('Fetch error:', error);
            const elapsedTime = Date.now() ;
            const remainingDelay = Math.max(0, 2000 - elapsedTime);
            setTimeout(() => {
                setError(error.message || 'An error occurred during login. Please try again.');
                setIsLoading(false);
            }, remainingDelay);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 min-h-screen flex items-center justify-center">
            <style>
                {`
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.7);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                        opacity: 0;
                        animation: fadeIn 0.3s ease-in-out forwards;
                    }
                    .modal-content {
                        background: #1f7a6e;
                        padding: 24px;
                        border-radius: 12px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                        transform: scale(0.7);
                        animation: scaleIn 0.3s ease-in-out forwards;
                    }
                    .spinner {
                        width: 36px;
                        height: 36px;
                        border: 4px solid transparent;
                        border-top-color: #ffffff;
                        border-right-color: #134e48;
                        border-radius: 50%;
                        animation: spin 0.8s ease-in-out infinite, pulse 1.6s ease-in-out infinite;
                    }
                    .loading-text {
                        color: #ffffff;
                        font-size: 1.25rem;
                        font-weight: 500;
                        margin-top: 12px;
                        text-align: center;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.15); opacity: 0.8; }
                    }
                    @keyframes fadeIn {
                        to { opacity: 1; }
                    }
                    @keyframes scaleIn {
                        to { transform: scale(1); }
                    }
                `}
            </style>
            <div className="max-w-6xl bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden relative">
                {/* Left: Login Form */}
                <div className="w-1/2 p-10 bg-teal-800 relative">
                    <div className="content" style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease-in-out' }}>
                        <div className="flex justify-center mb-6">
                            <img src="/images/appLogo.png" alt="Grade 12 Revision Hub" className="h-24" />
                        </div>
                        <h2 className="text-3xl font-bold text-white text-center mb-2">Log In to Revision App</h2>
                        <p className="text-gray-300 text-center mb-6">Access your study tools now!</p>
                        <form id="loginForm" className="space-y-5" onSubmit={handleSubmit}>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                    placeholder="Email Address"
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="email"
                                    className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                >
                                    Email Address
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    required
                                    className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent pr-10"
                                    placeholder="Password"
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="password"
                                    className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                >
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-300 hover:text-teal-400 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    disabled={isLoading}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-teal-400 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="btn-submit w-full flex items-center justify-center"
                                disabled={isLoading}
                            >
                                Log In
                            </button>
                        </form>
                        {error && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center">
                                {error}
                            </p>
                        )}
                        <p className="text-gray-300 text-sm mt-4 text-center">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-teal-400 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                    {isLoading && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div
                                    className="spinner"
                                    role="status"
                                    aria-label="Logging in..."
                                ></div>
                                <span className="loading-text">Logging In...</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* Right: Animated Services */}
                <div className="w-1/2 bg-gradient-to-b from-teal-600 to-red-600 p-6 relative overflow-hidden flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-semibold text-white mb-6 z-10">Why Revision App?</h3>
                    <br />
                    <div className="relative w-full h-full flex flex-col justify-center items-center">
                        <div
                            className="service-card w-11/12 bg-red-900 bg-opacity-70 backdrop-blur-md rounded-lg p-4 text-white mb-4 animate-slide-up transition-all duration-500 ease-in-out"
                            style={{ animationDelay: '0s' }}
                        >
                            <h4 className="font-medium text-lg">Interactive Quizzes</h4>
                            <p className="text-sm">Engage with dynamic quizzes tailored to your subjects.</p>
                        </div>
                        <div
                            className="service-card w-11/12 bg-red-900 bg-opacity-70 backdrop-blur-md rounded-lg p-4 text-white mb-4 animate-slide-up transition-all duration-500 ease-in-out"
                            style={{ animationDelay: '0.5s' }}
                        >
                            <h4 className="font-medium text-lg">Study Plans</h4>
                            <p className="text-sm">Personalized schedules to keep you on track.</p>
                        </div>
                        <div
                            className="service-card w-11/12 bg-red-900 bg-opacity-70 backdrop-blur-md rounded-lg p-4 text-white animate-slide-up transition-all duration-500 ease-in-out"
                            style={{ animationDelay: '1s' }}
                        >
                            <h4 className="font-medium text-lg">Progress Tracking</h4>
                            <p className="text-sm">Monitor your learning with detailed analytics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
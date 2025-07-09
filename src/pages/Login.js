import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ setIsAuthenticated }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');

        // Client-side validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        // if (password.length < 8) {
        //     setError('Password must be at least 8 characters long.');
        //     return;
        // }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const { token, message, role} = await response.json();

            if (!response.ok) {
                throw new Error(message || `HTTP error! Status: ${response.status}`);
            }

            sessionStorage.setItem('jwt', token);
            setIsAuthenticated(true); // Update authentication state
            console.log('Success:', message);
            alert('Login successful! Welcome back to Revision App.');
            form.reset();
            setError('');
            //navigate('/dashboard');
            //navigate('/admin-Dashboard');
            if (role.toString().toUpperCase() === "ADMIN") {
                navigate('/admin-Dashboard');
            }
            else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message || 'An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden">
                {/* Left: Login Form */}
                <div className="w-1/2 p-10 bg-teal-800">
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
                            />
                            <label
                                htmlFor="email"
                                className="form-label absolute left-4 top-2 text-gray-300 transition-all
                                   peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400
                                   peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300
                                   peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                            >
                                Email Address
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                placeholder="Password"
                            />
                            <label
                                htmlFor="password"
                                className="form-label absolute left-4 top-2 text-gray-300 transition-all
                                   peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400
                                   peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300
                                   peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                            >
                                Password
                            </label>
                        </div>
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-teal-400 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200"
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
                {/* Right: Animated Services */}
                <div className="w-1/2 bg-gradient-to-b from-teal-600 to-red-600 p-6 relative overflow-hidden flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-semibold text-white mb-6 z-10">Why Revision App?</h3>
                    <br />
                    <div className="relative w-full h-full flex flex-col justify-center items-center">
                        <div className="service-card w-11/12 bg-red-900 bg-opacity-70 backdrop-blur-md rounded-lg p-4 text-white mb-4 animate-slide-up transition-all duration-500 ease-in-out" style={{ animationDelay: '0s' }}>
                            <h4 className="font-medium text-lg">Interactive Quizzes</h4>
                            <p className="text-sm">Engage with dynamic quizzes tailored to your subjects.</p>
                        </div>
                        <div className="service-card w-11/12 bg-red-900 bg-opacity-70 backdrop-blur-md rounded-lg p-4 text-white mb-4 animate-slide-up transition-all duration-500 ease-in-out" style={{ animationDelay: '0.5s' }}>
                            <h4 className="font-medium text-lg">Study Plans</h4>
                            <p className="text-sm">Personalized schedules to keep you on track.</p>
                        </div>
                        <div className="service-card w-11/12 bg-red-900 bg-opacity-70 backdrop-blur-md rounded-lg p-4 text-white animate-slide-up transition-all duration-500 ease-in-out" style={{ animationDelay: '1s' }}>
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
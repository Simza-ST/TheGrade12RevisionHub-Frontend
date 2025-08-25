import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/auth';

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setError('');
        setSuccess('');

        const form = event.target;
        const formData = new FormData(form);
        const emailInput = formData.get('email');

        if (!/^\S+@\S+\.\S+$/.test(emailInput)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            console.log('Sending OTP request for email:', emailInput);
            const response = await fetch(`${API_BASE_URL}/password/send-otp/${encodeURIComponent(emailInput)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            console.log('Send OTP response status:', response.status);
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server returned a non-JSON response.');
            }

            const data = await response.json();
            console.log('Send OTP response data:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to send OTP (status: ${response.status})`);
            }

            setSuccess('OTP sent! Please check your email.');
            setEmail(emailInput);
            console.log('Email set:', emailInput);
            form.reset();
        } catch (error) {
            console.error('Send OTP exception:', error.message);
            setError(error.message || 'An error occurred while sending OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProceedToReset = () => {
        console.log('Proceed clicked, email:', email);
        if (email) {
            console.log('Navigating to /reset-password with email:', email);
            navigate('/reset-password', { state: { email } });
        } else {
            setError('Please enter your email and send OTP first.');
        }
    };

    const validatePasswordMatch = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return '';
    };

    return (
        <div className="bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl w-full bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden relative">
                <div className="w-1/2 p-10 bg-teal-800 relative">
                    <div className="content">
                        <div className="flex justify-center mb-6">
                            <img src="/images/appLogo.png" alt="Grade 12 Revision Hub" className="h-24" />
                        </div>
                        <h2 className="text-3xl font-bold text-white text-center mb-2">Reset Your Password</h2>
                        <p className="text-gray-300 text-center mb-6" id="formSubtitle">
                            Enter your email to receive an OTP.
                        </p>
                        <form id="forgotPasswordForm" className="space-y-5" onSubmit={handleSubmit}>
                            <div id="emailSection">
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
                                <button
                                    type="submit"
                                    id="requestOtpButton"
                                    className="btn-submit w-full flex items-center justify-center py-3 px-4 mt-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    Send OTP
                                </button>
                            </div>
                        </form>
                        {success && (
                            <div className="mt-4 text-center">
                                <p id="successMessage" className="text-teal-400 text-sm">
                                    {success}
                                </p>
                                <button
                                    onClick={handleProceedToReset}
                                    className="mt-2 inline-block py-2 px-4 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200"
                                >
                                    Proceed to Reset Password
                                </button>
                            </div>
                        )}
                        {error && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center">
                                {error}
                            </p>
                        )}
                        <p className="text-gray-300 text-sm mt-4 text-center">
                            Remember your password?{' '}
                            <Link to="/login" className="text-teal-400 hover:underline">
                                Log in
                            </Link>
                        </p>
                        <p className="text-gray-300 text-sm mt-2 text-center">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-teal-400 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="flex flex-col items-center">
                                <div
                                    className="spinner w-12 h-12 border-4 border-transparent border-t-white border-r-teal-800 rounded-full animate-spin animate-pulse"
                                    role="status"
                                    aria-label="Sending OTP..."
                                ></div>
                                <span className="text-white text-lg font-medium mt-3">
                                    Sending OTP...
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-1/2 bg-gradient-to-b from-teal-600 to-red-600 p-6 relative overflow-hidden flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-semibold text-white mb-6 z-10">Why Revision App?</h3>
                    <br />
                    <br />
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

export default ForgotPassword;
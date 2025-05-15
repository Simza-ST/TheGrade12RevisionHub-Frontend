import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [error, setError] = useState('');
    const [isOtpStage, setIsOtpStage] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        if (isOtpStage) {
            const otp = formData.get('otp').trim();

            if (!/^\d{6}$/.test(otp)) {
                setError('Please enter a valid 6-digit OTP.');
                return;
            }

            try {
                const response = await fetch('/api/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userEmail, otp }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'OTP verification failed');
                }

                alert('OTP verified! Proceed to reset your password.');
                form.reset();
                setError('');
                window.location.href = '/reset-password';
            } catch (error) {
                setError(error.message || 'An error occurred. Please try again.');
            }
        } else {
            const email = formData.get('email');

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                setError('Please enter a valid email address.');
                return;
            }

            try {
                const response = await fetch('/api/request-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to send OTP');
                }

                setUserEmail(email);
                setIsOtpStage(true);
                setError('');
                form.reset();
            } catch (error) {
                setError(error.message || 'An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl w-full bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden">
                {/* Left: Forgot Password Form */}
                <div className="w-1/2 p-10 bg-teal-800">
                    <div className="flex justify-center mb-6">
                        <img
                            src="https://via.placeholder.com/150x50?text=Revision+App"
                            alt="Revision App Logo"
                            className="h-8"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-white text-center mb-2">Reset Your Password</h2>
                    <p className="text-gray-300 text-center mb-6" id="formSubtitle">
                        {isOtpStage ? 'Enter the OTP sent to your email.' : 'Enter your email to receive an OTP.'}
                    </p>
                    <form id="forgotPasswordForm" className="space-y-5" onSubmit={handleSubmit}>
                        <div id="emailSection" className={isOtpStage ? 'hidden' : ''}>
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
                                    className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
                                >
                                    Email Address
                                </label>
                            </div>
                            <button
                                type="submit"
                                id="requestOtpButton"
                                className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 mt-2"
                            >
                                Send OTP
                            </button>
                        </div>
                        <div id="otpSection" className={isOtpStage ? '' : 'hidden'}>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    required
                                    className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                    placeholder="Enter OTP"
                                />
                                <label
                                    htmlFor="otp"
                                    className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
                                >
                                    Enter OTP
                                </label>
                            </div>
                            <button
                                type="submit"
                                id="verifyOtpButton"
                                className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </form>
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
                {/* Right: Animated Services */}
                <div className="w-1/2 bg-gradient-to-b from-teal-600 to-red-600 p-10 relative overflow-hidden">
                    <h3 className="text-2xl font-semibold text-white mb-6">Why Revision App?</h3>
                    <div className="relative h-[calc(100%-2rem)]">
                        <div className="service-card absolute w-full bottom-0 bg-red-900 bg-opacity-40 backdrop-blur-md rounded-lg p-4 text-white">
                            <h4 className="font-medium">Interactive Quizzes</h4>
                            <p className="text-sm">Engage with dynamic quizzes tailored to your subjects.</p>
                        </div>
                        <div className="service-card absolute w-full bottom-0 bg-red-900 bg-opacity-40 backdrop-blur-md rounded-lg p-4 text-white">
                            <h4 className="font-medium">Study Plans</h4>
                            <p className="text-sm">Personalized schedules to keep you on track.</p>
                        </div>
                        <div className="service-card absolute w-full bottom-0 bg-red-900 bg-opacity-40 backdrop-blur-md rounded-lg p-4 text-white">
                            <h4 className="font-medium">Progress Tracking</h4>
                            <p className="text-sm">Monitor your learning with detailed analytics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
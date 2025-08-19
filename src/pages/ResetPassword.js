import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    useEffect(() => {
        console.log('ResetPassword mounted, email:', email);
        if (!email) {
            setError('Email is missing. Please start the process from forgot password.');
        }
    }, [email]);

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setLoadingMessage('Verifying OTP...');
        setError('');
        setSuccess('');

        if (!/^\d{6}$/.test(otp)) {
            setError('Please enter a valid 6-digit OTP.');
            setIsLoading(false);
            return;
        }

        if (!email) {
            setError('Email is missing. Please start the process from forgot password.');
            setIsLoading(false);
            return;
        }

        try {
            console.log('Sending OTP verification request:', { email, otp });
            const response = await fetch(`${API_BASE_URL}/auth/password/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
                credentials: 'include',
            });

            console.log('OTP verify response status:', response.status);
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server returned a non-JSON response.');
            }

            const data = await response.json();
            console.log('OTP verify response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'OTP verification failed');
            }

            if (data.success) {
                setSuccess(data.message || 'OTP verified successfully! Please set your new password.');
                setIsOtpVerified(true);
            } else {
                setError(data.message || 'Invalid or expired OTP');
            }
        } catch (error) {
            console.error('OTP verification error:', error.message);
            setError(error.message || 'An error occurred during OTP verification.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setLoadingMessage('Setting Password...');
        setError('');
        setSuccess('');

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            console.log('Sending password reset request:', { email, otp, newPassword });
            const response = await fetch(`${API_BASE_URL}/auth/password/reset-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
                credentials: 'include',
            });

            console.log('Password reset response status:', response.status);
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server returned a non-JSON response.');
            }

            const data = await response.json();
            console.log('Password reset response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Password reset failed');
            }

            setSuccess(data.message || 'Password reset successful! Redirecting to login...');
            setError('');
            event.target.reset();
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Password reset error:', error.message);
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (isLoading || !email) return;
        setIsLoading(true);
        setLoadingMessage('Resending OTP...');
        setError('');
        setSuccess('');

        try {
            console.log('Sending resend OTP request:', { email });
            const response = await fetch(`${API_BASE_URL}/auth/password/send-otp/${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            console.log('Resend OTP response status:', response.status);
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server returned a non-JSON response.');
            }

            const data = await response.json();
            console.log('Resend OTP response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Resend OTP failed');
            }

            setSuccess(data.message || 'OTP resent successfully. Check your email.');
        } catch (error) {
            console.error('Resend OTP error:', error.message);
            setError(error.message || 'An error occurred during OTP resend.');
        } finally {
            setIsLoading(false);
        }
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
                        <p className="text-gray-300 text-center mb-6">
                            {isOtpVerified ? 'Enter your new password.' : `Enter the OTP sent to ${email || 'your email'}.`}
                        </p>
                        {!isOtpVerified ? (
                            <form id="verifyOtpForm" className="space-y-5" onSubmit={handleOtpSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="Enter OTP"
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="otp"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                    >
                                        Enter OTP
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    Verify OTP
                                </button>
                            </form>
                        ) : (
                            <form id="resetPasswordForm" className="space-y-5" onSubmit={handlePasswordSubmit}>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="New Password"
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="password"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                    >
                                        New Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="Confirm Password"
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                    >
                                        Confirm Password
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    Set New Password
                                </button>
                            </form>
                        )}
                        {!isOtpVerified && (
                            <button
                                onClick={handleResendOTP}
                                className="text-teal-400 hover:underline text-sm mt-4 text-center block w-full"
                                disabled={isLoading || !email}
                            >
                                Resend OTP
                            </button>
                        )}
                        {error && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center">
                                {error}{' '}
                                {(!email && !isOtpVerified) && (
                                    <Link to="/forgot-password" className="text-teal-400 hover:underline">
                                        Go back to forgot password
                                    </Link>
                                )}
                            </p>
                        )}
                        {success && (
                            <p id="successMessage" className="text-teal-400 text-sm mt-4 text-center">
                                {success}
                            </p>
                        )}
                        <p className="text-gray-300 text-sm mt-4 text-center">
                            Remember your password?{' '}
                            <Link to="/login" className="text-teal-400 hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="flex flex-col items-center">
                                <div
                                    className="spinner w-12 h-12 border-4 border-transparent border-t-white border-r-teal-800 rounded-full animate-spin animate-pulse"
                                    role="status"
                                    aria-label={loadingMessage}
                                ></div>
                                <span className="text-white text-lg font-medium mt-3">
                                    {loadingMessage}
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

export default ResetPassword;
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/auth';

    useEffect(() => {
        if (!email) {
            setError('Email is missing. Please start the process from forgot password.');
        }
        const passwordValidation = validatePassword(newPassword);
        const passwordMatch = validatePasswordMatch(newPassword, confirmPassword);
        setPasswordError(passwordValidation || passwordMatch);
    }, [email, newPassword, confirmPassword]);

    const validateOtp = (otp) => {
        if (!otp.trim()) return 'OTP is required.';
        if (!/^\d{6}$/.test(otp)) return 'Please enter a valid 6-digit OTP.';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'Password is required.';
        if (password.length < 8) return 'Password must be at least 8 characters long.';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character.';
        return '';
    };

    const validatePasswordMatch = (password, confirmPassword) => {
        if (!confirmPassword) return 'Confirm password is required.';
        if (password !== confirmPassword) return 'Passwords do not match.';
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'otp') {
            setOtp(value);
            setOtpError(validateOtp(value));
        } else if (name === 'password') {
            setNewPassword(value);
            setPasswordError(validatePassword(value));
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
            setPasswordError(validatePasswordMatch(newPassword, value));
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setLoadingMessage('Verifying OTP...');
        setError('');
        setSuccess('');

        const otpValidation = validateOtp(otp);
        if (otpValidation) {
            setOtpError(otpValidation);
            setError(otpValidation);
            setIsLoading(false);
            return;
        }

        if (!email) {
            setError('Email is missing. Please start the process from forgot password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/password/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), otp }),
                credentials: 'include',
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage = 'OTP verification failed';
                try {
                    const data = JSON.parse(text);
                    errorMessage = data.message || errorMessage;
                } catch {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const contentType = response.headers.get('content-type');
            let data = {};
            if (contentType?.includes('application/json') && response.status !== 204) {
                data = await response.json();
            }

            if (data.success) {
                setSuccess(data.message || 'OTP verified successfully! Please set your new password.');
                setIsOtpVerified(true);
            } else {
                setOtpError(data.message || 'Invalid or expired OTP');
            }
        } catch (error) {
            setOtpError(error.message || 'An error occurred during OTP verification.');
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

        const passwordValidation = validatePassword(newPassword);
        if (passwordValidation) {
            setPasswordError(passwordValidation);
            setError(passwordValidation);
            setIsLoading(false);
            return;
        }

        const passwordMatch = validatePasswordMatch(newPassword, confirmPassword);
        if (passwordMatch) {
            setPasswordError(passwordMatch);
            setError(passwordMatch);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/password/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), otp, newPassword }),
                credentials: 'include',
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage = 'Password reset failed';
                try {
                    const data = JSON.parse(text);
                    errorMessage = data.message || errorMessage;
                } catch {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const contentType = response.headers.get('content-type');
            let data = {};
            if (contentType?.includes('application/json') && response.status !== 204) {
                data = await response.json();
            }

            if (data.success) {
                setSuccess(data.message || 'Password reset successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Failed to reset password.');
            }
        } catch (error) {
            setError(error.message || 'An error occurred while resetting the password.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setLoadingMessage('Resending OTP...');
        setError('');
        setOtpError('');

        try {
            const response = await fetch(`${API_BASE_URL}/password/send-otp/${encodeURIComponent(email.trim())}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage = 'Failed to resend OTP';
                try {
                    const data = JSON.parse(text);
                    errorMessage = data.message || errorMessage;
                } catch {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const contentType = response.headers.get('content-type');
            let data = {};
            if (contentType?.includes('application/json') && response.status !== 204) {
                data = await response.json();
            }

            setSuccess(data.message || 'OTP resent successfully. Check your email.');
            setOtp('');
        } catch (err) {
            setOtpError(err.message || 'Unable to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 min-h-screen flex items-center justify-center">
            <style>{`
        .form-input[type="password"]::-ms-reveal, 
        .form-input[type="password"]::-ms-clear, 
        .form-input[type="password"]::-webkit-credentials-auto-fill-button { 
          display: none !important; 
          visibility: hidden !important; 
        }
      `}</style>
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
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="Enter OTP"
                                        disabled={isLoading}
                                        aria-invalid={otpError ? 'true' : 'false'}
                                        aria-describedby={otpError ? 'otpError' : undefined}
                                    />
                                    <label
                                        htmlFor="otp"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                    >
                                        Enter OTP
                                    </label>
                                    {otpError && (
                                        <p id="otpError" className="text-red-400 text-sm mt-1" role="alert">
                                            {otpError}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || otpError}
                                    aria-label="Verify OTP"
                                >
                                    {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
                                </button>
                            </form>
                        ) : (
                            <form id="resetPasswordForm" className="space-y-5" onSubmit={handlePasswordSubmit}>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={newPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent pr-10"
                                        placeholder="New Password"
                                        disabled={isLoading}
                                        aria-invalid={passwordError ? 'true' : 'false'}
                                        aria-describedby={passwordError ? 'passwordError' : undefined}
                                    />
                                    <label
                                        htmlFor="password"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                    >
                                        New Password
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
                                    {passwordError && newPassword && (
                                        <p id="passwordError" className="text-red-400 text-sm mt-1" role="alert">
                                            {passwordError}
                                        </p>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent pr-10"
                                        placeholder="Confirm Password"
                                        disabled={isLoading}
                                        aria-invalid={passwordError ? 'true' : 'false'}
                                        aria-describedby={passwordError ? 'confirmPasswordError' : undefined}
                                    />
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                    >
                                        Confirm Password
                                    </label>
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-300 hover:text-teal-400 focus:outline-none"
                                        onClick={toggleConfirmPasswordVisibility}
                                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                    {passwordError && confirmPassword && (
                                        <p id="confirmPasswordError" className="text-red-400 text-sm mt-1" role="alert">
                                            {passwordError}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || passwordError}
                                    aria-label="Set New Password"
                                >
                                    {isLoading ? 'Setting Password...' : 'Set New Password'}
                                </button>
                            </form>
                        )}
                        {!isOtpVerified && (
                            <button
                                onClick={handleResendOTP}
                                className="text-teal-400 hover:underline text-sm mt-4 text-center block w-full"
                                disabled={isLoading || !email}
                                aria-label="Resend OTP"
                            >
                                Resend OTP
                            </button>
                        )}
                        {error && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center" role="alert">
                                {error}{' '}
                                {(!email && !isOtpVerified) && (
                                    <Link to="/forgot-password" className="text-teal-400 hover:underline">
                                        Go back to forgot password
                                    </Link>
                                )}
                            </p>
                        )}
                        {success && (
                            <p id="successMessage" className="text-teal-400 text-sm mt-4 text-center" role="alert">
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
                                <span className="text-white text-lg font-medium mt-3">{loadingMessage}</span>
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
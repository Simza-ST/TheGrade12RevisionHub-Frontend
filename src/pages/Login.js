import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ForgotPassword.css';

const Login = ({ setIsAuthenticated }) => {
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    const validateEmail = (email) => {
        if (!email.trim()) return 'Email is required.';
        if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'Password is required.';
        if (password.length < 8) return 'Password must be at least 8 characters long.';
        return '';
    };

    const validateOtp = (otp) => {
        if (!otp.trim()) return 'OTP is required.';
        if (!/^\d{6}$/.test(otp)) return 'Please enter a valid 6-digit OTP.';
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
            setEmailError(validateEmail(value));
        } else if (name === 'password') {
            setPasswordError(validatePassword(value));
        } else if (name === 'otp') {
            setOtp(value);
            setOtpError(validateOtp(value));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        setShowOTPForm(false);
        const form = event.target;
        const formData = new FormData(form);
        const formEmail = formData.get('email');
        const password = formData.get('password');
        const emailValidation = validateEmail(formEmail);
        if (emailValidation) {
            setEmailError(emailValidation);
            setError(emailValidation);
            setIsLoading(false);
            return;
        }
        const passwordValidation = validatePassword(password);
        if (passwordValidation) {
            setPasswordError(passwordValidation);
            setError(passwordValidation);
            setIsLoading(false);
            return;
        }
        setEmail(formEmail.trim());
        const payload = { email: formEmail.trim(), password };
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! Status: ${response.status}`);
            }
            sessionStorage.setItem('jwt', data.token);
            setIsAuthenticated(true);
            form.reset();
            setIsLoading(false);
            navigate(data.role.toUpperCase() === 'ADMIN' ? '/admin-Dashboard' : '/dashboard');
        } catch (err) {
            setError(err.message || 'An error occurred during login. Please try again.');
            if (err.message.includes('Email not verified')) {
                handleResendOTP(formEmail.trim());
                setShowOTPForm(true);
            }
            setIsLoading(false);
        }
    };

    const handleOTPSubmit = async (event) => {
        event.preventDefault();
        setOtpError('');
        setError('');
        setIsLoading(true);
        const emailValidation = validateEmail(email);
        if (emailValidation) {
            setOtpError(emailValidation);
            setIsLoading(false);
            return;
        }
        const otpValidation = validateOtp(otp);
        if (otpValidation) {
            setOtpError(otpValidation);
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), otp }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'OTP verification failed');
            }
            if (data.success) {
                setShowOTPForm(false);
                setIsAuthenticated(true);
                sessionStorage.setItem('jwt', data.token);
                setIsLoading(false);
                navigate(data.role.toUpperCase() === 'ADMIN' ? '/admin-Dashboard' : '/dashboard');
            } else {
                setOtpError(data.message || 'Invalid or expired OTP');
                setIsLoading(false);
            }
        } catch (error) {
            setOtpError(error.message || 'An error occurred during OTP verification.');
            setIsLoading(false);
        }
    };

    const handleResendOTP = async (emailToSend) => {
        setIsLoading(true);
        setError('');
        setOtpError('');
        const emailValidation = validateEmail(emailToSend);
        if (emailValidation) {
            setOtpError(emailValidation);
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailToSend.trim() }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to resend OTP.');
            }
            setError('OTP resent successfully. Check your email.');
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
                        <h2 className="text-3xl font-bold text-white text-center mb-2">
                            {showOTPForm ? 'Verify Your Email' : 'Log In to Revision Hub'}
                        </h2>
                        <p className="text-gray-300 text-center mb-8 md:mb-6">
                            {showOTPForm ? 'Enter your email and the OTP sent to you.' : 'Access your study tools now!'}
                        </p>
                        {!showOTPForm ? (
                            <form id="loginForm" className="space-y-5" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="Email Address"
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        aria-invalid={emailError ? 'true' : 'false'}
                                        aria-describedby={emailError ? 'emailError' : undefined}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                    >
                                        Email Address
                                    </label>
                                    {emailError && (
                                        <p id="emailError" className="text-red-400 text-sm mt-1" role="alert">
                                            {emailError}
                                        </p>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent pr-10"
                                        placeholder="Password"
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        aria-invalid={passwordError ? 'true' : 'false'}
                                        aria-describedby={passwordError ? 'passwordError' : undefined}
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
                                    {passwordError && (
                                        <p id="passwordError" className="text-red-400 text-sm mt-1" role="alert">
                                            {passwordError}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <Link to="/forgot-password" className="text-sm text-teal-400 hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit w-full flex items-center justify-center bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || emailError || passwordError}
                                    aria-label="Log In"
                                >
                                    {isLoading ? 'Logging In...' : 'Log In'}
                                </button>
                            </form>
                        ) : (
                            <form id="verifyOtpForm" className="space-y-5" onSubmit={handleOTPSubmit}>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="Email Address"
                                        disabled={isLoading}
                                        aria-invalid={otpError.includes('email') ? 'true' : 'false'}
                                        aria-describedby={otpError.includes('email') ? 'otpEmailError' : undefined}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                    >
                                        Email Address
                                    </label>
                                    {otpError.includes('email') && (
                                        <p id="otpEmailError" className="text-red-400 text-sm mt-1" role="alert">
                                            {otpError}
                                        </p>
                                    )}
                                </div>
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
                                        aria-invalid={otpError && !otpError.includes('email') ? 'true' : 'false'}
                                        aria-describedby={otpError && !otpError.includes('email') ? 'otpError' : undefined}
                                    />
                                    <label
                                        htmlFor="otp"
                                        className="form-label absolute left-4 top-2 text-gray-300 transition-all peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-[&:not(:placeholder-shown)]:-translate-y-7 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400"
                                    >
                                        Enter OTP
                                    </label>
                                    {otpError && !otpError.includes('email') && (
                                        <p id="otpError" className="text-red-400 text-sm mt-1" role="alert">
                                            {otpError}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit w-full flex items-center justify-center bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || otpError}
                                    aria-label="Verify OTP"
                                >
                                    {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
                                </button>
                            </form>
                        )}
                        {error && !showOTPForm && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center" role="alert">
                                {error}
                            </p>
                        )}
                        {otpError && showOTPForm && (
                            <p id="otpErrorMessage" className="text-red-400 text-sm mt-4 text-center" role="alert">
                                {otpError}
                            </p>
                        )}
                        {showOTPForm && (
                            <button
                                onClick={() => handleResendOTP(email)}
                                className="text-teal-400 hover:underline text-sm mt-4 text-center w-full"
                                disabled={isLoading}
                                aria-label="Resend OTP"
                            >
                                Resend OTP
                            </button>
                        )}
                        <p className="text-gray-300 text-sm mt-4 text-center">
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
                                    aria-label={showOTPForm ? 'Verifying OTP...' : 'Logging in...'}
                                ></div>
                                <span className="text-white text-lg font-medium mt-3">
                  {showOTPForm ? 'Verifying OTP...' : 'Logging In...'}
                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-1/2 bg-gradient-to-b from-teal-600 to-red-600 p-6 relative overflow-hidden flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-semibold text-white mb-6 z-10">Why Revision Hub?</h3>
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

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
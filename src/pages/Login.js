import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ForgotPassword.css'; // Use ForgotPassword.css for consistent styling

const Login = ({ setIsAuthenticated }) => {
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showOTPForm, setShowOTPForm] = useState(false); // State for OTP form
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        setShowOTPForm(false);

        const form = event.target;
        const formData = new FormData(form);
        const formEmail = formData.get('email');
        const password = formData.get('password');

        // Client-side validation
        if (!/^\S+@\S+\.\S+$/.test(formEmail)) {
            setError('Please enter a valid email address.');
            setTimeout(() => setIsLoading(false), 2000);
            return;
        }
        setEmail(formEmail); // Store email for OTP form

        const payload = { email: formEmail, password };
        console.log('Login: Sending payload:', payload);
        const startTime = Date.now();

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            console.log('Login: Response:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
            });
            const data = await response.json();
            console.log('Login: Response Data:', data);

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! Status: ${response.status}`);
            }

            sessionStorage.setItem('jwt', data.token);
            setIsAuthenticated(true);
            const elapsedTime = Date.now() - startTime;
            const remainingDelay = Math.max(0, 10000 - elapsedTime);
            setTimeout(() => {
                form.reset();
                setIsLoading(false);
                if (data.role.toUpperCase() === 'ADMIN') {
                    navigate('/admin-Dashboard');
                } else {
                    navigate('/dashboard');
                }
            }, remainingDelay);
        } catch (err) {
            console.error('Login: Error:', err);
            const elapsedTime = Date.now() - startTime;
            const remainingDelay = Math.max(0, 2000 - elapsedTime);
            setTimeout(() => {
                const errMsg = err.message || 'An error occurred during login. Please try again.';
                setError(errMsg);
                if (errMsg.includes('Email not verified')) {
                    // Automatically send OTP and show OTP form
                    handleResendOTP(formEmail);
                    setShowOTPForm(true);
                }
                setIsLoading(false);
            }, remainingDelay);
        }
    };

    const handleOTPSubmit = async (event) => {
        event.preventDefault();
        setOtpError('');
        setError('');
        setIsLoading(true);

        // Client-side validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setOtpError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }
        if (!/^\d{6}$/.test(otp)) {
            setOtpError('Please enter a valid 6-digit OTP.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
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

        // Validate email
        if (!emailToSend || !/^\S+@\S+\.\S+$/.test(emailToSend)) {
            console.log('Resend OTP: Invalid email', emailToSend);
            setOtpError('Please enter a valid email address to resend OTP.');
            setIsLoading(false);
            return;
        }

        try {
            console.log('Resend OTP: Sending request for email:', emailToSend);
            const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailToSend }),
            });
            console.log('Resend OTP: Response:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
            });
            const data = await response.json();
            console.log('Resend OTP: Response Data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to resend OTP.');
            }
            setError('OTP resent successfully. Check your email.');
            setOtp(''); // Clear OTP input for new code
        } catch (err) {
            console.error('Resend OTP: Error:', err);
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
            <div className="max-w-6xl w-full bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden relative">
                {/* Left: Login or OTP Verification Form */}
                <div className="w-1/2 p-10 bg-teal-800 relative">
                    <div className="content">
                        <div className="flex justify-center mb-6">
                            <img src="/images/appLogo.png" alt="Grade 12 Revision Hub" className="h-24" />
                        </div>
                        <h2 className="text-3xl font-bold text-white text-center mb-2">
                            {showOTPForm ? 'Verify Your Email' : 'Log In to Revision Hub'}
                        </h2>
                        <p className="text-gray-300 text-center mb-6">
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
                                    className="btn-submit w-full flex items-center justify-center bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200"
                                    disabled={isLoading}
                                >
                                    Log In
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
                                        onChange={(e) => setEmail(e.target.value)}
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
                                    className="btn-submit w-full flex items-center justify-center bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
                                </button>
                            </form>
                        )}
                        {error && !showOTPForm && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center">
                                {error}
                            </p>
                        )}
                        {otpError && showOTPForm && (
                            <p id="otpErrorMessage" className="text-red-400 text-sm mt-4 text-center">
                                {otpError}
                            </p>
                        )}
                        {showOTPForm && (
                            <button
                                onClick={() => handleResendOTP(email)}
                                className="text-teal-400 hover:underline text-sm mt-4 text-center w-full"
                                disabled={isLoading}
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
                {/* Right: Animated Services */}
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
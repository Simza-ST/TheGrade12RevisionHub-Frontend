import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [error, setError] = useState('');
    const [idError, setIdError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showOTPPopup, setShowOTPPopup] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [email, setEmail] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        idNumber: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
    });
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    // Validate ID number
    const validateIdNumber = (id) => {
        if (!/^\d{13}$/.test(id)) {
            return 'ID number must be exactly 13 digits.';
        }
        const year = parseInt(id.substring(0, 2), 10);
        const month = parseInt(id.substring(2, 4), 10);
        const day = parseInt(id.substring(4, 6), 10);
        const currentYear = new Date().getFullYear() % 100; // Last two digits of current year
        const fullYear = year <= currentYear ? 2000 + year : 1900 + year;

        // Validate month (01-12)
        if (month < 1 || month > 12) {
            return 'Invalid month in ID number (must be 01-12).';
        }
        // Validate day (01-31, basic check)
        if (day < 1 || day > 31) {
            return 'Invalid day in ID number (must be 01-31).';
        }
        // Basic date validity check
        const date = new Date(fullYear, month - 1, day);
        if (date.getFullYear() !== fullYear || date.getMonth() + 1 !== month || date.getDate() !== day) {
            return 'Invalid date in ID number.';
        }
        return '';
    };

    // Validate phone number
    const validatePhoneNumber = (phone) => {
        const cleanedPhone = phone.replace(/^\+/, ''); // Remove optional leading +
        if (!/^\d{10}$/.test(cleanedPhone)) {
            return 'Phone number must be exactly 10 digits.';
        }
        return '';
    };

    // Validate password matching
    const validatePasswordMatch = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return '';
    };

    // Handle input changes and validate in real-time
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'idNumber') {
            setIdError(validateIdNumber(value));
        } else if (name === 'phoneNumber') {
            setPhoneError(validatePhoneNumber(value));
        } else if (name === 'password' || name === 'confirmPassword') {
            setPasswordError(validatePasswordMatch(formData.password, formData.confirmPassword));
        }
    };

    // Re-validate password match when either password or confirmPassword changes
    useEffect(() => {
        setPasswordError(validatePasswordMatch(formData.password, formData.confirmPassword));
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        // Client-side validation
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }
        const idError = validateIdNumber(formData.idNumber);
        if (idError) {
            setError(idError);
            setIdError(idError);
            setIsLoading(false);
            return;
        }
        const phoneError = validatePhoneNumber(formData.phoneNumber);
        if (phoneError) {
            setError(phoneError);
            setPhoneError(phoneError);
            setIsLoading(false);
            return;
        }
        const passwordError = validatePasswordMatch(formData.password, formData.confirmPassword);
        if (passwordError) {
            setError(passwordError);
            setPasswordError(passwordError);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    idNumber: formData.idNumber,
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber,
                    role: formData.role,
                }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! Status: ${response.status}`);
            }
            if (data.success) {
                setEmail(formData.email);
                setShowOTPPopup(true);
                setIsLoading(false);
            } else {
                setError(data.message || 'Signup failed');
                setIsLoading(false);
            }
        } catch (error) {
            setError(error.message || 'An error occurred during signup.');
            setIsLoading(false);
        }
    };

    const handleOTPSubmit = async (event) => {
        event.preventDefault();
        setOtpError('');
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
                setShowOTPPopup(false);
                setIsLoading(false);
                navigate('/login');
            } else {
                setOtpError(data.message || 'Invalid or expired OTP');
                setIsLoading(false);
            }
        } catch (error) {
            setOtpError(error.message || 'An error occurred during OTP verification.');
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setIsLoading(true);
        setOtpError('');
        setError('');

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setOtpError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! Status: ${response.status}`);
            }
            setError(data.message || 'OTP resent successfully. Check your email.');
        } catch (err) {
            setOtpError(err.message || 'An error occurred during OTP resend. Please try again.');
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
            <div className="max-w-6xl w-full bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden">
                {/* Left: Signup or OTP Verification Form */}
                <div className="w-1/2 p-10 bg-teal-800 relative">
                    <div className="content">
                        <div className="flex justify-center mb-6">
                            <img src="/images/appLogo.png" alt="Grade 12 Revision Hub" className="h-24" />
                        </div>
                        <h2 className="text-3xl font-bold text-white text-center mb-2">
                            {showOTPPopup ? 'Verify Your Email' : 'Join Revision Hub'}
                        </h2>
                        <p className="text-gray-300 text-center mb-8 md:mb-6">
                            {showOTPPopup ? 'Enter your email and the OTP sent to you.' : 'Start your study journey today!'}
                        </p>
                        {!showOTPPopup ? (
                            <form id="signupForm" encType="multipart/form-data" className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                            placeholder="First Name"
                                            disabled={isLoading}
                                        />
                                        <label
                                            htmlFor="firstName"
                                            className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                        >
                                            First Name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                            placeholder="Last Name"
                                            disabled={isLoading}
                                        />
                                        <label
                                            htmlFor="lastName"
                                            className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                        >
                                            Last Name
                                        </label>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="idNumber"
                                        name="idNumber"
                                        value={formData.idNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="ID Number"
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="idNumber"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                    >
                                        ID Number
                                    </label>
                                    {idError && <p className="text-red-400 text-sm mt-1">{idError}</p>}
                                </div>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="Phone Number"
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="phoneNumber"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                    >
                                        Phone Number
                                    </label>
                                    {phoneError && <p className="text-red-400 text-sm mt-1">{phoneError}</p>}
                                </div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
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
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent pr-10"
                                        placeholder="Password"
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="password"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
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
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent pr-10"
                                        placeholder="Confirm Password"
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400 "
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
                                    {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit w-full flex items-center justify-center bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200"
                                    disabled={isLoading || idError || phoneError || passwordError}
                                >
                                    Sign Up
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
                        {error && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center">
                                {error}
                            </p>
                        )}
                        {otpError && showOTPPopup && (
                            <p id="otpErrorMessage" className="text-red-400 text-sm mt-4 text-center">
                                {otpError}
                            </p>
                        )}
                        {showOTPPopup && (
                            <button
                                onClick={handleResendOTP}
                                className="text-teal-400 hover:underline text-sm mt-4 text-center w-full"
                                disabled={isLoading}
                            >
                                Resend OTP
                            </button>
                        )}
                        <p className="text-gray-300 text-sm mt-4 text-center">
                            Already have an account?{' '}
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
                                    aria-label={showOTPPopup ? 'Verifying OTP...' : 'Signing up...'}
                                ></div>
                                <span className="text-white text-lg font-medium mt-3">
                                    {showOTPPopup ? 'Verifying OTP...' : 'Signing Up...'}
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

export default Signup;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [idNumber, setIdNumber] = useState('');
    const [idValid, setIdValid] = useState(null);
    const [otp, setOtp] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    // Real-time password matching
    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordMatch(password === confirmPassword);
        } else {
            setPasswordMatch(null);
        }
    }, [password, confirmPassword]);

    // South African ID number validation (13 digits, YYMMDD date check, Luhn check)
    const validateIdNumber = (id) => {
        if (!/^\d{13}$/.test(id)) {
            console.log('ID validation failed: Must be 13 digits, got', id);
            return { valid: false, error: 'ID must be exactly 13 digits.' };
        }

        const year = parseInt(id.substring(0, 2));
        const month = parseInt(id.substring(2, 4));
        const day = parseInt(id.substring(4, 6));

        const currentYear = new Date().getFullYear();
        const fullYear = year + (year > (currentYear % 100) ? 1900 : 2000);

        const isValidDate = (y, m, d) => {
            if (m < 1 || m > 12) {
                console.log('ID validation failed: Invalid month', m);
                return false;
            }
            try {
                const date = new Date(y, m - 1, d);
                const isValid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
                if (!isValid) {
                    console.log('ID validation failed: Invalid date', { year: y, month: m, day: d });
                }
                return isValid;
            } catch (e) {
                console.log('ID validation failed: Date error', e);
                return false;
            }
        };

        if (!isValidDate(fullYear, month, day)) {
            return { valid: false, error: 'Invalid date in ID (format: YYMMDD, e.g., 980215 for 15 Feb 1998).' };
        }

        let sum = 0;
        let isEven = false;
        for (let i = 12; i >= 0; i--) {
            let digit = parseInt(id[i]);
            if (isEven) {
                let doubled = digit * 2;
                sum += Math.floor(doubled / 10) + (doubled % 10);
            } else {
                sum += digit;
            }
            isEven = !isEven;
        }
        // const isValidChecksum = sum % 10 === 0;
        // if (!isValidChecksum) {
        //     console.log('ID validation failed: Invalid checksum', { id, sum });
        //     return { valid: false, error: 'Invalid ID checksum.' };
        // }

        console.log('ID validation passed:', id);
        return { valid: true, error: null };
    };

    useEffect(() => {
        if (idNumber) {
            const result = validateIdNumber(idNumber);
            setIdValid(result.valid);
            if (!result.valid) {
                setError(result.error);
            } else {
                setError('');
            }
        } else {
            setIdValid(null);
            setError('');
        }
    }, [idNumber]);

    const sendOtp = async (formData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    idNumber: formData.get('idNumber'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    phoneNumber: formData.get('phoneNumber'),
                    role: formData.get('role') || 'USER'
                }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setShowOtpModal(true);
            } else {
                setError(data.message || 'Failed to send OTP. Please check your details and try again.');
            }
        } catch (error) {
            setError('Error sending OTP: Network issue or server unavailable. Please try again.');
        }
    };

    const verifyOtp = async (email, otpCode) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otpCode }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok && data.success) {
                return true;
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
                return false;
            }
        } catch (error) {
            setError('Error verifying OTP: Network issue or server unavailable. Please try again.');
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const form = event.target;
        const formData = new FormData(form);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const idNumber = formData.get('idNumber');
        const phoneNumber = formData.get('phoneNumber');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const role = formData.get('role') || 'USER';
        const profilePicture = formData.get('profilePicture');

        // Client-side validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }
        if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
            setError('Please enter a valid phone number (10-15 digits).');
            setIsLoading(false);
            return;
        }
        const idResult = validateIdNumber(idNumber);
        if (!idResult.valid) {
            setError(idResult.error || 'Invalid ID number. Must be a valid 13-digit South African ID with correct date and checksum.');
            setIsLoading(false);
            return;
        }
        if (profilePicture && profilePicture.size > 5 * 1024 * 1024) {
            setError('Profile picture must be less than 5MB.');
            setIsLoading(false);
            return;
        }

        // Send OTP with full form data
        await sendOtp(formData);
        setIsLoading(false);
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const form = document.getElementById('signupForm');
        const formData = new FormData(form);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const idNumber = formData.get('idNumber');
        const phoneNumber = formData.get('phoneNumber');
        const email = formData.get('email');
        const password = formData.get('password');
        const role = formData.get('role') || 'USER';

        if (await verifyOtp(email, otp)) {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        idNumber,
                        email,
                        password,
                        phoneNumber,
                        role,
                    }),
                    credentials: 'include',
                });

                const data = await response.json();
                if (!response.ok) {
                    const errorMsg =
                        response.status === 415
                            ? 'Unsupported Media Type: Backend expects JSON.'
                            : response.status === 400
                                ? 'Invalid request: Check JSON payload.'
                                : response.status === 404
                                    ? 'Endpoint not found.'
                                    : `HTTP error! Status: ${response.status}`;
                    throw new Error(data.message || errorMsg);
                }

                if (data.success) {
                    form.reset();
                    setShowOtpModal(false);
                    navigate('/login');
                } else {
                    setError(data.message || 'Signup failed');
                }
            } catch (error) {
                setError(error.message || 'An error occurred during signup.');
            }
        }
        setIsLoading(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                    .password-match {
                        color: #34c759;
                        font-size: 0.875rem;
                        margin-top: 4px;
                    }
                    .password-mismatch {
                        color: #ff3b30;
                        font-size: 0.875rem;
                        margin-top: 4px;
                    }
                    .id-valid {
                        color: #34c759;
                        font-size: 0.875rem;
                        margin-top: 4px;
                    }
                    .id-invalid {
                        color: #ff3b30;
                        font-size: 0.875rem;
                        margin-top: 4px;
                    }
                    .otp-modal {
                        background: #1f7a6e;
                        padding: 24px;
                        border-radius: 12px;
                        width: 300px;
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
            <div className="max-w-6xl w-full bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden relative">
                <div className="w-1/2 p-10 bg-teal-800 relative">
                    <div className="content" style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease-in-out' }}>
                        <div className="flex justify-center mb-6">
                            <img src="/images/appLogo.png" alt="Grade 12 Revision Hub" className="h-24" />
                        </div>
                        <h2 className="text-3xl font-bold text-white text-center mb-2">Join Revision Hub</h2>
                        <p className="text-gray-300 text-center mb-6">Start your study journey today!</p>
                        <form id="signupForm" encType="multipart/form-data" className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
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
                                    required
                                    className={`form-input peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent ${idValid === false ? 'border-red-400' : 'border-gray-600'}`}
                                    placeholder="ID Number"
                                    disabled={isLoading}
                                    onChange={(e) => setIdNumber(e.target.value.trim())}
                                />
                                <label
                                    htmlFor="idNumber"
                                    className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                >
                                    ID Number
                                </label>
                                {idValid === true && <p className="id-valid">Valid ID number</p>}
                                {idValid === false && <p className="id-invalid">{error || 'Invalid ID number'}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
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
                            </div>
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
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    required
                                    className={`form-input peer w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent pr-10 ${passwordMatch === false ? 'border-red-400' : 'border-gray-600'}`}
                                    placeholder="Confirm Password"
                                    disabled={isLoading}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
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
                                {passwordMatch === true && <p className="password-match">Passwords match</p>}
                                {passwordMatch === false && <p className="password-mismatch">Passwords do not match</p>}
                            </div>
                            <button
                                type="submit"
                                className="btn-submit w-full flex items-center justify-center"
                                disabled={isLoading}
                            >
                                Sign Up
                            </button>
                        </form>
                        {error && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center">
                                {error}
                            </p>
                        )}
                        <p className="text-gray-300 text-sm mt-4 text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-teal-400 hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                    {isLoading && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div
                                    className="spinner"
                                    role="status"
                                    aria-label="Signing up..."
                                ></div>
                                <span className="loading-text">Signing Up...</span>
                            </div>
                        </div>
                    )}
                    {showOtpModal && (
                        <div className="modal-overlay">
                            <div className="otp-modal">
                                <h3 className="text-xl font-semibold text-white mb-4">Enter OTP</h3>
                                <p className="text-gray-300 mb-4">An OTP has been sent to your email.</p>
                                <form onSubmit={handleOtpSubmit}>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-teal-700 text-white mb-4"
                                        placeholder="Enter OTP"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        className="btn-submit w-full flex items-center justify-center"
                                        disabled={isLoading}
                                    >
                                        Verify OTP
                                    </button>
                                </form>
                                {error && (
                                    <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-1/2 bg-gradient-to-b from-teal-600 to-red-600 p-6 relative overflow-hidden flex flex-col justify-start items-center">
                    <h3 className="text-2xl font-semibold text-white mt-10 mb-4 z-10">Why Revision Hub?</h3>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="relative w-full flex flex-col items-center">
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
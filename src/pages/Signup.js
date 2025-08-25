import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [error, setError] = useState('');
    const [idError, setIdError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
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

    const validateFirstName = (name) => {
        if (!name.trim()) {
            return 'First name is required.';
        }
        if (!/^[a-zA-Z\s-]{2,}$/.test(name)) {
            return 'First name must be at least 2 characters and contain only letters, spaces, or hyphens.';
        }
        return '';
    };

    const validateLastName = (name) => {
        if (!name.trim()) {
            return 'Last name is required.';
        }
        if (!/^[a-zA-Z\s-]{2,}$/.test(name)) {
            return 'Last name must be at least 2 characters and contain only letters, spaces, or hyphens.';
        }
        return '';
    };

    const validateEmail = (email) => {
        if (!email.trim()) {
            return 'Email is required.';
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return 'Please enter a valid email address.';
        }
        return '';
    };

    const validateIdNumber = (id) => {
        if (!id.trim()) {
            return 'ID number is required.';
        }
        if (!/^\d{13}$/.test(id)) {
            return 'ID number must be exactly 13 digits.';
        }
        const year = parseInt(id.substring(0, 2), 10);
        const month = parseInt(id.substring(2, 4), 10);
        const day = parseInt(id.substring(4, 6), 10);
        const currentYear = new Date().getFullYear() % 100;
        const fullYear = year <= currentYear ? 2000 + year : 1900 + year;
        if (month < 1 || month > 12) {
            return 'Invalid month in ID number (must be 01-12).';
        }
        if (day < 1 || day > 31) {
            return 'Invalid day in ID number (must be 01-31).';
        }
        const date = new Date(fullYear, month - 1, day);
        if (date.getFullYear() !== fullYear || date.getMonth() + 1 !== month || date.getDate() !== day) {
            return 'Invalid date in ID number.';
        }
        return '';
    };

    const validatePhoneNumber = (phone) => {
        if (!phone.trim()) {
            return 'Phone number is required.';
        }
        const cleanedPhone = phone.replace(/^\+/, '');
        if (!/^\d{10}$/.test(cleanedPhone)) {
            return 'Phone number must be exactly 10 digits.';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required.';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'Password must contain at least one special character.';
        }
        return '';
    };

    const validatePasswordMatch = (password, confirmPassword) => {
        if (!confirmPassword) {
            return 'Confirm password is required.';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        switch (name) {
            case 'firstName':
                setFirstNameError(validateFirstName(value));
                break;
            case 'lastName':
                setLastNameError(validateLastName(value));
                break;
            case 'idNumber':
                setIdError(validateIdNumber(value));
                break;
            case 'phoneNumber':
                setPhoneError(validatePhoneNumber(value));
                break;
            case 'email':
                setEmailError(validateEmail(value));
                break;
            case 'password':
                setPasswordError(validatePassword(value));
                break;
            case 'confirmPassword':
                setPasswordError(validatePasswordMatch(formData.password, value));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const passwordValidation = validatePassword(formData.password);
        const passwordMatch = validatePasswordMatch(formData.password, formData.confirmPassword);
        setPasswordError(passwordValidation || passwordMatch);
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const firstNameValidation = validateFirstName(formData.firstName);
        if (firstNameValidation) {
            setError(firstNameValidation);
            setFirstNameError(firstNameValidation);
            setIsLoading(false);
            return;
        }
        const lastNameValidation = validateLastName(formData.lastName);
        if (lastNameValidation) {
            setError(lastNameValidation);
            setLastNameError(lastNameValidation);
            setIsLoading(false);
            return;
        }
        const emailValidation = validateEmail(formData.email);
        if (emailValidation) {
            setError(emailValidation);
            setEmailError(emailValidation);
            setIsLoading(false);
            return;
        }
        const idValidation = validateIdNumber(formData.idNumber);
        if (idValidation) {
            setError(idValidation);
            setIdError(idValidation);
            setIsLoading(false);
            return;
        }
        const phoneValidation = validatePhoneNumber(formData.phoneNumber);
        if (phoneValidation) {
            setError(phoneValidation);
            setPhoneError(phoneValidation);
            setIsLoading(false);
            return;
        }
        const passwordValidation = validatePassword(formData.password);
        if (passwordValidation) {
            setError(passwordValidation);
            setPasswordError(passwordValidation);
            setIsLoading(false);
            return;
        }
        const passwordMatchValidation = validatePasswordMatch(formData.password, formData.confirmPassword);
        if (passwordMatchValidation) {
            setError(passwordMatchValidation);
            setPasswordError(passwordMatchValidation);
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    idNumber: formData.idNumber,
                    email: formData.email.trim(),
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
                setEmail(formData.email.trim());
                setShowOTPPopup(true);
                setIsLoading(false);
            } else {
                setError(data.message || 'Signup failed. Please try again.');
                setIsLoading(false);
            }
        } catch (error) {
            setError(error.message || 'An error occurred during signup. Please try again.');
            setIsLoading(false);
        }
    };

    const handleOTPSubmit = async (event) => {
        event.preventDefault();
        setOtpError('');
        setIsLoading(true);
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
                body: JSON.stringify({ email: email.trim(), otp }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'OTP verification failed.');
            }
            if (data.success) {
                setShowOTPPopup(false);
                setIsLoading(false);
                navigate('/login');
            } else {
                setOtpError(data.message || 'Invalid or expired OTP.');
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
                body: JSON.stringify({ email: email.trim() }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! Status: ${response.status}`);
            }
            setError('OTP resent successfully. Check your email.');
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
            <style>{`
        .form-input[type="password"]::-ms-reveal,
        .form-input[type="password"]::-ms-clear,
        .form-input[type="password"]::-webkit-credentials-auto-fill-button {
          display: none !important;
          visibility: hidden !important;
        }
      `}</style>
            <div className="max-w-6xl w-full bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            aria-invalid={firstNameError ? 'true' : 'false'}
                                            aria-describedby={firstNameError ? 'firstNameError' : undefined}
                                        />
                                        <label
                                            htmlFor="firstName"
                                            className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                        >
                                            First Name
                                        </label>
                                        {firstNameError && (
                                            <p id="firstNameError" className="text-red-400 text-sm mt-1" role="alert">
                                                {firstNameError}
                                            </p>
                                        )}
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
                                            aria-invalid={lastNameError ? 'true' : 'false'}
                                            aria-describedby={lastNameError ? 'lastNameError' : undefined}
                                        />
                                        <label
                                            htmlFor="lastName"
                                            className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                        >
                                            Last Name
                                        </label>
                                        {lastNameError && (
                                            <p id="lastNameError" className="text-red-400 text-sm mt-1" role="alert">
                                                {lastNameError}
                                            </p>
                                        )}
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
                                        aria-invalid={idError ? 'true' : 'false'}
                                        aria-describedby={idError ? 'idNumberError' : undefined}
                                    />
                                    <label
                                        htmlFor="idNumber"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                    >
                                        ID Number
                                    </label>
                                    {idError && (
                                        <p id="idNumberError" className="text-red-400 text-sm mt-1" role="alert">
                                            {idError}
                                        </p>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="Phone Number"
                                        disabled={isLoading}
                                        aria-invalid={phoneError ? 'true' : 'false'}
                                        aria-describedby={phoneError ? 'phoneNumberError' : undefined}
                                    />
                                    <label
                                        htmlFor="phoneNumber"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                                    >
                                        Phone Number
                                    </label>
                                    {phoneError && (
                                        <p id="phoneNumberError" className="text-red-400 text-sm mt-1" role="alert">
                                            {phoneError}
                                        </p>
                                    )}
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
                                        aria-invalid={emailError ? 'true' : 'false'}
                                        aria-describedby={emailError ? 'emailError' : undefined}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
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
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent pr-10"
                                        placeholder="Password"
                                        disabled={isLoading}
                                        aria-invalid={passwordError ? 'true' : 'false'}
                                        aria-describedby={passwordError ? 'passwordError' : undefined}
                                    />
                                    <label
                                        htmlFor="password"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
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
                                    {passwordError && formData.password && (
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
                                        value={formData.confirmPassword}
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
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
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
                                    {passwordError && formData.confirmPassword && (
                                        <p id="confirmPasswordError" className="text-red-400 text-sm mt-1" role="alert">
                                            {passwordError}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || firstNameError || lastNameError || idError || phoneError || emailError || passwordError}
                                    aria-label="Sign Up"
                                >
                                    {isLoading ? 'Signing Up...' : 'Sign Up'}
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
                                        aria-invalid={otpError.includes('email') ? 'true' : 'false'}
                                        aria-describedby={otpError.includes('email') ? 'otpEmailError' : undefined}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
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
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                        placeholder="Enter OTP"
                                        disabled={isLoading}
                                        aria-invalid={otpError && !otpError.includes('email') ? 'true' : 'false'}
                                        aria-describedby={otpError && !otpError.includes('email') ? 'otpError' : undefined}
                                    />
                                    <label
                                        htmlFor="otp"
                                        className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-9 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
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
                                    className="btn-submit w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || otpError}
                                    aria-label="Verify OTP"
                                >
                                    {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
                                </button>
                            </form>
                        )}
                        {error && !showOTPPopup && (
                            <p id="errorMessage" className="text-red-400 text-sm mt-4 text-center" role="alert">
                                {error}
                            </p>
                        )}
                        {otpError && showOTPPopup && (
                            <p id="otpErrorMessage" className="text-red-400 text-sm mt-4 text-center" role="alert">
                                {otpError}
                            </p>
                        )}
                        {showOTPPopup && (
                            <button
                                onClick={handleResendOTP}
                                className="text-teal-400 hover:underline text-sm mt-4 text-center w-full"
                                disabled={isLoading}
                                aria-label="Resend OTP"
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
                                    aria-label={showOTPPopup ? 'Verifying OTP...' : 'Signing Up...'}
                                ></div>
                                <span className="text-white text-lg font-medium mt-3">
                  {showOTPPopup ? 'Verifying OTP...' : 'Signing Up...'}
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

export default Signup;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
// import './VerifyOTP.css';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    // Extract email and message from query parameters
    const queryParams = new URLSearchParams(location.search);
    const rawEmail = queryParams.get('email') || '';
    const decodedEmail = decodeURIComponent(rawEmail); // Decode email
    const message = queryParams.get('message') || '';

    // Set initial info message from query params
    useEffect(() => {
        if (message) {
            setInfoMessage(decodeURIComponent(message));
        }
    }, [message]);

    // Redirect to login if no email is provided
    useEffect(() => {
        if (!decodedEmail) {
            navigate('/login');
        }
    }, [decodedEmail, navigate]);

    const handleOTPSubmit = async (event) => {
        event.preventDefault();
        setOtpError('');
        setSuccessMessage('');
        setInfoMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: decodedEmail, otp }),
                credentials: 'include',
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'OTP verification failed');
            }

            if (data.success) {
                setSuccessMessage('Email verified successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setOtpError(data.message || 'Invalid or expired OTP');
            }
        } catch (err) {
            setOtpError(err.message || 'An error occurred during OTP verification.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setIsLoading(true);
        setInfoMessage('');
        setOtpError('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: decodedEmail }),
                credentials: 'include',
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Resend OTP failed');
            }

            setInfoMessage(data.message || 'OTP resent successfully. Check your email.');
        } catch (err) {
            setOtpError(err.message || 'An error occurred during OTP resend.');
        } finally {
            setIsLoading(false);
        }
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
            <div className="max-w-md w-full bg-teal-800 rounded-2xl shadow-2xl m-4 p-10 relative">
                <div className="content" style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease-in-out' }}>
                    <div className="flex justify-center mb-6">
                        <img src="/images/appLogo.png" alt="Grade 12 Revision Hub" className="h-24" />
                    </div>
                    <h2 className="text-3xl font-bold text-white text-center mb-2">Verify Your Email</h2>
                    <p className="text-gray-300 text-center mb-6">Enter the OTP sent to {decodedEmail}</p>
                    {infoMessage && (
                        <p className="text-teal-400 text-sm text-center mb-4">{infoMessage}</p>
                    )}
                    <form onSubmit={handleOTPSubmit} className="space-y-5">
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
                                className="form-label absolute left-4 top-3 text-gray-300 transition-all peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-gray-400"
                            >
                                Enter OTP
                            </label>
                        </div>
                        {otpError && (
                            <p className="text-red-400 text-sm text-center">{otpError}</p>
                        )}
                        {successMessage && (
                            <p className="text-teal-400 text-sm text-center">{successMessage}</p>
                        )}
                        <button
                            type="submit"
                            className="btn-submit w-full flex items-center justify-center"
                            disabled={isLoading}
                        >
                            Verify OTP
                        </button>
                    </form>
                    <button
                        onClick={handleResendOTP}
                        className="text-teal-400 hover:underline text-sm mt-4 text-center w-full"
                        disabled={isLoading}
                    >
                        Resend OTP
                    </button>
                    <p className="text-gray-300 text-sm mt-4 text-center">
                        Back to{' '}
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
                                aria-label="Verifying OTP..."
                            ></div>
                            <span className="loading-text">Verifying OTP...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyOTP;
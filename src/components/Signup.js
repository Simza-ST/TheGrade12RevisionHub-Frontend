import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');
        const phoneNumber = formData.get('phoneNumber');
        const profilePicture = formData.get('profilePicture');

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
            setError('Please enter a valid phone number (10-15 digits).');
            return;
        }
        if (profilePicture && profilePicture.size > 5 * 1024 * 1024) {
            setError('Profile picture must be less than 5MB.');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Signup failed');
            }

            alert('Signup successful! Welcome to Revision App.');
            form.reset();
            setError('');
            window.location.href = '/dashboard';
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl w-full bg-teal-800 rounded-2xl shadow-2xl m-4 flex overflow-hidden">
                {/* Left: Signup Form */}
                <div className="w-1/2 p-10 bg-teal-800">
                    <div className="flex justify-center mb-6">
                        <img
                            src="https://via.placeholder.com/150x50?text=Revision+App"
                            alt="Revision App Logo"
                            className="h-8"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-white text-center mb-2">Join Revision App</h2>
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
                                />
                                <label
                                    htmlFor="firstName"
                                    className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
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
                                />
                                <label
                                    htmlFor="lastName"
                                    className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
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
                                className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                placeholder="ID Number"
                            />
                            <label
                                htmlFor="idNumber"
                                className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
                            >
                                ID Number
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                required
                                className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                placeholder="Phone Number"
                            />
                            <label
                                htmlFor="phoneNumber"
                                className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
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
                            />
                            <label
                                htmlFor="email"
                                className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
                            >
                                Email Address
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white placeholder-transparent"
                                placeholder="Password"
                            />
                            <label
                                htmlFor="password"
                                className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
                            >
                                Password
                            </label>
                        </div>
                        <div>
                            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-300 mb-2">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                accept="image/*"
                                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-800 file:text-red-200 hover:file:bg-red-700"
                            />
                        </div>
                        <div className="relative">
                            <select
                                id="role"
                                name="role"
                                required
                                className="form-input peer w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white appearance-none"
                            >
                                <option value="" disabled selected hidden></option>
                                <option value="STUDENT">Student</option>
                                <option value="TEACHER">Teacher</option>
                            </select>
                            <label
                                htmlFor="role"
                                className="form-label absolute left-4 top-3 text-gray-300 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-gray-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 transition-all"
                            >
                                Role
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-200"
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

export default Signup;
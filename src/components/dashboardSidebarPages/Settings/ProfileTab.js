import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {PencilIcon, TrashIcon} from '@heroicons/react/24/outline';
import ConfirmationModal from "../../common/ConfirmationModal";

const ProfileTab = ({ user, setUser, onActivity }) => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(user.profilePicture || null);
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPicture, setSavingPicture] = useState(false);
    const [error, setError] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const getInitials = (firstName, lastName) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setError('Please upload a valid image (JPG, JPEG, PNG, GIF).');
        }
    };

    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/user/profile/delete-account', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(await response.text());
            sessionStorage.removeItem('jwt');
            navigate('/');
        } catch (err) {
            setError(`Failed to delete account: ${err.message}`);
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

    const validateProfile = () => {
        if (!user.firstName.trim()) return 'First name is required.';
        if (!user.lastName.trim()) return 'Last name is required.';
        if (user.phoneNumber && !/^\+?\d{10,15}$/.test(user.phoneNumber)) {
            return 'Invalid phone number format (e.g., +1234567890).';
        }
        return '';
    };

    const saveProfile = async () => {
        const validationError = validateProfile();
        if (validationError) {
            setError(validationError);
            return;
        }

        setSavingProfile(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const profileData = {
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
            };
            const response = await fetch('http://localhost:6262/api/user/profile/update-profile', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            const result = await response.json();
            if (!response.ok || !result.success) {
                if (response.status === 401 || response.status === 403) {
                    sessionStorage.removeItem('jwt');
                    navigate('/login');
                    return;
                }
                throw new Error(result.message || 'Failed to update profile.');
            }

            setUser((prev) => ({
                ...prev,
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                phoneNumber: result.data.phoneNumber,
            }));
            onActivity('Updated profile information'); // Record activity
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSavingProfile(false);
        }
    };

    const saveProfilePicture = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSavingPicture(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const formData = new FormData();
            formData.append('profilePicture', file);

            const response = await fetch('http://localhost:6262/api/user/profile/update-picture', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const result = await response.json();
            if (!response.ok || !result.success) {
                if (response.status === 401 || response.status === 403) {
                    sessionStorage.removeItem('jwt');
                    navigate('/login');
                    return;
                }
                throw new Error(result.message || 'Failed to update profile picture.');
            }

            setUser((prev) => ({
                ...prev,
                profilePicture: result.data.profilePicture,
            }));
            console.log("preview: " + result.data.profilePicture)
            // setPreviewImage(result.data.profilePicture);
            onActivity('Updated profile picture'); // Record activity for profile picture update
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSavingPicture(false);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Profile Information</h3>
            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm flex items-center">
                    <span>{error}</span>
                </div>
            )}
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Preview "
                            className="h-24 w-24 rounded-full object-cover border-2 border-[var(--accent-primary)]"
                        />
                    ) : (
                        <div className="h-24 w-24 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-2xl text-[var(--text-primary)] border-2 border-[var(--accent-primary)]">
                            {getInitials(user.firstName, user.lastName)}
                        </div>
                    )}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            onChange={(e) => {
                                handleImageChange(e);
                                saveProfilePicture(e);
                            }}
                            className="block w-full text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-[var(--bg-tertiary)] file:text-[var(--text-primary)] file:border-0 file:hover:bg-[var(--hover-tertiary)] transition"
                            aria-label="Upload profile picture"
                            disabled={savingPicture}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={user.firstName || ''}
                            onChange={handleProfileChange}
                            placeholder="First name"
                            className={`form-input ${error?.includes('First name') ? 'border-[var(--accent-secondary)]' : ''}`}
                            aria-label="Enter first name"
                            aria-invalid={error?.includes('First name')}
                            aria-describedby={error?.includes('First name') ? 'error-message' : undefined}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={user.lastName || ''}
                            onChange={handleProfileChange}
                            placeholder="Last name"
                            className={`form-input ${error?.includes('Last name') ? 'border-[var(--accent-secondary)]' : ''}`}
                            aria-label="Enter last name"
                            aria-invalid={error?.includes('Last name')}
                            aria-describedby={error?.includes('Last name') ? 'error-message' : undefined}
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber || ''}
                            onChange={handleProfileChange}
                            placeholder="+1234567890"
                            className={`form-input ${error?.includes('phone number') ? 'border-[var(--accent-secondary)]' : ''}`}
                            aria-label="Enter phone number"
                            aria-invalid={error?.includes('phone number')}
                            aria-describedby={error?.includes('phone number') ? 'error-message' : undefined}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={user.email || ''}
                            disabled
                            placeholder="email@example.com"
                            className={`form-input ${error?.includes('email') ? 'border-[var(--accent-secondary)]' : ''}`}
                            aria-label="Enter email"
                            aria-invalid={error?.includes('email')}
                            aria-describedby={error?.includes('email') ? 'error-message' : undefined}
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={saveProfile}
                        disabled={savingProfile}
                        className={`px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200 flex gap-2 ${savingProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Save profile information"
                    >
                        <PencilIcon className="w-4 h-4" />
                        {savingProfile ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
                <div>
                    <h4 className="text-base font-medium text-[var(--text-primary)] mb-2">
                        Delete Account
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                        Permanently delete your account and data
                    </p>
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200 flex gap-2"
                        aria-label="Delete Account"
                        disabled={loading}
                    >
                        <TrashIcon className="w-4 h-4" />
                        Delete Account
                    </button>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAccount}
                title="Confirm Account Deletion"
                message="Are you sure you want to delete your account? This action cannot be undone."
            />
        </div>
    );
};

ProfileTab.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    setUser: PropTypes.func.isRequired,
    onActivity: PropTypes.func.isRequired,
};

export default ProfileTab;
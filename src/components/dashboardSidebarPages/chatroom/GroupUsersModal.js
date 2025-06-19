import React, { useState } from 'react';
import { FiTrash2, FiUser } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';

const GroupUsersModal = ({
                             editGroupId,
                             editGroupName,
                             setEditGroupName,
                             setEditGroupId,
                             handleEditGroup,
                             groupUsers,
                             handleRemoveUser,
                             availableUsers,
                             handleAddUser,
                             isAdmin,
                             currentUserId,
                         }) => {
    const [selectedUserId, setSelectedUserId] = useState('');

    if (!editGroupId) return null;

    return (
        <div
            className="fixed inset-0 bg-[var(--bg-primary)] bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => {
                setEditGroupId(null);
                setEditGroupName('');
                setSelectedUserId('');
            }}
        >
            <div
                className="bg-[var(--bg-secondary)] p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-[360px] sm:max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4">Manage Group</h2>

                {/* Edit Group Name */}
                {isAdmin && (
                    <div className="mb-4">
                        <label htmlFor="groupName" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                            Group Name
                        </label>
                        <input
                            id="groupName"
                            type="text"
                            value={editGroupName}
                            onChange={(e) => setEditGroupName(e.target.value)}
                            placeholder="Enter group name"
                            className="w-full px-3 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hover-tertiary)]"
                            aria-label="Edit group name"
                        />
                    </div>
                )}

                {/* Add User */}
                {isAdmin && (
                    <div className="mb-4">
                        <label htmlFor="addUser" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                            Add User
                        </label>
                        <div className="flex items-center gap-2">
                            <select
                                id="addUser"
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="w-full px-3 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hover-tertiary)] text-sm sm:text-base"
                                aria-label="Select user to add"
                            >
                                <option value="" disabled>
                                    Select a user
                                </option>
                                {availableUsers
                                    ?.filter((user) => !groupUsers.some((gu) => gu.id === user.id))
                                    ?.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.firstName} {user.lastName}
                                        </option>
                                    ))}
                            </select>
                            <button
                                onClick={() => {
                                    if (selectedUserId) {
                                        handleAddUser(selectedUserId);
                                        setSelectedUserId('');
                                    }
                                }}
                                className="px-3 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] min-w-[40px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!selectedUserId}
                                aria-label="Add selected user"
                                data-tooltip-id="add-tooltip"
                                data-tooltip-content="Add"
                            >
                                <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <Tooltip id="add-tooltip" place="top" />
                        </div>
                    </div>
                )}

                {/* Display Users */}
                <div className="mb-4 max-h-40 sm:max-h-48 overflow-y-auto">
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-2">Group Members</h3>
                    {groupUsers && groupUsers.length > 0 ? (
                        <ul className="space-y-2">
                            {groupUsers.map((user) => (
                                <li
                                    key={user.id}
                                    className="flex items-center justify-between bg-[var(--bg-tertiary)] p-2 sm:p-3 rounded-lg"
                                >
                                    <div className="flex items-center space-x-2">
                                        <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-primary)]" />
                                        <span className="text-sm sm:text-base text-[var(--text-primary)] truncate max-w-[150px] sm:max-w-[200px]">
                                            {user.firstName} {user.lastName}
                                            {user.isAdmin && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--hover-tertiary)] text-[var(--text-primary)]">
                                                    Admin
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    {isAdmin && user.id !== currentUserId && (
                                        <button
                                            onClick={() => handleRemoveUser(user.id)}
                                            className="p-1 sm:p-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] min-w-[36px] min-h-[36px] flex items-center justify-center"
                                            aria-label={`Remove ${user.firstName} ${user.lastName} from group`}
                                        >
                                            <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-[var(--text-primary)]">No users in this group.</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 sm:gap-4">
                    <button
                        onClick={() => {
                            setEditGroupId(null);
                            setEditGroupName('');
                            setSelectedUserId('');
                        }}
                        className="px-3 py-2 sm:px-4 sm:py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] min-w-[80px] sm:min-w-[100px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center text-sm sm:text-base"
                        aria-label="Cancel"
                    >
                        Cancel
                    </button>
                    {isAdmin && (
                        <button
                            onClick={handleEditGroup}
                            className="px-3 py-2 sm:px-4 sm:py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] min-w-[80px] sm:min-w-[100px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center text-sm sm:text-base"
                            aria-label="Save changes"
                            disabled={!editGroupName.trim()}
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

GroupUsersModal.propTypes = {
    editGroupId: PropTypes.number,
    editGroupName: PropTypes.string.isRequired,
    setEditGroupName: PropTypes.func.isRequired,
    setEditGroupId: PropTypes.func.isRequired,
    handleEditGroup: PropTypes.func.isRequired,
    groupUsers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            isAdmin: PropTypes.bool, // For admin indication
        })
    ).isRequired,
    handleRemoveUser: PropTypes.func.isRequired,
    availableUsers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        })
    ).isRequired,
    handleAddUser: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired, // For self-deletion prevention
};

export default GroupUsersModal;
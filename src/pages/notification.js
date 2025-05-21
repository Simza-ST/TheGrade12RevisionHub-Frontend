import React, { useState, useEffect } from 'react';

// Mock user and notifications data (replace with API fetch if needed)
const mockUser = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    profilePicture: "https://via.placeholder.com/35",
};

const mockNotifications = [
    { id: 1, message: "Welcome to the platform!", isRead: false, type: "welcome", formattedCreatedAt: "2025-05-20 10:00" },
    { id: 2, message: "New quiz available", isRead: true, type: "quiz", formattedCreatedAt: "2025-05-20 09:00" },
];

// Navbar Component
function Navbar({ user, unreadCount, toggleSidebar, toggleDarkMode }) {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 flex justify-between items-center p-4 z-10 shadow-md">
            <div className="flex items-center gap-2">
                <i className="bx bx-menu text-2xl text-gray-600 cursor-pointer" onClick={toggleSidebar}></i>
                <div>
                    <h6 className="text-gray-500">Welcome</h6>
                    <h3 className="text-blue-600 font-medium">{`${user.firstName} ${user.lastName}`}</h3>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <i className="bi bi-grid text-xl text-gray-600 cursor-pointer"></i>
                <i className={`bx ${toggleDarkMode ? 'bx-moon' : 'bx-sun'} text-xl text-gray-600 cursor-pointer`} onClick={toggleDarkMode}></i>
                <div className="relative flex items-center">
                    <i className="fas fa-bell text-xl text-gray-600 hover:text-orange-500 cursor-pointer"></i>
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
                    )}
                </div>
                <img src={user.profilePicture} alt="Profile Picture" className="w-9 h-9 rounded-full object-cover" />
            </div>
        </nav>
    );
}

// Sidebar Component
function Sidebar({ isSidebarOpen, toggleSidebar }) {
    const navItems = [
        { href: "/api/student/studentDashboard", icon: "bx-home", label: "Home" },
        { href: "/subject/allSubjects", icon: "bx-book", label: "Subjects" },
        { href: "/api/student/quiz/getAvailableQuiz", icon: "bx-task", label: "Quizzes" },
        { href: "/resources/viewResources", icon: "bx-folder", label: "Resources" },
        { href: "/getChatroomPage", icon: "bx-chat", label: "Chatroom" },
        { href: "/notifications", icon: "bx-news", label: "Notifications" },
        { href: "/student/profile/getProfile", icon: "bx-cog", label: "Profile" },
        { href: "/logout", icon: "bx-log-out", label: "Logout" },
    ];

    return (
        <nav className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 w-64 p-5 pt-20 z-10 shadow-md transition-all duration-500 ${isSidebarOpen ? '' : 'w-20'}`}>
            <div className="relative">
                <ul className="list-none">
                    <div className={`text-gray-500 text-lg mb-4 ${isSidebarOpen ? 'pl-5' : 'pl-0 text-center'}`}>
                        {isSidebarOpen ? "Student Dashboard" : ""}
                    </div>
                    {navItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            <a href={item.href} className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-blue-600 hover:text-white">
                <span className={`text-xl w-12 text-center ${isSidebarOpen ? '' : 'block'}`}>
                  <i className={`bx ${item.icon}`}></i>
                </span>
                                {isSidebarOpen && <span className="ml-2">{item.label}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className={`fixed bottom-16 left-0 w-64 ${isSidebarOpen ? '' : 'w-12 left-4'} transition-all duration-500`}>
                    <div className="flex items-center justify-around p-4 border-t border-gray-300 bg-white dark:bg-gray-800 text-gray-600 cursor-pointer" onClick={toggleSidebar}>
                        {isSidebarOpen ? (
                            <>
                                <span>Collapse</span>
                                <i className="bx bx-log-in text-xl"></i>
                            </>
                        ) : (
                            <i className="bx bx-log-in text-xl"></i>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Modal Component
function Modal({ isOpen, onClose, onConfirm, title, text }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md text-center">
                <h2 className="text-red-500 text-xl mb-4">{title}</h2>
                <p className="mb-6">{text}</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600" onClick={onConfirm}>Delete</button>
                    <button className="bg-gray-300 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-400" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

// Notifications Component
function Notifications({ user, notifications, setNotifications }) {
    const [filter, setFilter] = useState("all");
    const [modal, setModal] = useState({ isOpen: false, notificationId: null });

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const totalCount = notifications.length;
    const readCount = notifications.filter(n => n.isRead).length;

    const updateCounts = (data) => {
        setNotifications(data.notifications || notifications);
    };

    const markAllAsRead = async () => {
        try {
            const response = await fetch(`/notifications/markAllAsRead?recipientId=${user.id}`, { method: "POST", credentials: "include" });
            if (!response.ok) throw new Error("Failed to mark all as read");
            const data = await response.json();
            setNotifications(notifications.map(n => ({ ...n, isRead: true })));
            updateCounts(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const markNotificationAsRead = async (notificationId) => {
        try {
            const response = await fetch(`/notifications/mark-read/${notificationId}`, { method: "POST", credentials: "include" });
            if (!response.ok) throw new Error("Failed to mark as read");
            const data = await response.json();
            setNotifications(notifications.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
            updateCounts(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            const response = await fetch(`/notifications/delete/${notificationId}`, { method: "DELETE", credentials: "include" });
            if (!response.ok) throw new Error("Failed to delete");
            setNotifications(notifications.filter(n => n.id !== notificationId));
            setModal({ isOpen: false, notificationId: null });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteAllNotifications = async () => {
        if (!window.confirm("Are you sure you want to delete all notifications?")) return;
        try {
            const response = await fetch(`/notifications/deleteAll?recipientId=${user.id}`, { method: "DELETE", credentials: "include" });
            if (!response.ok) throw new Error("Failed to delete all");
            setNotifications([]);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete all notifications");
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === "all") return true;
        if (filter === "unread") return !n.isRead;
        if (filter === "read") return n.isRead;
        if (filter === "welcome") return n.type === "welcome";
        return true;
    });

    return (
        <div className="md:ml-64 mt-24 mr-5 p-5">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
                <h2 className="text-2xl text-blue-600 font-semibold mb-5">Your Notifications</h2>
                <div className="flex flex-col gap-2 mb-5">
                    <p className="bg-gradient-to-r from-blue-500 to-green-100 p-2 rounded-lg text-gray-900">Unread: {unreadCount}</p>
                    <p className="bg-gradient-to-r from-blue-500 to-green-100 p-2 rounded-lg text-gray-900">Total: {totalCount}</p>
                    <p className="bg-gradient-to-r from-blue-500 to-green-100 p-2 rounded-lg text-gray-900">Read: {readCount}</p>
                </div>
                <div className="flex gap-2 mb-5">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700" onClick={markAllAsRead}>
                        Mark All as Read
                    </button>
                    <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600" onClick={deleteAllNotifications}>
                        Delete All Notifications
                    </button>
                </div>
                <div className="mb-5">
                    <label htmlFor="notificationFilter" className="mr-2">Filter Notifications:</label>
                    <select
                        id="notificationFilter"
                        className="p-2 border border-gray-300 rounded-lg hover:border-blue-600"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="welcome">Welcome</option>
                    </select>
                </div>
                <ul className="list-none">
                    {filteredNotifications.map(notification => (
                        <li
                            key={notification.id}
                            className={`flex justify-between items-center p-4 mb-3 rounded-lg shadow-md transition-transform hover:scale-[1.02] ${notification.isRead ? 'bg-gray-100' : 'bg-blue-50'}`}
                        >
                            <div>
                                <strong className="text-blue-600 text-lg">{notification.message}</strong>
                                <br />
                                <small className="text-gray-600">
                                    <strong>Received on:</strong> {notification.formattedCreatedAt}
                                </small>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className={`px-3 py-2 rounded-lg ${notification.isRead ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                                    disabled={notification.isRead}
                                    onClick={() => markNotificationAsRead(notification.id)}
                                >
                                    {notification.isRead ? 'Read' : 'Mark as Read'}
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                                    onClick={() => setModal({ isOpen: true, notificationId: notification.id })}
                                >
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ isOpen: false, notificationId: null })}
                onConfirm={() => deleteNotification(modal.notificationId)}
                title="Confirm Delete"
                text="Are you sure you want to delete this notification?"
            />
        </div>
    );
}

// Main App Component
function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [notifications, setNotifications] = useState(mockNotifications);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, []);

    // Optional: Fetch real data from API
    /*
    useEffect(() => {
      fetch('/notifications', { credentials: 'include' })
        .then(response => response.json())
        .then(data => setNotifications(data.notifications))
        .catch(error => console.error('Error fetching notifications:', error));
    }, []);
    */

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <Navbar
                user={mockUser}
                unreadCount={notifications.filter(n => !n.isRead).length}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Notifications user={mockUser} notifications={notifications} setNotifications={setNotifications} />
        </div>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollButton from './components/ScrollButton';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Subjects from './components/Subjects';
import Quizzes from './components/Quizzes';
import QuestionPapers from './components/QuestionPapers';
import Resources from './components/Resources';
import Schedule from './components/Schedule';
import Performance from './components/Performance';
import Notifications from './components/Notifications';
import Chatroom from './components/Chatroom';
import Settings from './components/Settings';

// Basic PublicLayout component to wrap public routes
const PublicLayout = () => (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
        <ScrollButton />
    </div>
);

const App = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New quiz available in Mathematics', date: '2025-05-20', read: false },
        { id: 2, message: 'Assignment due in Physics', date: '2025-05-21', read: false },
        { id: 3, message: 'Study group meeting scheduled', date: '2025-05-19', read: true },
    ]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setIsAuthenticated(!!token); // Set to true if token exists
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route element={<PublicLayout />}>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Home />
                                    <About />
                                    <Skills />
                                    <Services />
                                    <Contact />
                                </>
                            }
                        />
                        {/* Commenting out /upload until FileUploader is provided */}
                        {/* <Route path="/upload" element={<FileUploader />} /> */}
                    </Route>

                    {/* Authentication routes */}
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Protected routes */}
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated ? (
                                <Dashboard
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/subjects"
                        element={
                            isAuthenticated ? (
                                <Subjects
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/quizzes"
                        element={
                            isAuthenticated ? (
                                <Quizzes
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/questionpapers"
                        element={
                            isAuthenticated ? (
                                <QuestionPapers
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/resources"
                        element={
                            isAuthenticated ? (
                                <Resources
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/schedule"
                        element={
                            isAuthenticated ? (
                                <Schedule
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/performance"
                        element={
                            isAuthenticated ? (
                                <Performance
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/notifications"
                        element={
                            isAuthenticated ? (
                                <Notifications
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/chatroom"
                        element={
                            isAuthenticated ? (
                                <Chatroom
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            isAuthenticated ? (
                                <Settings
                                    isCollapsed={isCollapsed}
                                    setIsCollapsed={setIsCollapsed}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    notifications={notifications}
                                    setNotifications={setNotifications}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
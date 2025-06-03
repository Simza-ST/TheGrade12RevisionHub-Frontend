import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/welcomePages/Navbar';
import Home from './components/welcomePages/Home';
import About from './components/welcomePages/About';
import Skills from './components/welcomePages/Skills';
import Services from './components/welcomePages/Services';
import Contact from './components/welcomePages/Contact';
import Footer from './components/welcomePages/Footer';
import ScrollButton from './components/ScrollButton';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './components/Dashboard';
import Resources from './components/dashboardSidebarPages/Resources';
import Schedule from './components/onDashboardPages/Schedule';
import Performance from './components/dashboardSidebarPages/Performance';
import Notifications from './components/dashboardSidebarPages/Notifications';
import Chatroom from './components/dashboardSidebarPages/Chatroom';
import Settings from './components/dashboardSidebarPages/Settings';
//import QuestionPapers from "./components/dashboardSidebarPages/question-papers/QuestionPapers";
import QuestionPapersList from "./components/dashboardSidebarPages/question-papers/QuestionPapersList";
import QuestionPaperDetails from "./components/dashboardSidebarPages/question-papers/QuestionPaperDetails";
import Quizzes from './components/dashboardSidebarPages/quiz/Quizzes';
import Subjects from "./components/dashboardSidebarPages/subject/Subjects";


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
                        path="/question-papers"
                        element={
                            isAuthenticated ? (
                                <QuestionPapersList
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
                        path="/question-papers"
                        element={
                            isAuthenticated ? (
                                <QuestionPaperDetails
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
                    <Route path="/question-papers/list" element={<QuestionPapersList  darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                    <Route path="/question-papers/:id" element={<QuestionPaperDetails />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
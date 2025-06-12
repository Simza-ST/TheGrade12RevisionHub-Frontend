import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom';
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
import Resources from './components/dashboardSidebarPages/Resources/Resources';
import Schedule from './components/onDashboardPages/Schedule';
import Performance from './components/dashboardSidebarPages/Perfomances/Performance';
import Notifications from './components/dashboardSidebarPages/notifications/Notifications';
import Chatroom from './components/dashboardSidebarPages/chatroom/Chatroom';
import Settings from './components/dashboardSidebarPages/Settings/Settings';
import QuestionPapersList from './components/dashboardSidebarPages/question-papers/QuestionPapersList';
import QuestionPaperDetails from './components/dashboardSidebarPages/question-papers/QuestionPaperDetails';
import Quizzes from './components/dashboardSidebarPages/quiz/Quizzes';
import Subjects from './components/dashboardSidebarPages/subject/Subjects';
import DigitizedQuestionPapers from './components/dashboardSidebarPages/quiz/DigitizedQuestionPapers';
import EnglishFALP12020 from './components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/EnglishFALP12020';
import { API_BASE_URL, getAuthHeaders } from './utils/api';

const PublicLayout = () => (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
        <ScrollButton />
    </div>
);

const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New quiz available in Mathematics', date: '2025-05-20', read: false },
        { id: 2, message: 'Assignment due in Physics', date: '2025-05-21', read: false },
        { id: 3, message: 'Study group meeting scheduled', date: '2025-05-19', read: true },
    ]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            try {
                const response = await fetch(`${API_BASE_URL}/user/profile`, {
                    headers: getAuthHeaders(),
                });
                if (response.status === 401) {
                    localStorage.removeItem('jwt');
                    setIsAuthenticated(false);
                } else if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                setIsAuthenticated(false);
            }
        };
        validateToken();
    }, []);

    const commonProps = {
        isCollapsed,
        setIsCollapsed,
        darkMode,
        setDarkMode,
        notifications,
        setNotifications,
    };

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
                    </Route>

                    {/* Authentication routes */}
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Protected routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/subjects"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Subjects {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/quizzes"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Quizzes {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/question-papers"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <QuestionPapersList {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/question-papers/list"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <QuestionPapersList {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/question-papers/:id"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <QuestionPaperDetails {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/resources"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Resources {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/schedule"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Schedule {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/performance"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Performance {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/notifications"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Notifications {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chatroom"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Chatroom {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Settings {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/digitized-question-papers"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <DigitizedQuestionPapers {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/digitized-question-papers/:id"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <QuestionPaperView {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </div>
    );
};

function QuestionPaperView({ darkMode, setDarkMode, notifications, ...rest }) {
    const { id } = useParams();
    if (id === '1') {
        return <EnglishFALP12020 darkMode={darkMode} setDarkMode={setDarkMode} notifications={notifications} />;
    }
    return <div>Paper not found</div>;
}

export default App;
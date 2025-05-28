import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Subjects from './components/subject/Subjects';
import Quizzes from './components/quiz/Quizzes';
import QuestionPapers from './components/question-papers/QuestionPapers';
import QuestionPapersList from './components/question-papers/QuestionPapersList';
import QuestionPaperDetails from './components/question-papers/QuestionPaperDetails';
import Resources from './components/Resources';
import Schedule from './components/Schedule';
import Performance from './components/Performance';
import Notifications from './components/Notifications';
import Chatroom from './components/Chatroom';
import Settings from './components/Settings';

// const ProtectedRoute = () => {
//     const token = localStorage.getItem('jwt');
//     return token ? <Outlet /> : <Navigate to="/login" replace />;
// };

const App = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New quiz available in Mathematics', date: '2025-05-20', read: false },
        { id: 2, message: 'Assignment due in Physics', date: '2025-05-21', read: false },
        { id: 3, message: 'Study group meeting scheduled', date: '2025-05-19', read: true },
    ]);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/subjects"
                    element={
                        <Subjects
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/quizzes"
                    element={
                        <Quizzes
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/questionpapers"
                    element={
                        <QuestionPapers
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/resources"
                    element={
                        <Resources
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/schedule"
                    element={
                        <Schedule
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/performance"
                    element={
                        <Performance
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <Notifications
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/chatroom"
                    element={
                        <Chatroom
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <Settings
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    }
                />
                    <Route path="/question-papers/list" element={<QuestionPapersList />} />
                    <Route path="/question-papers/:id" element={<QuestionPaperDetails />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
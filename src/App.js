import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useParams, useNavigate } from 'react-router-dom';
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
import StudentDashboard from './components/./StudentDashboard';
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
import AdminDashboard from "./components/AdminDashboard";
import StudentsList from "./components/adminDashboardSideBarPages/AdminStudents/Students";
import UploadDocuments from "./components/adminDashboardSideBarPages/UploadingDoc/UploadDocuments";
import QuizCreation from "./components/adminDashboardSideBarPages/AdminQuiz/QuizCreation";
import CertificateGenerator from "./components/adminDashboardSideBarPages/AdminStudents/CertificateGenerator";
import QuizViewer from "./components/adminDashboardSideBarPages/AdminQuiz/QuizViewer";
import Chat from "./components/adminDashboardSideBarPages/EmailChat/Chat";
import QuizView from "./components/dashboardSidebarPages/quiz/QuizView";
import MathematicsP1Nov2022Eng
    from "./components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/MathematicsP1Nov2022Eng";
import DigitizedQuestionPaperView from "./components/dashboardSidebarPages/quiz/DigitizedQuestionPaperView";
import UploadResources from "./components/adminDashboardSideBarPages/UploadingResourses/UploadResources";

const PublicLayout = () => (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
        <ScrollButton />
    </div>
);

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem('jwt');
            console.log('JWT Token:', token || 'No token found');
            if (!token) {
                setIsAuthenticated(false);
                setError('No authentication token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:6262/api/user/profile/getUserDetails', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('User Details Response Status:', response.status);
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('User Details Error:', errorData);
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                }

                const { data } = await response.json();
                console.log('User Data:', data);
                setUser({
                    id: data.userId,
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    phoneNumber: data.phoneNumber || '',
                    email: data.email || '',
                    title: data.title || 'Grade 12 Learner',
                    profilePicture: data.profilePicture || null,
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Auth Check Failed:', error.message);
                setError(`Authentication failed: ${error.message}`);
                sessionStorage.removeItem('jwt');
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"
                    role="status"
                    aria-label="Checking authentication..."
                ></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                <div className="p-6 bg-red-600 text-white rounded-lg">
                    <p>{error}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-800 rounded"
                        aria-label="Return to login"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return isAuthenticated ? React.cloneElement(children, { user ,setUser}) : <Navigate to="/login" replace />;
}

const App = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [notifications, setNotifications] = useState([]); // Added state for notifications

    useEffect(() => {
        const validateToken = async () => {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            try {
                const response = await fetch(`${API_BASE_URL}/user/profile`, {
                    headers: getAuthHeaders(),
                });
                if (response.status === 401) {
                    sessionStorage.removeItem('jwt');
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
                            <ProtectedRoute >
                                <StudentDashboard {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-Dashboard"
                        element={
                            <ProtectedRoute >
                                <AdminDashboard {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/students"
                        element={
                            <ProtectedRoute >
                                <StudentsList {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/upload-documents"
                        element={
                            <ProtectedRoute >
                                <UploadDocuments {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/quiz-creation"
                        element={
                            <ProtectedRoute >
                                <QuizCreation {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cert-creation"
                        element={
                            <ProtectedRoute >
                                <CertificateGenerator {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/quiz-viewer"
                        element={
                            <ProtectedRoute >
                                <QuizViewer {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute >
                                <Chat {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/chat" element={<Chat />} />
                    <Route
                        path="/subjects"
                        element={
                            <ProtectedRoute >
                                <Subjects {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/quizzes"
                        element={
                            <ProtectedRoute >
                                <Quizzes {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/quizzes/:id"
                        element={
                            <ProtectedRoute >
                                <QuizView {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/question-papers"
                        element={
                            <ProtectedRoute >
                                <QuestionPapersList {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/question-papers/list"
                        element={
                            <ProtectedRoute >
                                <QuestionPapersList {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/question-papers/:id"
                        element={
                            <ProtectedRoute >
                                <QuestionPaperDetails {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/resources"
                        element={
                            <ProtectedRoute >
                                <Resources {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/uploading-resources"
                        element={
                            <ProtectedRoute >
                                <UploadResources {...commonProps} />
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
                            <ProtectedRoute >
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
                                <DigitizedQuestionPaperView {...commonProps} />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
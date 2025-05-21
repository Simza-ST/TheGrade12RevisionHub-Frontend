import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useLocation } from 'react-router-dom';
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
import ResetPassword from './components/ResetPassword';
import FileUploader from './components/FileUploader';
import Dashboard from './components/Dashboard';
import Subjects from './components/Subjects'; // New component
import Quizzes from './components/Quizzes'; // New component
import QuestionPapers from './components/QuestionPapers'; // New component
import Schedule from './components/Schedule'; // New component
import Performance from './components/Performance'; // New component
import Notifications from './components/Notifications'; // New component
import Chatroom from './components/Chatroom'; // New component
import Settings from './components/Settings';
import Resources from "./components/Resources"; // New component

// Layout with Navbar for public pages
const PublicLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

// Layout without Navbar for auth/dashboard pages
const AuthLayout = () => <Outlet />;

function App() {
    const location = useLocation();
    const noNavbarRoutes = [
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/dashboard',
        '/subjects',
        '/quizzes',
        '/questionpapers',
        '/resources',
        '/schedule',
        '/performance',
        '/notifications',
        '/chatroom',
        '/settings',
    ];
    const hasNavbar = !noNavbarRoutes.includes(location.pathname);

    return (
        <div className={`App ${hasNavbar ? 'has-navbar' : ''}`}>
            <Routes>
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
                                <Footer />
                                <ScrollButton />
                            </>
                        }
                    />
                    <Route path="/upload" element={<FileUploader />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/quizzes" element={<Quizzes />} />
                    <Route path="/questionpapers" element={<QuestionPapers />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/performance" element={<Performance />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/chatroom" element={<Chatroom />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
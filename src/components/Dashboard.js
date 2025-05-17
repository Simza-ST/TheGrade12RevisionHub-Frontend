import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import * as THREE from 'three';
import Chart from 'chart.js/auto';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import confetti from 'canvas-confetti';
import { v4 as uuidv4 } from 'uuid';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    React.useEffect(() => {
        const errorHandler = (error) => {
            console.error('ErrorBoundary caught:', error);
            setHasError(true);
        };
        window.addEventListener('error', errorHandler);
        return () => window.removeEventListener('error', errorHandler);
    }, []);

    if (hasError) {
        return (
            <div className="text-red-400 text-center p-4">
                Error rendering component. Please ensure WebGL is enabled or try a different browser.
            </div>
        );
    }
    return children;
};

const Dashboard = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('subjects');
    const [xp, setXp] = useState(500);
    const [voiceActive, setVoiceActive] = useState(false);
    const [studyRoom, setStudyRoom] = useState(false);
    const [tasks, setTasks] = useState([
        { id: uuidv4(), title: 'Solve Maths Problems', status: 'todo', priority: 'High', dueDate: '2025-05-17' },
        { id: uuidv4(), title: 'Read Physics Notes', status: 'todo', priority: 'Medium', dueDate: '2025-05-18' },
    ]);
    const [draggedTask, setDraggedTask] = useState(null);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [arModalOpen, setArModalOpen] = useState(false);
    const [arPaper, setArPaper] = useState(null);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [quizProgress, setQuizProgress] = useState(10);
    const [achievementOpen, setAchievementOpen] = useState(false);

    const avatarRef = useRef(null);
    const coachRef = useRef(null);
    const arGraphRef = useRef(null);
    const calendarRef = useRef(null);
    const studyFocusChartRef = useRef(null);
    const motivationHeatmapRef = useRef(null);

    const animationFrames = useRef({});

    useEffect(() => {
        Chart.register(MatrixController, MatrixElement);

        const checkWebGLSupport = () => {
            if (!window.WebGLRenderingContext) {
                console.warn('WebGL not supported');
                return false;
            }
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        };

        const initAvatar3D = () => {
            if (!avatarRef.current || !checkWebGLSupport()) return () => {};
            try {
                const canvas = avatarRef.current;
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
                renderer.setSize(32, 32);
                const geometry = new THREE.SphereGeometry(0.5, 32, 32);
                const material = new THREE.MeshBasicMaterial({ color: 0xf87171 });
                const sphere = new THREE.Mesh(geometry, material);
                scene.add(sphere);
                camera.position.z = 1;

                const animate = () => {
                    animationFrames.current.avatar = requestAnimationFrame(animate);
                    sphere.rotation.y += 0.01;
                    renderer.render(scene, camera);
                };
                animate();

                return () => {
                    cancelAnimationFrame(animationFrames.current.avatar);
                    renderer.dispose();
                    geometry.dispose();
                    material.dispose();
                };
            } catch (error) {
                console.error('initAvatar3D error:', error);
                return () => {};
            }
        };

        const initCoach3D = () => {
            if (!coachRef.current || !checkWebGLSupport()) return () => {};
            try {
                const canvas = coachRef.current;
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
                renderer.setSize(48, 48);
                const geometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
                const material = new THREE.MeshBasicMaterial({ color: 0x134e4a });
                const torus = new THREE.Mesh(geometry, material);
                scene.add(torus);
                camera.position.z = 1;

                const animate = () => {
                    animationFrames.current.coach = requestAnimationFrame(animate);
                    torus.rotation.x += 0.01;
                    torus.rotation.y += 0.01;
                    renderer.render(scene, camera);
                };
                animate();

                return () => {
                    cancelAnimationFrame(animationFrames.current.coach);
                    renderer.dispose();
                    geometry.dispose();
                    material.dispose();
                };
            } catch (error) {
                console.error('initCoach3D error:', error);
                return () => {};
            }
        };

        const initSubjectOrbs = () => {
            const subjects = [
                { name: 'Maths', progress: 90, aiPath: 'Focus on Calculus' },
                { name: 'Physics', progress: 75, aiPath: 'Review Mechanics' },
                { name: 'Chemistry', progress: 85, aiPath: 'Practice Bonding' },
            ];
            const cleanups = subjects.map((subject) => {
                const canvas = document.getElementById(`orb-${subject.name}`);
                if (!canvas || !checkWebGLSupport()) return () => {};
                try {
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
                    renderer.setSize(96, 96);
                    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
                    const material = new THREE.MeshBasicMaterial({ color: 0xf87171, wireframe: true });
                    const sphere = new THREE.Mesh(geometry, material);
                    scene.add(sphere);
                    camera.position.z = 1;

                    const animate = () => {
                        animationFrames.current[`orb-${subject.name}`] = requestAnimationFrame(animate);
                        sphere.rotation.y += 0.005;
                        renderer.render(scene, camera);
                    };
                    animate();

                    return () => {
                        cancelAnimationFrame(animationFrames.current[`orb-${subject.name}`]);
                        renderer.dispose();
                        geometry.dispose();
                        material.dispose();
                    };
                } catch (error) {
                    console.error(`initSubjectOrbs error for ${subject.name}:`, error);
                    return () => {};
                }
            });

            return () => cleanups.forEach((cleanup) => cleanup());
        };

        const initARGraph = () => {
            if (!arGraphRef.current || !checkWebGLSupport()) return () => {};
            try {
                const canvas = arGraphRef.current;
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
                renderer.setSize(canvas.clientWidth, canvas.clientHeight);
                const geometry = new THREE.BufferGeometry();
                const vertices = [];
                for (let x = -2; x <= 2; x += 0.1) {
                    const y = 2 * x * x + 3 * x - 5;
                    vertices.push(x, y / 10, 0);
                }
                geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
                const material = new THREE.LineBasicMaterial({ color: 0xf87171 });
                const line = new THREE.Line(geometry, material);
                scene.add(line);
                camera.position.z = 1;

                const animate = () => {
                    animationFrames.current.arGraph = requestAnimationFrame(animate);
                    line.rotation.y += 0.005;
                    renderer.render(scene, camera);
                };
                animate();

                return () => {
                    cancelAnimationFrame(animationFrames.current.arGraph);
                    renderer.dispose();
                    geometry.dispose();
                    material.dispose();
                };
            } catch (error) {
                console.error('initARGraph error:', error);
                return () => {};
            }
        };

        const avatarCleanup = initAvatar3D();
        const coachCleanup = initCoach3D();
        const orbsCleanup = initSubjectOrbs();
        const arGraphCleanup = initARGraph();

        return () => {
            avatarCleanup();
            coachCleanup();
            orbsCleanup();
            arGraphCleanup();
        };
    }, []);

    useEffect(() => {
        let studyFocusChart = null;
        let motivationHeatmap = null;

        if (activeTab === 'analytics') {
            if (studyFocusChartRef.current) {
                studyFocusChart = new Chart(studyFocusChartRef.current.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14'],
                        datasets: [{ label: 'Study Focus', data: [4, 3, 5, 4.5, 6], backgroundColor: 'var(--primary)' }],
                    },
                    options: {
                        responsive: true,
                        scales: { y: { beginAtZero: true, title: { display: true, text: 'Hours' } } },
                        plugins: { legend: { display: false } },
                    },
                });
            }

            if (motivationHeatmapRef.current) {
                motivationHeatmap = new Chart(motivationHeatmapRef.current.getContext('2d'), {
                    type: 'matrix',
                    data: {
                        datasets: [{
                            label: 'Motivation',
                            data: [
                                { x: 'Mon', y: 'Morning', v: 80 },
                                { x: 'Mon', y: 'Afternoon', v: 60 },
                                { x: 'Tue', y: 'Morning', v: 90 },
                                { x: 'Tue', y: 'Afternoon', v: 70 },
                            ],
                            backgroundColor: (ctx) => (ctx.raw.v > 80 ? 'var(--primary)' : ctx.raw.v > 60 ? 'var(--secondary)' : '#00117e'),
                            borderWidth: 1,
                            borderColor: 'var(--neutral-base)',
                        }],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { title: { display: true, text: 'Day' } },
                            y: { title: { display: true, text: 'Time' } },
                        },
                    },
                });
            }
        }

        return () => {
            if (studyFocusChart) studyFocusChart.destroy();
            if (motivationHeatmap) motivationHeatmap.destroy();
        };
    }, [activeTab]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'high-contrast' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    const startVoice = () => {
        setVoiceActive(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech Recognition API is not supported in this browser.');
            setVoiceActive(false);
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            if (command.includes('add task')) {
                const title = command.replace('add task', '').trim();
                document.getElementById('task-title').value = title;
                setTaskModalOpen(true);
            } else if (command.includes('go to')) {
                const tab = command.replace('go to', '').trim();
                if (['subjects', 'papers', 'tasks', 'planner', 'analytics'].includes(tab)) {
                    setActiveTab(tab);
                }
            }
        };
        recognition.onend = () => setVoiceActive(false);
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setVoiceActive(false);
        };
        recognition.start();
    };

    const speakTip = (tip) => {
        const utterance = new SpeechSynthesisUtterance(tip);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
        const captionContainer = document.getElementById('coachCaptions');
        if (captionContainer) {
            captionContainer.textContent = tip;
        }
    };

    const vibrate = (duration) => {
        if (navigator.vibrate) navigator.vibrate(duration);
    };

    const handleDragStart = (task) => setDraggedTask(task);
    const handleDrop = (status) => {
        if (draggedTask) {
            setTasks(tasks.map((t) => (t.id === draggedTask.id ? { ...t, status } : t)));
            setDraggedTask(null);
            if (status === 'done') {
                confetti({ particleCount: 100, spread: 70 });
                setXp(xp + 10);
                setAchievementOpen(true);
                vibrate(200);
            }
        }
    };

    const addTask = (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const subject = document.getElementById('task-subject').value;
        const priority = document.getElementById('task-priority').value;
        const dueDate = document.getElementById('task-due').value;
        if (title && subject && priority && dueDate) {
            setTasks([...tasks, { id: uuidv4(), title: `${title} (${subject})`, status: 'todo', priority, dueDate }]);
            setTaskModalOpen(false);
            document.getElementById('task-form').reset();
        } else {
            alert('Please fill in all fields.');
        }
    };

    const checkAnswer = () => {
        const isCorrect = answer.trim() === 'x=1,-2.5';
        setFeedback(isCorrect ? 'Correct!' : 'Try again');
        if (isCorrect) {
            confetti({ particleCount: 100, spread: 70 });
            setXp(xp + 20);
            setQuizProgress(Math.min(100, quizProgress + 10));
            vibrate(200);
        }
    };

    return (
        <div className={`text-dark transition-colors duration-300 ${theme}`}>
            {/* AI Study Coach */}
            <div className="fixed bottom-4 left-4 z-50">
                <div className="bg-dark p-4 rounded-lg shadow-lg flex items-center space-x-2">
                    <ErrorBoundary>
                        <canvas ref={coachRef} className="h-12 w-12" aria-hidden="true" />
                    </ErrorBoundary>
                    <p className="text-sm text-dark">Try a 25-minute Pomodoro session!</p>
                    <button
                        onClick={() => speakTip('Try a 25-minute Pomodoro session!')}
                        className="text-primary hover:text-primary-dark focus-visible"
                        aria-label="Speak Tip"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    </button>
                </div>
                <p id="coachCaptions" className="text-sm text-dark mt-2"></p>
            </div>

            {/* Main Content */}
            <main className="transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4" role="tablist">
                            {['subjects', 'papers', 'tasks', 'planner', 'analytics'].map((tab) => (
                                <button
                                    key={tab}
                                    role="tab"
                                    aria-selected={activeTab === tab}
                                    className={`tab-link flex items-center py-2 px-3 text-sm font-medium text-dark ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    <svg className="h-4 w-4 mr-1 holographic" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={
                                                tab === 'subjects'
                                                    ? 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253'
                                                    : tab === 'papers'
                                                        ? 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                                        : tab === 'tasks'
                                                            ? 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01'
                                                            : tab === 'planner'
                                                                ? 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                                                : 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                            }
                                        />
                                    </svg>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={startVoice}
                                className={`p-2 bg-primary text-white rounded-md text-sm hover:bg-primary-dark focus-visible ${voiceActive ? 'bg-secondary' : ''}`}
                                aria-label={voiceActive ? 'Stop Voice Search' : 'Start Voice Search'}
                            >
                                <svg className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                <span>{voiceActive ? 'Listening...' : 'Voice Search'}</span>
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-2 text-dark hover:text-primary focus-visible"
                                    aria-expanded={dropdownOpen}
                                    aria-label="User Menu"
                                >
                                    <ErrorBoundary>
                                        <canvas ref={avatarRef} className="h-8 w-8 rounded-full" aria-hidden="true" />
                                    </ErrorBoundary>
                                    <span>User</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-dark shadow-lg rounded-md">
                                        <Link to="/profile" className="block px-4 py-2 text-dark hover:bg-neutral-base text-sm" onClick={() => setDropdownOpen(false)}>Profile</Link>
                                        <Link to="/settings" className="block px-4 py-2 text-dark hover:bg-neutral-base text-sm" onClick={() => setDropdownOpen(false)}>Settings</Link>
                                        <Link to="/logout" className="block px-4 py-2 text-dark hover:bg-neutral-base text-sm" onClick={() => setDropdownOpen(false)}>Logout</Link>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="text-dark hover:text-primary flex items-center text-sm focus-visible"
                                aria-label={`Switch to ${theme === 'dark' ? 'high-contrast' : 'dark'} theme`}
                            >
                                {theme === 'dark' ? (
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                                Toggle Theme
                            </button>
                        </div>
                    </div>
                    <div role="tabpanel">
                        {activeTab === 'subjects' && (
                            <div>
                                <h2 className="text-lg font-semibold text-dark mb-4 holographic">Subject Matrix</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        { name: 'Maths', progress: 90, aiPath: 'Focus on Calculus' },
                                        { name: 'Physics', progress: 75, aiPath: 'Review Mechanics' },
                                        { name: 'Chemistry', progress: 85, aiPath: 'Practice Bonding' },
                                    ].map((subject) => (
                                        <div key={subject.name} className="bg-dark p-4 rounded-lg border border-neutral-base animate-orb">
                                            <ErrorBoundary>
                                                <canvas id={`orb-${subject.name}`} className="w-24 h-24 mx-auto" aria-hidden="true" />
                                            </ErrorBoundary>
                                            <h3 className="text-md font-medium text-dark text-center mt-2">{subject.name}</h3>
                                            <div className="mt-2 text-center">
                                                <div className="relative w-16 h-16 mx-auto">
                                                    <svg className="w-full h-full" viewBox="0 0 36 36" aria-label={`Progress: ${subject.progress}%`}>
                                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--neutral-base)" strokeWidth="2.8" />
                                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--primary)" strokeWidth="2.8" strokeDasharray={`${subject.progress}, 100`} />
                                                        <text x="18" y="18" textAnchor="middle" dy=".3em" className="text-sm font-medium text-dark">{subject.progress}%</text>
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-dark mt-2">AI Path: {subject.aiPath}</p>
                                                <div className="mt-2 flex justify-center space-x-2">
                                                    <Link to={`/past-papers/${subject.name}`} className="text-primary hover:text-primary-dark text-sm">Papers</Link>
                                                    <Link to={`/digitized-papers/${subject.name}`} className="text-primary hover:text-primary-dark text-sm">AR Quiz</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeTab === 'papers' && (
                            <div>
                                <h2 className="text-lg font-semibold text-dark mb-4 holographic">Quantum Papers</h2>
                                <div className="flex space-x-2 mb-4">
                                    <select className="p-2 border rounded-md text-sm bg-dark text-dark focus-visible" aria-label="Filter by Subject">
                                        <option>All Subjects</option>
                                        <option>Maths</option>
                                        <option>Physics</option>
                                    </select>
                                    <select className="p-2 border rounded-md text-sm bg-dark text-dark focus-visible" aria-label="Filter by Year">
                                        <option>All Years</option>
                                        <option>2023</option>
                                        <option>2022</option>
                                    </select>
                                </div>
                                <div className="bg-dark p-4 rounded-lg shadow-sm">
                                    <table className="w-full text-sm text-dark">
                                        <thead>
                                        <tr className="border-b border-neutral-base">
                                            <th scope="col" className="py-2 text-left">Subject</th>
                                            <th scope="col" className="py-2 text-left">Title</th>
                                            <th scope="col" className="py-2 text-left">Year</th>
                                            <th scope="col" className="py-2 text-left">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {[
                                            { subject: 'Maths', year: 2023, title: 'Paper 1' },
                                            { subject: 'Physics', year: 2022, title: 'Paper 2' },
                                        ].map((paper) => (
                                            <tr key={paper.title} className="border-b border-neutral-base">
                                                <td className="py-2">{paper.subject}</td>
                                                <td className="py-2">{paper.title}</td>
                                                <td className="py-2">{paper.year}</td>
                                                <td className="py-2">
                                                    <a href={`/papers/${paper.subject}/${paper.year}/${paper.title}.pdf`} className="text-primary hover:text-primary-dark" download>PDF</a>
                                                    <button
                                                        onClick={() => { setArPaper(paper); setArModalOpen(true); }}
                                                        className="ml-2 text-primary hover:text-primary-dark focus-visible"
                                                        aria-label={`View ${paper.subject} ${paper.title} in AR`}
                                                    >
                                                        AR View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'tasks' && (
                            <div>
                                <h2 className="text-lg font-semibold text-dark mb-4 holographic">Task Nexus</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {['todo', 'inprogress', 'done'].map((status) => (
                                        <div
                                            key={status}
                                            className="bg-dark p-4 rounded-lg border border-neutral-base"
                                            onDrop={() => handleDrop(status)}
                                            onDragOver={(e) => e.preventDefault()}
                                            aria-label={`${status.charAt(0).toUpperCase() + status.slice(1)} Tasks`}
                                        >
                                            <h3 className="text-sm font-medium text-dark mb-2">{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
                                            {tasks.filter((t) => t.status === status).map((task) => (
                                                <div
                                                    key={task.id}
                                                    className="bg-neutral-base p-2 rounded-md mb-2 border border-neutral-base"
                                                    draggable
                                                    onDragStart={() => handleDragStart(task)}
                                                    role="listitem"
                                                >
                                                    <p className="text-sm text-dark">{task.title}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className={`text-xs px-2 py-1 rounded ${
                                                            task.priority === 'High' ? 'bg-primary text-white' :
                                                                task.priority === 'Medium' ? 'bg-secondary text-white' :
                                                                    'bg-neutral-base text-white'
                                                        }`}>
                                                            {task.priority}
                                                        </span>
                                                        <span className="text-xs text-dark">{task.dueDate}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setTaskModalOpen(true)}
                                    className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm w-full focus-visible"
                                    aria-label="Add New Task"
                                >
                                    Add Task
                                </button>
                            </div>
                        )}
                        {activeTab === 'planner' && (
                            <div>
                                <h2 className="text-lg font-semibold text-dark mb-4 holographic">TimeSpace Planner</h2>
                                <button
                                    onClick={() => setStudyRoom(!studyRoom)}
                                    className="mb-4 bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark text-sm focus-visible"
                                    aria-label={studyRoom ? 'Switch to Calendar View' : 'Switch to Virtual Study Room'}
                                >
                                    {studyRoom ? 'Calendar View' : 'Virtual Study Room'}
                                </button>
                                <div className={`${!studyRoom ? 'block' : 'hidden'} bg-dark p-4 rounded-lg shadow-sm`} id="calendar">
                                    <FullCalendar
                                        ref={calendarRef}
                                        plugins={[dayGridPlugin]}
                                        initialView="dayGridMonth"
                                        initialDate="2025-05-15"
                                        height="auto"
                                        editable={true}
                                        events={[
                                            { title: 'Maths Revision', start: '2025-05-15', backgroundColor: 'var(--primary)' },
                                            { title: 'Physics Exam', start: '2025-05-20', backgroundColor: 'var(--error)' },
                                            { title: 'Chemistry Quiz (AI)', start: '2025-05-22', backgroundColor: 'var(--secondary)' },
                                        ]}
                                        eventDrop={(info) => {
                                            alert(`Moved: ${info.event.title} to ${info.event.start.toLocaleDateString()}`);
                                            vibrate(100);
                                        }}
                                    />
                                </div>
                                <div className={studyRoom ? 'block study-room bg-dark p-4 rounded-lg shadow-sm h-96' : 'hidden'}>
                                    <div className="grid grid-cols-2 gap-4">
                                        {tasks.map((task) => (
                                            <div key={task.id} className="study-room-card bg-neutral-base p-4 rounded-lg border border-neutral-base">
                                                <p className="text-sm text-dark">{task.title}</p>
                                                <p className="text-xs text-dark">{task.dueDate}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={() => calendarRef.current?.getApi()?.today()}
                                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm focus-visible"
                                        aria-label="Go to Today"
                                    >
                                        Today
                                    </button>
                                    <button
                                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm focus-visible"
                                        aria-label="Generate AI Plan"
                                    >
                                        AI Plan
                                    </button>
                                </div>
                            </div>
                        )}
                        {activeTab === 'analytics' && (
                            <div>
                                <h2 className="text-lg font-semibold text-dark mb-4 holographic">Neural Analytics</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-dark mb-2">Study Focus</h3>
                                        <canvas ref={studyFocusChartRef} id="studyFocusChart" aria-label="Study Focus Chart" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-dark mb-2">Motivation Heatmap</h3>
                                        <canvas ref={motivationHeatmapRef} id="motivationHeatmap" aria-label="Motivation Heatmap" />
                                    </div>
                                </div>
                                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-dark mb-2">Quest Progress</h3>
                                        <div className="bg-dark p-4 rounded-lg shadow-sm">
                                            <p className="text-sm font-medium text-dark">Study Quest: 60% Complete</p>
                                            <div className="w-full bg-neutral-base rounded-full h-2.5 mt-2">
                                                <div className="bg-gradient h-2.5 rounded-full" style={{ width: '60%' }} aria-label="Study Quest Progress: 60%" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-dark mb-2">Leaderboard</h3>
                                        <div className="bg-dark p-4 rounded-lg shadow-sm">
                                            <ul className="space-y-2 text-sm text-dark">
                                                <li>1. Alex (1200 XP)</li>
                                                <li>2. Sam (1000 XP)</li>
                                                <li>3. You ({xp} XP)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Task Modal */}
            {taskModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-dark p-6 rounded-lg w-full max-w-md border border-neutral-base">
                        <h3 className="text-lg font-semibold text-dark mb-4 holographic">Add Neural Task</h3>
                        <form id="task-form" onSubmit={addTask}>
                            <div className="mb-4">
                                <label className="block text-sm text-dark" htmlFor="task-title">Task Title</label>
                                <input
                                    id="task-title"
                                    type="text"
                                    className="w-full p-2 border rounded-md bg-neutral-base text-dark focus-visible"
                                    placeholder="e.g., Solve Chapter 5"
                                    required
                                    aria-required="true"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-dark" htmlFor="task-subject">Subject</label>
                                <select
                                    id="task-subject"
                                    className="w-full p-2 border rounded-md bg-neutral-base text-dark focus-visible"
                                    required
                                    aria-required="true"
                                >
                                    <option value="Maths">Maths</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-dark" htmlFor="task-priority">Priority</label>
                                <select
                                    id="task-priority"
                                    className="w-full p-2 border rounded-md bg-neutral-base text-dark focus-visible"
                                    required
                                    aria-required="true"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-dark" htmlFor="task-due">Due Date</label>
                                <input
                                    id="task-due"
                                    type="date"
                                    className="w-full p-2 border rounded-md bg-neutral-base text-dark focus-visible"
                                    required
                                    aria-required="true"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setTaskModalOpen(false)}
                                    className="px-4 py-2 text-dark hover:bg-neutral-base rounded-md focus-visible"
                                    aria-label="Cancel Task Creation"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus-visible"
                                    aria-label="Add Task"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* AR Paper Modal */}
            {arModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-dark p-6 rounded-lg w-full max-w-lg border border-neutral-base">
                        <h3 className="text-lg font-semibold text-dark mb-4 holographic">
                            {arPaper ? `${arPaper.subject} - ${arPaper.title} (${arPaper.year})` : 'AR Paper'}
                        </h3>
                        <div className="mb-4">
                            <div className="w-full bg-neutral-base rounded-full h-2.5">
                                <div className="bg-gradient h-2.5 rounded-full" style={{ width: `${quizProgress}%` }} aria-label={`Quiz Progress: ${quizProgress}%`} />
                            </div>
                            <p className="text-xs text-dark mt-1">Quiz Progress: {quizProgress}%</p>
                        </div>
                        <div className="bg-neutral-base p-4 rounded-md">
                            <p className="text-sm font-medium text-dark">Question: Solve 2x² + 3x - 5 = 0</p>
                            <ErrorBoundary>
                                <canvas ref={arGraphRef} className="w-full h-48 mt-2" aria-hidden="true" />
                            </ErrorBoundary>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="mt-2 p-2 border rounded-md w-full bg-neutral-base text-dark focus-visible"
                                placeholder="Enter answer (e.g., x=1,-2.5)"
                                aria-label="Enter your answer"
                            />
                            <button
                                onClick={checkAnswer}
                                className="mt-2 bg-primary text-white px-4 py-2 rounded-md focus-visible"
                                aria-label="Check Answer"
                            >
                                Check
                            </button>
                            <p className={`mt-2 text-sm ${feedback === 'Correct!' ? 'text-secondary' : 'text-primary'}`} aria-live="polite">
                                {feedback}
                            </p>
                        </div>
                        <button
                            onClick={() => setArModalOpen(false)}
                            className="mt-4 text-dark hover:text-primary focus-visible"
                            aria-label="Close AR Modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Achievement Pop-up */}
            {achievementOpen && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="bg-dark text-dark p-4 rounded-lg shadow-lg border border-primary">
                        <p className="text-sm font-medium holographic">Holographic Badge Unlocked!</p>
                        <p className="text-xs">Task Completed (+10 XP)</p>
                        <p className="text-xs mt-1">Next Quest: Reach 600 XP</p>
                        <button
                            onClick={() => setAchievementOpen(false)}
                            className="mt-2 text-primary underline text-xs focus-visible"
                            aria-label="Close Achievement Pop-up"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-neutral-base mt-8 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm text-dark">© 2025 NexGenStudy. All rights reserved.</p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <Link to="#" className="text-dark hover:text-primary text-sm">Privacy</Link>
                        <Link to="#" className="text-dark hover:text-primary text-sm">Terms</Link>
                        <Link to="#" className="text-dark hover:text-primary text-sm">Support</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
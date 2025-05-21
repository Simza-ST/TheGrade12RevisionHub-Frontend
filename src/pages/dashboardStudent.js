import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StudentDashboard = () => {
    const [notes, setNotes] = useState(localStorage.getItem('revisionNotes') || '');
    const [quote, setQuote] = useState('');
    const [schedule, setSchedule] = useState([
        { id: 1, date: '2025-05-16', subject: 'Mathematics', task: 'Revise Algebra', time: '10:00 AM' },
        { id: 2, date: '2025-05-16', subject: 'Physics', task: 'Practice Mechanics', time: '2:00 PM' },
    ]);
    const [newTask, setNewTask] = useState({ date: '', subject: '', task: '', time: '' });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const chartRef = useRef(null);

    const progressData = {
        labels: ['Mathematics', 'Physics', 'English', 'Chemistry','Mathematics', 'simza', 'SiSt', 'XSyge'],
        datasets: [{
            label: 'Revision Progress (%)',
            data: [75, 60, 90, 45],
            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444','#10B981', '#3B82F6', '#F59E0B'],
            borderColor: '#fff',
            borderWidth: 2,
        }],
    };

    // Initialize Chart.js
    useEffect(() => {
        let chartInstance = null;

        if (chartRef.current) {
            // Destroy existing chart instance if it exists
            if (Chart.getChart(chartRef.current)) {
                Chart.getChart(chartRef.current).destroy();
            }

            chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: progressData,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: { display: true, text: 'Progress (%)' },
                        },
                    },
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Subject Revision Progress' },
                    },
                },
            });
        }

        // Cleanup on unmount
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);


    // Fetch motivational quote
    useEffect(() => {
        const quotes = [
            "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "You don’t have to be great to start, but you have to start to be great. - Zig Ziglar",
            "Hard work beats talent when talent doesn’t work hard. - Tim Notke",
        ];
        const today = new Date().toDateString();
        const storedQuote = localStorage.getItem('dailyQuote');
        const storedDate = localStorage.getItem('quoteDate');
        if (storedDate !== today || !storedQuote) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(randomQuote);
            localStorage.setItem('dailyQuote', randomQuote);
            localStorage.setItem('quoteDate', today);
        } else {
            setQuote(storedQuote);
        }
    }, []);

    // Save notes to localStorage
    useEffect(() => {
        localStorage.setItem('revisionNotes', notes);
    }, [notes]);

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.date && newTask.subject && newTask.task && newTask.time) {
            setSchedule([...schedule, { id: Date.now(), ...newTask }]);
            setNewTask({ date: '', subject: '', task: '', time: '' });
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (chatInput.trim() !== '') {
            setChatMessages([...chatMessages, { text: chatInput, sender: 'student' }]);
            setChatInput('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-['Inter',sans-serif]">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-indigo-800 text-white transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-50`}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Revision Hub</h1>
                    <p className="text-sm opacity-75">Grade 12 Dashboard</p>
                </div>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        {['Dashboard', 'Quizzes', 'Schedule', 'Notes', 'Chat'].map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="block px-6 py-2 hover:bg-indigo-700 transition-colors"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden fixed top-4 left-4 z-50 text-indigo-800 text-2xl" onClick={toggleSidebar}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className="md:ml-64 p-6">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-900">Welcome, Student!</h1>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">{new Date().toDateString()}</p>
                        <p className="text-indigo-700 font-medium">{quote}</p>
                    </div>
                </header>

                {/* Chart Section */}
                <section id="dashboard" className="mb-12">
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Revision Progress</h2>
                    <div className="bg-white max-h-80">
                        <canvas id="progressChart" ref={chartRef}></canvas>
                        {/* Quote */}
                        <div className="w-80 lg:w-1/3 bg-indigo-50 p-4 rounded-lg">
                            <h3 className="text-indigo-700 font-semibold mb-2">Daily Motivation</h3>
                            <p className="text-gray-700 italic">"{quote}"</p>
                        </div>
                    </div>

                </section>

                {/* Quizzes Section */}
                <section id="quizzes" className="mb-12">
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Practice Quizzes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { subject: 'Mathematics', paper: 'Nov 2022 P1', link: '#' },
                            { subject: 'Physics', paper: 'Nov 2022 P1', link: '#' },
                            { subject: 'English', paper: 'Nov 2022 P2', link: '#' },
                        ].map((quiz, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="text-lg font-medium text-indigo-800">{quiz.subject}</h3>
                                <p className="text-gray-600">{quiz.paper}</p>
                                <a href={quiz.link} className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Start Quiz</a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Schedule Section */}
                <section id="schedule" className="mb-12">
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Study Schedule</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <form onSubmit={addTask} className="mb-6 flex flex-col sm:flex-row gap-4">
                            <input type="date" value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} className="p-2 border rounded-md" required />
                            <input type="text" placeholder="Subject" value={newTask.subject} onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })} className="p-2 border rounded-md" required />
                            <input type="text" placeholder="Task" value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} className="p-2 border rounded-md" required />
                            <input type="time" value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })} className="p-2 border rounded-md" required />
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add</button>
                        </form>
                        <div className="space-y-4">
                            {schedule.map(task => (
                                <div key={task.id} className="p-4 bg-indigo-50 rounded-md flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-indigo-800">{task.subject}: {task.task}</p>
                                        <p className="text-sm text-gray-600">{task.date} at {task.time}</p>
                                    </div>
                                    <button onClick={() => setSchedule(schedule.filter(t => t.id !== task.id))} className="text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Notes Section */}
                <section id="notes" className="mb-12">
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Revision Notes</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full h-48 p-4 border rounded-md resize-none focus:border-indigo-500" placeholder="Write your revision notes here..."></textarea>
                    </div>
                </section>


            </div>

            <footer className="bg-indigo-800 text-white py-4 text-center">
                <p>Grade 12 Revision Hub | © 2025 All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default StudentDashboard;

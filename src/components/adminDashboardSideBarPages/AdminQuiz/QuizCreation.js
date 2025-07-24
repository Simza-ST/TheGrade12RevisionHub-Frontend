import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from '../../common/AdminSidebar';
import AdminHeader from '../../common/AdminHeader';

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/admin';

const CreateQuiz = ({ user, notifications, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(sessionStorage.getItem('theme') === 'dark');
    const [quiz, setQuiz] = useState({
        title: '',
        subject: '',
        description: '',
        questions: [{ questionText: '', options: [''], correctAnswer: '' }],
    });
    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No authentication token found. Please log in.');
                }
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                console.log('Fetching subjects from:', `${API_BASE_URL}/user/subjects`);
                const response = await fetch("http://localhost:6262/api/user/subjects", { headers });
                const data = await response.json();
                if (response.ok && data.success) {
                    const subjectList = (data.data || []).map(s => s.subjectName || s.name || s).sort();
                    console.log('Subjects fetched:', subjectList);
                    setSubjects(subjectList);
                } else {
                    throw new Error(data.message || 'Failed to fetch subjects');
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setResponseMessage(`Error fetching subjects: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []); // Empty dependency array to run once on mount

    const validateForm = () => {
        const newErrors = {};
        if (!quiz.title.trim()) newErrors.title = 'Title is required';
        if (!quiz.subject.trim()) newErrors.subject = 'Subject is required';
        if (!quiz.description.trim()) newErrors.description = 'Description is required';
        quiz.questions.forEach((q, index) => {
            if (!q.questionText.trim()) newErrors[`questionText${index}`] = `Question ${index + 1} text is required`;
            if (q.options.length === 0 || q.options.some((opt) => !opt.trim())) {
                newErrors[`options${index}`] = `Question ${index + 1} must have at least one non-empty option`;
            }
            if (!q.correctAnswer.trim()) newErrors[`correctAnswer${index}`] = `Question ${index + 1} correct answer is required`;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch(`${API_BASE_URL}/quizzes`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quiz),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to create quiz');
            }

            const data = await response.text();
            setResponseMessage(data);
            setQuiz({ title: '', subject: '', description: '', questions: [{ questionText: '', options: [''], correctAnswer: '' }] });
            setErrors({});
        } catch (error) {
            console.error('Error creating quiz:', error);
            setResponseMessage(error.message || 'Failed to create quiz');
        }
    };

    const updateQuizField = (field, value) => {
        setQuiz({ ...quiz, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const updateQuestionField = (index, field, value) => {
        const newQuestions = [...quiz.questions];
        newQuestions[index][field] = value;
        setQuiz({ ...quiz, questions: newQuestions });
        setErrors({ ...errors, [`${field}${index}`]: '' });
    };

    const updateOption = (questionIndex, optionIndex, value) => {
        const newQuestions = [...quiz.questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuiz({ ...quiz, questions: newQuestions });
        setErrors({ ...errors, [`options${questionIndex}`]: '' });
    };

    const addQuestion = () => {
        setQuiz({
            ...quiz,
            questions: [...quiz.questions, { questionText: '', options: [''], correctAnswer: '' }],
        });
    };

    const removeQuestion = (index) => {
        if (quiz.questions.length > 1) {
            setQuiz({
                ...quiz,
                questions: quiz.questions.filter((_, i) => i !== index),
            });
            const newErrors = { ...errors };
            delete newErrors[`questionText${index}`];
            delete newErrors[`options${index}`];
            delete newErrors[`correctAnswer${index}`];
            setErrors(newErrors);
        }
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...quiz.questions];
        newQuestions[questionIndex].options.push('');
        setQuiz({ ...quiz, questions: newQuestions });
    };

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...quiz.questions];
        if (newQuestions[questionIndex].options.length > 1) {
            newQuestions[questionIndex].options.splice(optionIndex, 1);
            setQuiz({ ...quiz, questions: newQuestions });
        }
    };

    return (
        <div className="flex min-h-screen">
            <style>
                {`
                    .form-input {
                        margin-top: 4px;
                        display: block;
                        width: 100%;
                        padding: 8px;
                        border: 1px solid var(--border, ${isDarkMode ? '#475569' : '#e5e7eb'});
                        border-radius: 6px;
                        background-color: var(--bg-primary, ${isDarkMode ? '#1e293b' : '#ffffff'});
                        color: var(--text-normal, ${isDarkMode ? '#e2e8f0' : '#1f2937'});
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                    }
                    .form-input:focus {
                        border-color: var(--accent-primary, #007bff);
                        outline: none;
                        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
                    }
                    .form-input:disabled {
                        background-color: var(--bg-disabled, ${isDarkMode ? '#2d3748' : '#f1f5f9'});
                        cursor: not-allowed;
                    }
                    .form-input-select {
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
                        background-repeat: no-repeat;
                        background-position: right 0.5rem center;
                        background-size: 1.5em;
                        padding-right: 2rem;
                    }
                    .animate-spin {
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <AdminSidebar
                user={user}
                onLogout={onLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={isDarkMode}
            />
            <div className="flex-1">
                <AdminHeader
                    user={user}
                    notifications={notifications}
                    isCollapsed={isCollapsed}
                    darkMode={isDarkMode}
                    setDarkMode={setIsDarkMode}
                    tabDescription="Create Quiz"
                    userMessage="Create quizzes for students to practice"
                />
                <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <div className="max-w-2xl mx-auto bg-[var(--bg-primary)] p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Create a New Quiz</h1>
                        {responseMessage && (
                            <div
                                className={`p-4 mb-4 rounded ${
                                    responseMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {responseMessage}
                            </div>
                        )}
                        {loading && (
                            <div className="flex justify-center items-center mb-4">
                                <div
                                    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--accent-primary)]"
                                    role="status"
                                    aria-label="Loading subjects..."
                                ></div>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="subject-select" className="block text-sm font-medium text-[var(--text-normal)]">
                                    Select a Subject
                                </label>
                                <select
                                    id="subject-select"
                                    value={quiz.subject}
                                    onChange={(e) => updateQuizField('subject', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-[var(--border)] rounded-md bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg form-input-select"
                                    aria-label="Select a subject"
                                    disabled={loading || subjects.length === 0}
                                >
                                    <option value="" disabled>
                                        Choose a subject
                                    </option>
                                    {subjects.length > 0 ? (
                                        subjects.map((subject, index) => (
                                            <option key={`${subject}-${index}`} value={subject}>
                                                {subject}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No subjects available
                                        </option>
                                    )}
                                </select>
                                {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-normal)]">Quiz Title</label>
                                <input
                                    type="text"
                                    value={quiz.title}
                                    onChange={(e) => updateQuizField('title', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-[var(--border)] rounded-md bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg"
                                    placeholder="Enter quiz title"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-normal)]">Description</label>
                                <input
                                    type="text"
                                    value={quiz.description}
                                    onChange={(e) => updateQuizField('description', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-[var(--border)] rounded-md bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg"
                                    placeholder="Enter quiz description"
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>
                            {quiz.questions.map((question, qIndex) => (
                                <div key={qIndex} className="border border-[var(--border)] p-4 rounded-md">
                                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Question {qIndex + 1}</h2>
                                    <div className="space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-normal)]">Question Text</label>
                                            <input
                                                type="text"
                                                value={question.questionText}
                                                onChange={(e) => updateQuestionField(qIndex, 'questionText', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-[var(--border)] rounded-md bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg"
                                                placeholder="Enter question text"
                                            />
                                            {errors[`questionText${qIndex}`] && (
                                                <p className="text-red-500 text-sm">{errors[`questionText${qIndex}`]}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-normal)]">Options</label>
                                            {question.options.map((option, oIndex) => (
                                                <div key={oIndex} className="flex items-center space-x-2 mt-1">
                                                    <input
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                        className="block w-full p-2 border border-[var(--border)] rounded-md bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg"
                                                        placeholder={`Option ${oIndex + 1}`}
                                                    />
                                                    {question.options.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeOption(qIndex, oIndex)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            {errors[`options${qIndex}`] && <p className="text-red-500 text-sm">{errors[`options${qIndex}`]}</p>}
                                            <button
                                                type="button"
                                                onClick={() => addOption(qIndex)}
                                                className="mt-2 text-blue-500 hover:text-blue-700"
                                            >
                                                Add Option
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-normal)]">Correct Answer</label>
                                            <input
                                                type="text"
                                                value={question.correctAnswer}
                                                onChange={(e) => updateQuestionField(qIndex, 'correctAnswer', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-[var(--border)] rounded-md bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg"
                                                placeholder="Enter correct answer"
                                            />
                                            {errors[`correctAnswer${qIndex}`] && (
                                                <p className="text-red-500 text-sm">{errors[`correctAnswer${qIndex}`]}</p>
                                            )}
                                        </div>
                                        {quiz.questions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeQuestion(qIndex)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove Question
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Question
                            </button>
                            <button
                                type="submit"
                                className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Create Quiz
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

CreateQuiz.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default CreateQuiz;
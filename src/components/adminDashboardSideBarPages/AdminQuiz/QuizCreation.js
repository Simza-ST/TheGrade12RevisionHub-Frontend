import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from "../../common/AdminSidebar";
import AdminHeader from "../../common/AdminHeader";

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

const CreateQuiz = ({ user, notifications, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [quiz, setQuiz] = useState({
        title: '',
        subjectId: '',
        questions: [{ questionText: '', options: [''], correctAnswer: '' }],
    });
    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const validateForm = () => {
        const newErrors = {};
        if (!quiz.title.trim()) newErrors.title = 'Title is required';
        if (!quiz.subjectId.trim()) newErrors.subjectId = 'Subject ID is required';
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
            const response = await fetch(`${API_BASE_URL}/api/quizzes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quiz),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to create quiz');
            }

            const data = await response.text();
            setResponseMessage(data);
            setQuiz({ title: '', subjectId: '', questions: [{ questionText: '', options: [''], correctAnswer: '' }] });
            setErrors({});
        } catch (error) {
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
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                <label className="block text-sm font-medium text-[var(--text-normal)]">Subject ID</label>
                                <input
                                    type="text"
                                    value={quiz.subjectId}
                                    onChange={(e) => updateQuizField('subjectId', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-[var(--border)] rounded-md bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg"
                                    placeholder="Enter subject ID"
                                />
                                {errors.subjectId && <p className="text-red-500 text-sm">{errors.subjectId}</p>}
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
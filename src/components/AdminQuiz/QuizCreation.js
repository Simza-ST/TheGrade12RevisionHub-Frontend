import React, { useState } from 'react';

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/admin';

const Topbar = () => {
    const menuItems = [
        { text: 'Home🏡', href: '/admin-Dashboard' },
        { text: 'List Of Students👨‍🎓', href: '/Students' },
        { icon: 'bx-file', text: 'Upload Documents📚', href: '/upload-documents' },
        { icon: 'bx-plus', text: 'Create Certificate📜', href: '/cert-creation' },
        { icon: 'bx-mail-send', text: 'Send Email📩', href: '/chat' },
        {text: 'View Quizzes📓', href: '/quiz-viewer'},
        { text: 'Logout', href: '/login' },
    ];

    return (
        <header className="topbar fixed top-0 left-0 w-full h-16 bg-gray-900 flex items-center justify-between px-5 text-white text-2xl font-semibold shadow-md z-50">
            <div className="dashboard-title">Create Quiz</div>
            <div className="media-icons">
                <ul className="menu flex gap-5 list-none p-0">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                className="text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

const CreateQuiz = () => {
    const [quiz, setQuiz] = useState({
        title: '',
        subjectId: '',
        questions: [{ questionText: '', options: [''], correctAnswer: '' }],
    });
    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState('');

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
            const response = await fetch(`${API_BASE_URL}/quizzes`, {
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
        <>
            <Topbar />
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
                <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>
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
                        <label className="block text-sm font-medium text-gray-700">Quiz Title</label>
                        <input
                            type="text"
                            value={quiz.title}
                            onChange={(e) => updateQuizField('title', e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Enter quiz title"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject ID</label>
                        <input
                            type="text"
                            value={quiz.subjectId}
                            onChange={(e) => updateQuizField('subjectId', e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Enter subject ID"
                        />
                        {errors.subjectId && <p className="text-red-500 text-sm">{errors.subjectId}</p>}
                    </div>
                    {quiz.questions.map((question, qIndex) => (
                        <div key={qIndex} className="border p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Question {qIndex + 1}</h2>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Question Text</label>
                                    <input
                                        type="text"
                                        value={question.questionText}
                                        onChange={(e) => updateQuestionField(qIndex, 'questionText', e.target.value)}
                                        className="mt-1 block w-full p-2 border rounded-md"
                                        placeholder="Enter question text"
                                    />
                                    {errors[`questionText${qIndex}`] && (
                                        <p className="text-red-500 text-sm">{errors[`questionText${qIndex}`]}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Options</label>
                                    {question.options.map((option, oIndex) => (
                                        <div key={oIndex} className="flex items-center space-x-2 mt-1">
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                className="block w-full p-2 border rounded-md"
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
                                    <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                                    <input
                                        type="text"
                                        value={question.correctAnswer}
                                        onChange={(e) => updateQuestionField(qIndex, 'correctAnswer', e.target.value)}
                                        className="mt-1 block w-full p-2 border rounded-md"
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
        </>
    );
};

export default CreateQuiz;
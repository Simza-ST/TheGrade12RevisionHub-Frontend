import React, { useState, useEffect } from 'react';

const MotivationalQuote = () => {
    const quotes = [
        { text: 'Education is the most powerful weapon you can use to change the world.', author: 'Nelson Mandela' },
        { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
        { text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill' },
        { text: 'You are never too old to set another goal or to dream a new dream.', author: 'C.S. Lewis' },
        { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
        { text: 'It always seems impossible until it’s done.', author: 'Nelson Mandela' },
        { text: 'The only limit to our realization of tomorrow will be our doubts of today.', author: 'Franklin D. Roosevelt' },
        { text: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' },
        { text: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' },
        { text: 'Your time is limited, don’t waste it living someone else’s life.', author: 'Steve Jobs' },
        { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
        { text: 'What you do today can improve all your tomorrows.', author: 'Ralph Marston' },
    ];

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 10000); // Change every 10 seconds
        return () => clearInterval(interval);
    }, [quotes.length]);

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <p className="text-lg font-semibold text-[var(--text-normal)]">"{quotes[currentQuoteIndex].text}"</p>
            <p className="text-sm mt-2 text-[var(--text-normal)]">— {quotes[currentQuoteIndex].author}</p>
        </div>
    );
};

export default MotivationalQuote;
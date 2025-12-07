import React, { createContext, useContext, useState, useEffect } from 'react'

const TimerContext = createContext()

export const useTimer = () => {
    const context = useContext(TimerContext)
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider')
    }
    return context
}

export const TimerProvider = ({ children }) => {
    const [timeLeft, setTimeLeft] = useState(2 * 60 * 60) // 2 hours in seconds
    const [isRunning, setIsRunning] = useState(false)
    const [isTimeUp, setIsTimeUp] = useState(false)

    useEffect(() => {
        let interval = null

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => {
                    if (time <= 1) {
                        setIsTimeUp(true)
                        setIsRunning(false)
                        return 0
                    }
                    return time - 1
                })
            }, 1000)
        } else if (timeLeft === 0) {
            setIsTimeUp(true)
            setIsRunning(false)
        }

        return () => clearInterval(interval)
    }, [isRunning, timeLeft])

    const startTimer = () => {
        setIsRunning(true)
        setIsTimeUp(false)
    }

    const pauseTimer = () => {
        setIsRunning(false)
    }

    const resetTimer = () => {
        setTimeLeft(2 * 60 * 60)
        setIsRunning(false)
        setIsTimeUp(false)
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const value = {
        timeLeft,
        isRunning,
        isTimeUp,
        startTimer,
        pauseTimer,
        resetTimer,
        formatTime
    }

    return (
        <TimerContext.Provider value={value}>
            {children}
        </TimerContext.Provider>
    )
}
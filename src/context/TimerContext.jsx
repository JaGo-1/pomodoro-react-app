import { createContext, useState} from 'react'

export const TimerContext = createContext()

export const TimerContextProvider = ({ children }) => {
    const [work, setWork] = useState(1500)
    const [breakTime, setBreakTime] = useState(300)
    const [longBreak, setLongBreak] = useState(900)
    const [time, setTime] = useState(1500)

    const value = {
        work,
        setWork,
        breakTime,
        setBreakTime,
        longBreak,
        setLongBreak,
        time,
        setTime
    }

    return (
        <TimerContext.Provider value={value}>
            {children}
        </TimerContext.Provider>
    )
}


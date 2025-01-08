import {useEffect, useState} from 'react'
import '../styles/styles.css'
import Button from './Button'
import { IoPlay, IoPauseSharp, IoReload  } from "react-icons/io5";


function Home() { 
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(1500) 
    const [phase, setPhase] = useState('work') 

    useEffect(() => { 
        if (isRunning) { 
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1) 
        }, 1000)
        return () => clearInterval(timer) 
        }
    } , [isRunning]) 

    useEffect(() => {
        if (time === 0) {
        if (phase === 'work') {
            setTime(300)
            setPhase('break')
            setIsRunning(false)
        } else {
            setTime(1500) 
            setPhase('work') 
            setIsRunning(false)
        }
        }
    })

    useEffect(() => {
        if (isRunning) {
        document.title = `${formatTime(time)} - Pomodoro Timer`
        } else {
        if (phase === 'break') {
            document.title = 'Time to take a break!'
        }
        else if (phase === 'work') {
            document.title = 'Pomodoro Timer - Time to Get Focus!'
        } else {
            document.title = 'Pomodoro Timer - Get Focused!'
        } 
    }
        return () => document.title = 'Pomodoro Timer - Get Focused!'
    }, [time, isRunning])

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60) 
        const seconds = time % 60 
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}` 
    }

    const resetTimer = () => {
        setTime(1500) 
        setIsRunning(false)
    }

    return (
   
        <div className='home__container'>

    
            <div className='timer'>
                <h3 className='outfit-light'>{phase === 'work' ? "Time to work!" : "Let's take a break!"}</h3>
                <div className='timer__btn-controllers'>
                    <Button text="Work" className="btn btn-controllers"/>
                    <Button text="Break" className="btn btn-controllers"/>
                    <Button text="Long Break" className="btn btn-controllers"/>
                </div>
                <h2 className='outfit-regular'>{formatTime(time)}</h2>
            </div>

            <div className='buttons'>
            <Button onClick={toggleTimer} className="btn btn-controllers" text="START" icon={ !isRunning ?  IoPlay : IoPauseSharp}/>
            <Button onClick={resetTimer} className="btn btn-controllers" text={"RESET"} icon={IoReload}/>
            </div>
        </div>
       

    )
}

export default Home

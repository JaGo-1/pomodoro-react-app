import {useEffect, useState, useContext, useMemo} from 'react'
import '../styles/styles.css'
import Button from './Button'
import { IoPlay, IoPauseSharp, IoReload  } from "react-icons/io5";
import alarmSound from '../assets/alarm3s.mp3'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { TimerContext } from '../context/TimerContext'

function Home() {
    const { work, breakTime, longBreak, time, setTime, phase, setPhase } = useContext(TimerContext)
    const [isRunning, setIsRunning] = useState(false)
    // const [phase, setPhase] = useState('work')

    const alarm = new Audio(alarmSound)

    const phaseDuration = phase === 'work' ? work : phase === 'break' ? breakTime : longBreak;
    const percentage = ((phaseDuration - time) / phaseDuration) * 100;


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    useEffect(() => {
        if (isRunning) {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1)
        }, 1000)
        return () => clearInterval(timer)
        }
    } , [isRunning])

    const handleTimeEnd = () => {
        alarm.play().catch((err) => console.log("Error playing audio:", err));

        if (phase === 'work') {
            setTime(breakTime);
            setPhase('break');
        } else {
            setTime(work);
            setPhase('work');
        }

        setIsRunning(false);
    };

    useEffect(() => {
        if (time === 0) {
            handleTimeEnd();
        }
    }, [time]);


    useEffect(() => {
        if (isRunning) {
            document.title = `${formatTime(time)} - Pomodoro Timer`
        } else {
            document.title = phase === 'work'
                    ? 'Time to Get Focus! - Pomodoro Timer'
                    : 'Time to take a break! - Pomodoro Timer';
        }
        return () => document.title = 'Pomodoro Timer - Get Focused!'
    }, [time, isRunning])


    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }


    const resetTimer = () => {
        switch (phase) {
            case 'work':
                setTime(work)
                break;
            case 'break':
                setTime(breakTime)
                break;
            case 'longBreak':
                setTime(longBreak)
                break;
            default:
                break;
        }
        setIsRunning(false)
    }

    const handleWork = (pomodoroPhase) => {
        switch (pomodoroPhase) {
            case 'work':
                setTime(work)
                setPhase('work')
                break;
            case 'breakTime':
                setTime(breakTime)
                setPhase('break')
                break;
            case 'longBreak':
                setTime(longBreak)
                setPhase('longBreak')
                break;
            default:
                break;
        }
        setIsRunning(false)
    }

    return (
        <div className='home__container'>

            <div className='timer'>
                <h3 className='outfit-light'>{phase === 'work' ? "Time to work!" : "Let's take a break!"}</h3>
                <div className='timer__btn-controllers'>
                    <Button text="Work" className="btn btn-controllers" onClick={()=>{handleWork('work')}}/>
                    <Button text="Break" className="btn btn-controllers" onClick={()=>{handleWork('breakTime')}}/>
                    <Button text="Long Break" className="btn btn-controllers" onClick={()=>{handleWork('longBreak')}}/>
                </div>
                <CircularProgressbar value={percentage} text={formatTime(time)} strokeWidth="1" styles={{
                    text: {
                        fontFamily: 'Outfit',
                        fontSize: '1.5rem',
                        fill: '#fff'
                    }
                }}/>
            </div>

            <div className='buttons'>
            <Button onClick={toggleTimer} className="btn btn-controllers" text="START" icon={ !isRunning ?  IoPlay : IoPauseSharp}/>
            <Button onClick={resetTimer} className="btn btn-controllers" text={"RESET"} icon={IoReload}/>
            </div>
        </div>

    )
}

export default Home

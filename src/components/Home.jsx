import {useEffect, useState} from 'react'
import '../styles/styles.css'
import Button from './Button'
import { IoPlay, IoPauseSharp, IoReload  } from "react-icons/io5";
import alarmSound from '../assets/alarm3s.mp3'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Home() {
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(1500)
    const [phase, setPhase] = useState('work')
    const alarm = new Audio(alarmSound)
    const percentage = ((phase === 'work' ? 1500 : 300) - time) / (phase === 'work' ? 1500 : 300) * 100;

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
            setTime(300);
            setPhase('break');
        } else {
            setTime(1500);
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
            document.title = phase === 'break'
                    ? 'Time to take a break! - Pomodoro Timer'
                    : 'Time to Get Focus! - Pomodoro Timer';
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

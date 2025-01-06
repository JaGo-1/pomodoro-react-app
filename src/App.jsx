import {useEffect, useState} from 'react'
import './styles/styles.css'
import Button from './components/Button'
import {play, pause, settings, reset, GitHub_Logo} from './assets/images'

function App() {
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
    <div className='container'>
      <div className='content'>

        <div className='settings'>
          <Button size="small" img={settings}/>
        </div>
 
        <div className='timer'>
          <h1 className='gaegu-bold'>Pomodoro Timer</h1>
          <h2 className='gaegu-regular'>{formatTime(time)}</h2>
        </div>

        <div className='buttons'>
          <Button onClick={toggleTimer} img={isRunning ? pause : play}/>
          <Button onClick={resetTimer} img={reset}/>
        </div>
      </div>
    </div>

  )
}

export default App

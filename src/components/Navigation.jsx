import {useContext, useState} from 'react'
import Button from './Button'
import { IoSettingsOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { RiResetLeftLine } from "react-icons/ri";
import { FiMinus,FiPlus  } from "react-icons/fi";

import {TimerContext} from '../context/TimerContext'
import '../styles/dropDown.css'



function Navigation() {
  const { work, breakTime, longBreak, setWork, setBreakTime, setLongBreak, setTime, phase } = useContext(TimerContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [localWork, setLocalWork] = useState(work)
  const [localBreakTime, setLocalBreakTime] = useState(breakTime)
  const [localLongBreak, setLocalLongBreak] = useState(longBreak)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const saveSettings = () => {
    setWork(localWork)
    setBreakTime(localBreakTime)
    setLongBreak(localLongBreak)
    
    switch (phase) {
      case 'work':
        setTime(localWork)
        break
      case 'break':
        setTime(localBreakTime)
        break
      case 'longBreak':
        setTime(localLongBreak)
    }

    setIsMenuOpen(false)
  }
  

  const resetSettings = () => {
    setLocalWork(1500)
    setLocalBreakTime(300)
    setLocalLongBreak(900)
    switch (phase) {
      case 'work':
        setTime(1500)
        break
      case 'break':
        setTime(300)
        break
      case 'longBreak':
        setTime(900)
    }
    
  }

  const decreaseInput = (input, phase) => {
    const inputElement = document.getElementById(input)
    if (inputElement.value > 1) {
      inputElement.value = parseInt(inputElement.value) - 1
    }
    switch (phase) {
      case 'work':
        setLocalWork(inputElement.value * 60)
        break
      case 'break':
        setLocalBreakTime(inputElement.value * 60)
        break
      case 'longBreak':
        setLocalLongBreak(inputElement.value * 60)
    }
  }

  const increaseInput = (input, phase) => {
    const inputElement = document.getElementById(input)
    if (inputElement.value < 60) {
      inputElement.value = parseInt(inputElement.value) + 1
    }

    switch (phase) {
      case 'work':
        setLocalWork(inputElement.value * 60)
        break
      case 'break':
        setLocalBreakTime(inputElement.value * 60)
        break
      case 'longBreak':
        setLocalLongBreak(inputElement.value * 60)
    }
  }

  return (
    <div className='nav__container '>
        <h3 className='outfit-light'>Pomodoro Timer</h3>
        
        <div className='settings'>
            <Button size="small" className="btn settings-btn" iconStyle="btn-icon" icon={IoSettingsOutline} onClick={()=>{toggleMenu()}}/>
            {
                isMenuOpen && 
                <div className='settings__menu'>
                    <h4 className='settings__title outfit-regular'>Pomodoro Settings</h4>

                    <div className='settings__menu-option'>
                      <label className='outfit-light'>Work Time:</label>
                      <div className='custom-input'>
                        <div className='icon-container icon-container--minus' onClick={()=>{decreaseInput('work-input', 'work')}}>
                          <FiMinus />
                        </div>
                        <input id='work-input' type="number" value={localWork/60} min='1' max="60" onChange={(e)=> setLocalWork(e.target.value*60)}/>
                        <div className='icon-container icon-container--plus' onClick={()=>{increaseInput('work-input', 'work')}}>
                          <FiPlus />
                        </div>
                      </div>
                    </div>

                    <div className='settings__menu-option'>
                      <label className='outfit-light'>Short Break:</label>
                      <div className='custom-input'>
                        <div className='icon-container icon-container--minus' onClick={()=>{decreaseInput('break-input', 'break')}}>
                          <FiMinus />
                        </div>
                        <input id='break-input' type="number" value={localBreakTime/60} min='1' max="60" onChange={(e)=> setBreakTime(e.target.value*60)}/>
                        <div className='icon-container icon-container--plus' onClick={()=>{increaseInput('break-input', 'break')}}>
                          <FiPlus />
                        </div>
                      </div>
                    </div>

                    <div className='settings__menu-option'>
                      <label className='outfit-light'>Long Break:</label>
                      <div className='custom-input'>
                        <div className='icon-container icon-container--minus' onClick={()=>{decreaseInput('longBreak-input', 'longBreak')}}>
                          <FiMinus />
                        </div>
                        <input id='longBreak-input' type="number" value={localLongBreak/60} min='1' max="60" onChange={(e)=> setLongBreak(e.target.value*60)}/>
                        <div className='icon-container icon-container--plus' onClick={()=>{increaseInput('longBreak-input', 'longBreak')}}>
                          <FiPlus />
                        </div>
                      </div>
                    </div>

                    <div className='settings__menu-btns'>
                      <Button className="btn settings__menu-btn settings-save-btn" onClick={()=>{saveSettings()}} icon={IoCheckmarkCircleOutline} text="Save"/>
                      <Button className="btn settings__menu-btn settings-reset-btn" onClick={()=>{resetSettings()}} icon={RiResetLeftLine} text="Reset"/>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Navigation
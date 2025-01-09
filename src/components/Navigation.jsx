import {useContext, useState} from 'react'
import Button from './Button'
import { IoSettingsOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { RiResetLeftLine } from "react-icons/ri";
import { FiMinus,FiPlus  } from "react-icons/fi";

import {TimerContext} from '../context/TimerContext'
import '../styles/dropDown.css'



function Navigation() {
  const { work, breakTime, longBreak, setWork, setBreakTime, setLongBreak, setTime } = useContext(TimerContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const saveSettings = () => {
    setIsMenuOpen(false)
    setTime(work)
  }

  const resetSettings = () => {
    setWork(1500)
    setBreakTime(300)
    setLongBreak(900)
    
  }

  const decreaseInput = (input) => {
    const inputElement = document.getElementById(input)
    if (inputElement.value > 1) {
      inputElement.value = parseInt(inputElement.value) - 1
    }
  }

  const increaseInput = (input) => {
    const inputElement = document.getElementById(input)
    if (inputElement.value < 60) {
      inputElement.value = parseInt(inputElement.value) + 1
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
                        <div className='icon-container icon-container--minus' onClick={()=>{decreaseInput('work-input')}}>
                          <FiMinus />
                        </div>
                        <input id='work-input' type="number" value={work/60} min='1' max="60" onChange={(e)=> setWork(e.target.value*60)}/>
                        <div className='icon-container icon-container--plus' onClick={()=>{increaseInput('work-input')}}>
                          <FiPlus />
                        </div>
                      </div>
                    </div>

                    <div className='settings__menu-option'>
                      <label className='outfit-light'>Short Break:</label>
                      <div className='custom-input'>
                        <div className='icon-container icon-container--minus' >
                          <FiMinus />
                        </div>
                        <input id='break-input' type="number" value={breakTime/60} min='1' max="60" onChange={(e)=> setBreakTime(e.target.value*60)}/>
                        <div className='icon-container icon-container--plus'>
                          <FiPlus />
                        </div>
                      </div>
                    </div>

                    <div className='settings__menu-option'>
                      <label className='outfit-light'>Long Break:</label>
                      <div className='custom-input'>
                        <div className='icon-container icon-container--minus'>
                          <FiMinus />
                        </div>
                        <input id='longBreak-input' type="number" value={longBreak/60} min='1' max="60" onChange={(e)=> setLongBreak(e.target.value*60)}/>
                        <div className='icon-container icon-container--plus'>
                          <FiPlus />
                        </div>
                      </div>
                    </div>

                    <div className='settings__menu-btns'>
                      <Button className="btn settings__menu-btn settings-save-btn" onClick={()=>{saveSettings()}} icon={IoCheckmarkCircleOutline} text="Save Changes"/>
                      <Button className="btn settings__menu-btn settings-reset-btn" onClick={()=>{resetSettings()}} icon={RiResetLeftLine} text="Reset to Default"/>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Navigation
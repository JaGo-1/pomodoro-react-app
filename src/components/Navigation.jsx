import React from 'react'
import Button from './Button'
import { IoSettingsOutline } from "react-icons/io5";


function Navigation() {
  return (
    <div className='nav__container '>
        <h3 className='outfit-light'>Pomodoro Timer</h3>
        
        <div className='settings'>
            <Button size="small" className="btn settings-btn" iconStyle="btn-icon" icon={IoSettingsOutline}/>
        </div>
    </div>
  )
}

export default Navigation
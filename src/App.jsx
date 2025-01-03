import './styles/styles.css'
import Button from './components/Button'
import {play, pause, settings, reset, GitHub_Logo} from './assets/images'

function App() {

  return (
    <div className='container'>
      <div className='content'>

        <div className='settings'>
          <Button size="small" img={settings}/>
        </div>
 
        <div className='timer'>
          <h1 className='gaegu-bold'>Pomodoro Timer</h1>
          <h2 className='gaegu-regular'>25:00</h2>
        </div>

        <div className='buttons'>
          <Button img={play}/>
          <Button img={reset}/>
        </div>
      </div>
    </div>

  )
}

export default App

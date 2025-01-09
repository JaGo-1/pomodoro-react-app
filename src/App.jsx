import Home from './components/Home'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { TimerContextProvider } from './context/TimerContext'

 function App() {
  return (
    <TimerContextProvider>
      <div className='container'>
        <Navigation />
        <Home />
        <Footer /> 
      </div> 
    </TimerContextProvider>
  )
}

export default App

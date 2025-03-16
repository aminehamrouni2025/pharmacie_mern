import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './components/Landing/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
   <LandingPage/>
   </div>
  )
}

export default App

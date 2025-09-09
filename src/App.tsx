import { useEffect } from 'react'
import Home from './pages/Home'

function App() {
  useEffect(() => {
    // mobile safe area support
    const vh = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    vh()
    window.addEventListener('resize', vh)
    return () => window.removeEventListener('resize', vh)
  }, [])

  return <Home />
}

export default App

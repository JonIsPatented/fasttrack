import './styles/App.css'

import Landing from './components/Landing.tsx'
import Navbar from './components/Navbar.tsx'
import About from './components/About.tsx'
function App() {
  return (
    <>
      <Navbar/>
      <Landing/>
      <About/>
    </>
  )
}

export default App

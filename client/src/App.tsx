import './styles/App.css'

import Landing from './components/Landing.tsx'
import Navbar from './components/Navbar.tsx'
import About from './components/About.tsx'
import Coasters from './components/Coasters.tsx'


function App() {
  return (
    <>
      <Navbar/>
      <Landing/>
      <About/>
      <Coasters/>
    </>
  )
}

export default App

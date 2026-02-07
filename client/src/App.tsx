import './styles/App.css'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router';
import Landing from './components/Landing.tsx'
import Navbar from './components/Navbar.tsx'
import About from './components/About.tsx'
import Coasters from './components/Coasters.tsx'
import CoasterViewer from './components/CoasterView.tsx'


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={
          <> 
            <Landing/>
            <About/>
            <Coasters/>
          </>
          }
        />
        <Route path="/view-coaster" element={<CoasterViewer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

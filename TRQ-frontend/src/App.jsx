import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import './App.css';


function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <section id="center">
        <div>
          <Outlet />
        </div>
      </section>
    </>
  )
}

export default App

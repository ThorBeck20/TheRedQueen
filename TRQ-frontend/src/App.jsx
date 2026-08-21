import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';


function App() {
  return (
    <div className='bg-surface h-screen theme-transition'>
      <div>
        <Navbar />
      </div>
      <section id="center">
        <div>
          <Outlet />
        </div>
      </section>
    </div>
  )
}

export default App

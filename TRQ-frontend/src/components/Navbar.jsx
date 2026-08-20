import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar() {
    
    return(
        <>
            <div className="flex flex-row bg-surface-raised p-2 justify-center">
                <h1 className='justify-start'>The Red Queen ♕</h1>
                <nav className="flex flex-row gap-3 content-center">
                    <Link to="/">Home</Link>
                    <Link to="/Bonds">Bonds</Link>
                </nav>
                <ThemeToggle />
            </div>
        </>
    )
}

export default Navbar;
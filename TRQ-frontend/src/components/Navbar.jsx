import { Link } from 'react-router-dom';

function Navbar() {
    
    return(
        <>
            <h1>TEST!</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Bonds">Bonds</Link>
            </nav>
        </>
    )
}

export default Navbar;
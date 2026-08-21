import NavbarLink from './NavbarLink';
import ThemeToggle from '../ThemeToggle';

function Navbar() {
    
    return(
        <>
            <div className="
                flex flex-row bg-surface h-15 w-full items-center shadow-2xl
                justify-between theme-transition
            ">
                <div className="
                    flex flex-row h-15
                    justify-start content-center

                ">
                    <h2 className='min-w-70 h-15 px-10 py-4'>THE RED QUEEN ♕</h2>
                    <nav className="flex flex-row gap-1 mx-2 h-15">
                        <NavbarLink to="/" >Home</NavbarLink>
                        <NavbarLink to="/Bonds">Bonds</NavbarLink>
                    </nav>
                </div>
                <div className="
                    flex items-center 
                    h-15 justify-end px-8
                ">
                    <ThemeToggle  />
                </div>
            </div>
        </>
    )
}

export default Navbar;
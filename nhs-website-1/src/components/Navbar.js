import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton()
    }, []);


    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                      <img className='navbar-logo' src="/images/newnhslogo.png" alt="/images/img-1.jpg" />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                     <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/eligibility' className='nav-links' onClick={closeMobileMenu}>
                                Eligibility
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign in
                            </Link>
                        </li>
                     </ul>
                    {button && <Link to='/sign-in' className='nav-links'><Button buttonStyle='btn--outline-sign-up'>Sign in</
                    Button> </Link>}

                </div>
            </nav>
        </>
    )
}

export default Navbar

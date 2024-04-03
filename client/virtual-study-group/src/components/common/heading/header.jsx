import React, { useState } from 'react';
import Head from './head';
import { Link, useNavigate } from 'react-router-dom';

import "./header.css";

const Header = () => {
    const [click, setClick] = useState(false);
    const isUserSignedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSignOut = () => {
        alert('Signed Out');
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <Head />
            <header>
                <nav className='flexSB'>
                    <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
                        {isUserSignedIn ? (
                            <>
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/courses">Options</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><button id="logout_btn" onClick={handleSignOut}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/courses">Options</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </>
                        )}
                    </ul>
                    <div className="start">
                        <div className="button">
                            ALL RESOURCES
                        </div>
                    </div>
                    <button className="toggle" onClick={() => setClick(!click)}>
                        {click ? <i className='fa fa-times'></i> : <i className="fa fa-bars"></i>}
                    </button>
                </nav>
            </header>
        </div>
    )
}
export default Header; 
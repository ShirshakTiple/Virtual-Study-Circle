import React from 'react';
import { Link } from 'react-router-dom';
import '../loginForm/loginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';

const SignupForm = () => {
    return (
        <div className='outside_wrapper'>
            <div className='wrapper'>
                <form action="">
                    <h1>SignUp</h1>

                    <div className="input-box">
                        <input type="email" placeholder="E-mail" required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser id="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock id='icon' />
                    </div>

                    <button type="submit">Signup</button>

                    <div className='register-link'>
                        <p>Already have an account?<Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm;
import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../loginForm/loginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [user , setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name , setName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers();
    } , [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/auth/users')
        .then(
            (res) => console.log(res.data),
        )
    }

    const handleSignup = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3001/auth/register', { email, name, password })
        .then(() => {
            alert('Registration Success');
            setEmail('');
            setName('');
            setPassword('');
            fetchUsers();
            navigate('/login');
        })
        .catch((error) => {
            if (error.response && error.response.status === 400 && error.response.data.error === 'User already exists') {
                alert('User already exists');
            } else {
                console.log('Unable to register');
            }
        });
    };
    

    return (
        <div className='outside_wrapper'>
            <div className='wrapper'>
                <form onSubmit={handleSignup}>
                    <h1>SignUp</h1>

                    <div className="input-box">
                        <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required value={name} onChange={(e) => setName(e.target.value)}/>
                        <FaUser id="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
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
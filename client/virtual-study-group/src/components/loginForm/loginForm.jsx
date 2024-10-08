import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import './loginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {
    const [user , setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', { email, password });
            const token = response.data.token;
            const email1 = response.data.email;
            console.log(email1);
            alert('Login successful');
            setEmail('');
            setPassword('');
            fetchUsers();
            navigate('/home');
            window.location.reload();
            localStorage.setItem('token', token);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('id', response.data.id);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const status = error.response.status;
                if (status === 401) {
                    alert('Invalid credentials');
                } else {
                    alert('Login failed. Please try again later.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                alert('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                alert('Error occurred while processing your request. Please try again later.');
            }
            console.error('Login error:', error);
        }
    };

    return (
        <div className='outside_wrapper'>
            <div className='wrapper'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <FaUser id='icon' />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <FaLock id='icon' />
                    </div>

                    <div className='remeber-forgot'>
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className='register-link'>
                        <p>Don't have an account?  <Link to="signup">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
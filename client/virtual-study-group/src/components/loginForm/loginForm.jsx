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
        .get('http://localhost:3001/register')
        .then(
            (res) => console.log(res.data),
        )
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:3001/login', {email , password})
            const token = response.data.token
            alert('Login successful')
            setEmail('')
            setPassword('')
            fetchUsers()
            navigate('/home')
            window.location.reload()
            localStorage.setItem('token' , token)
        }
        catch(error){
            console.log('Login error')
        }
    }

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
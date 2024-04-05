import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../loginForm/loginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
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

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/register', { email, name, password });
            alert(response.data.message); // Display success message
            setEmail('');
            setName('');
            setPassword('');
            fetchUsers();
            navigate('/login');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with an error status code
                if (error.response.status === 400) {
                    // Client-side errors (e.g., validation errors)
                    alert(error.response.data.error);
                } else if (error.response.status === 500) {
                    // Server-side error
                    alert('An error occurred on the server. Please try again later.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                alert('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error occurred while processing your request:', error.message);
                alert('Error occurred while processing your request. Please try again later.');
            }
        }
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
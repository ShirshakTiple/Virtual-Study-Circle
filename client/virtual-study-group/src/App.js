import './App.css';
import LoginForm from './components/loginForm/loginForm';
import SignupForm from './components/signupForm/signupForm';
import Home from './components/home/home';
import About from './components/about/about';
// import Header from './components/common/heading/header'
import CoursesHome from './components/allcourses/coursesHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const isUserSignedIn = !!localStorage.getItem('token');
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/signup" element={<SignupForm />} />
        {isUserSignedIn && <Route path="/home" element={<Home />} />}
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CoursesHome />} />

      </Routes>
    </Router>
  );
}

export default App;

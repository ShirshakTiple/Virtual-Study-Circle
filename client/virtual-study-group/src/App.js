import './App.css';
import LoginForm from './components/loginForm/loginForm';
import SignupForm from './components/signupForm/signupForm';
import Home from './components/home/home';
import Resource from './components/resources/resources';

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
        <Route path="/resources" element={<Resource />} />
      </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<LoginForm />} />
    //     <Route path="/login/signup" element={<SignupForm />} />
    //     <Route path="/home" element={<Home />} />
    //   </Routes>
    // </Router>
  );
}

export default App;

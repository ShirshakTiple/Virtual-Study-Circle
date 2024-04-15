import './App.css';
import LoginForm from './components/loginForm/loginForm';
import SignupForm from './components/signupForm/signupForm';
import Home from './components/home/home';
import About from './components/about/about';
// import Header from './components/common/heading/header'
import CoursesHome from './components/allcourses/coursesHome';
import Resource from './components/resources/resources';

import Forum from './components/forum/forum';
import Replies from "./components/forum/replies";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage/ChatPage';
import VideoCall from './components/VideoCall/VideoCall'
import Room from './components/VideoCall/Room';


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
        {isUserSignedIn && <Route path="/groupchat" element={<ChatPage />} />}
        {isUserSignedIn && <Route path="videochat" element={<VideoCall />} />}
        {isUserSignedIn && <Route path="/room/:roomID" element={<Room />} />}
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CoursesHome />} />
        {isUserSignedIn && <Route path="/forum" element={<Forum />} />}
        <Route path="/replies/:threadId" element={<Replies />} />
        <Route path="/resource" element={<Resource />} />
      </Routes>
    </Router>
  );
}

export default App;

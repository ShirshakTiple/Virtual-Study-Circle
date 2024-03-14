import React from 'react'
import Hero from './hero/hero';
import Header from '../common/heading/header';
import AboutCard from '../about/aboutCard';
// import CoursesCard from '../allcourses/coursesCard';
import HAbout from '../home/hAbout'

const Home = () => {
    return (
        <div>
            <Header />
            <Hero />
            <AboutCard />
            <HAbout />
        </div>
    )
}

export default Home

import React from 'react'
import Back from "../common/back/back"
import AboutCard from "./aboutCard"
import Header from '../common/heading/header';


const About = () => {
    return (
        <>
            <Header />
            <Back title="About us" />
            <AboutCard />
        </>
    )
}

export default About

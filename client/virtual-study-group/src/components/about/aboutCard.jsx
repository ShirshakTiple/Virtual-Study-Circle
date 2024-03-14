import React from 'react'
import Title from '../common/title/title'
import { homeAbout } from '../../dummydata'
import AWrapper from './aWrapper'
import './about.css'

const AboutCard = () => {
    return (
        <>
            <section className="aboutHome">
                <div className="container flexSB">
                    <div className="left row">
                        <img src="./images/about.webp" alt="background_image" />
                    </div>
                    <div className="right row">
                        <Title subtitle="LEARN ANYTHING" title="Learn, Grow, Study in Peer" />
                        <div className="items">{homeAbout.map((val) => (
                            <div className="item flexSB">
                                <div className="img">
                                    <img src={val.cover} alt="" />
                                </div>
                                <div className="text">
                                    <h2>{val.title}</h2>
                                    <p>{val.desc}</p>
                                </div>
                            </div>
                        ))}</div>
                    </div>
                </div>
            </section>
            <AWrapper />
        </>
    )
}

export default AboutCard


import React from 'react'
import Title from '../../common/title/title';
import "./hero.css"

const Hero = () => {
    return (
        <div>
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <Title subtitle="Welcome to Study Peer" title="Better than Unacademy" />
                        <p>Studying online in a group video call is like hosting a silent disco for your brain - everyone's grooving to the rhythm of learning, but you can't hear a thing! So let's turn up the knowledge, mute the distractions, and dance our way to academic success... silently, of course!</p>
                        <div className='button'>
                            <button className="primary-btn">
                                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
                            </button>
                            <button className='view_course'>
                                VIEW COURSES <i className='fa fa-long-arrow-alt-right'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="marigin"></div>
        </div>
    )
}

export default Hero

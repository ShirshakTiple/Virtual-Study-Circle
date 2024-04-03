import React from 'react'
import Title from '../common/title/title'
import { coursesCard } from '../../dummydata'
import { Link } from 'react-router-dom';

const HAbout = () => {
    return (
        <>
            <section className='homeAbout'>
                <div className="container">
                    <Title subtitle="Explore Study Peer's Options" cd title="Unleash Your Learning Potential" />
                    <div className="coursesCard">
                        <div className="grid2">
                            {coursesCard.slice(0, 4).map((val) => {
                                return (
                                    <div className="items">
                                        <div className="content flex">
                                            <div className="left">
                                                <div className="img">
                                                    <img src={val.cover} alt='' />
                                                </div>
                                            </div>
                                            <div className="text">
                                                <h1>{val.coursesName}</h1>
                                                <div className="rate">
                                                    <i className='fa fa-star'></i>
                                                    <i className='fa fa-star'></i>
                                                    <i className='fa fa-star'></i>
                                                    <i className='fa fa-star'></i>
                                                    <i className='fa fa-star'></i>
                                                    <label htmlFor=''>(5.0)</label>
                                                </div>
                                                <div className="details">
                                                    {/* here we are fetching from nested api */}
                                                    {val.courTeacher.map((details) => (
                                                        <>
                                                            <div className="box">
                                                                {/* <div className="dimg">
                                                            <img src={details.dcover} alt='' />
                                                        </div> */}
                                                                <div className="para">
                                                                    <h4>{details.name}</h4>
                                                                </div>
                                                            </div>
                                                            <span>{details.totalTime}</span>
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='price'>
                                            <h3>{val.priceAll}</h3>
                                        </div>
                                        <Link to={val.web_link}><button className="outline-btn" >EXPLORE</button></Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HAbout;

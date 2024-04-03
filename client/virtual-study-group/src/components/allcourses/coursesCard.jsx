import React from 'react'
import { coursesCard } from '../../dummydata'
import './courses.css'
import { Link } from 'react-router-dom';



const CoursesCard = () => {

    return (
        <>
            <section className="coursesCard">
                <div className="container grid2">
                    {coursesCard.map((val) => {
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
            </section>
        </>
    )
}

export default CoursesCard

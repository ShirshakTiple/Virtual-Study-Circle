import React from 'react'
import Back from '../common/back/back'
import CoursesCard from './coursesCard'
import Header from '../common/heading/header'

const CoursesHome = () => {
    return (
        <>
            <Header />
            <Back title="Explore Options" />
            <CoursesCard />
        </>
    )
}

export default CoursesHome

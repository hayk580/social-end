import React from 'react'
import { Helmet } from "react-helmet";
// import TimelineCourse from './TimelineCourse'
import { useParams, Link } from 'react-router-dom';
import Navbar from "../Navbar";
import LeftSidebar from "../LeftSidebar";
import axios from 'axios';
import CreateSchedules from '../schedules/Createschedules'
import { BACKEND_SERVER_DOMAIN } from '../../../settings'
import { useDispatch, useSelector } from 'react-redux';
import { addSchedules } from '../../../redux/actions'

import CoursesSingle from './SinglCourse';
export default function CoursePage() {
    const {course_id} = useParams();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [courses,setCourse] = React.useState();
    const setToekn = localStorage.getItem('state')
    const [isLoading, setIsLoading] = React.useState(true)

    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const newSchedules = (schedules) => {
        dispatch(addSchedules(schedules));
    }
    React.useEffect(() => {
        window.scrollTo(0, 0);
        let config = { headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' +  Token,   
        }};
        axios.get(BACKEND_SERVER_DOMAIN + '/getschedules/course/'+course_id+"/", config)
            .then(function (response) {
                setCourse(response.data);
                setIsLoading(false)

                console.log("daaa" + JSON.stringify(courses))
            })
            .catch(function (err) {
                console.log(err);
                setIsLoading(false)

            });
    },[])

    return (
        <section className="profile-page">
            <Helmet>
                {/* <title>{(course) ? course.person.first_name + " " +course.person.last_name : "User"}'s Course</title> */}
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active="0"/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    {/* <CreateSchedules user={user} newSchedules={newSchedules} /> */}

                        {/* {(course) ? <TimelineCourse user={user} course={course} expanded={true}/>:""} */}
                    
                        <div className="friendlistitem d-flex">
            <div className="avatar">
       
            </div>
            <div>             

            {/* <CoursesSingle courses={courses} /> */}
            {/* {(!isLoading) ? (courses) ? (
                                <div className="courses-list">
                                    {courses
                                        .slice()
                                        .reverse()
                                        .map((courses, index) => (
                                            <div
                                                key={index}
                                            >
            <CoursesSingle courses={courses} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some courses and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)} */}
                
               <CoursesSingle />
            </div>
        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

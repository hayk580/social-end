import React from 'react'
import { Helmet } from "react-helmet";
// import TimelineCourse_module from './TimelineCourse_module'
import { useParams, Link } from 'react-router-dom';
import Navbar from "../Navbar";
import LeftSidebar from "../LeftSidebar";
import axios from 'axios';
import CreateSchedules from '../schedules/Createschedules'
import { BACKEND_SERVER_DOMAIN } from '../../../settings'
import { useDispatch, useSelector } from 'react-redux';
import { addSchedules } from '../../../redux/actions'

import Course_modulesSingle from './SinglCourse_module';
export default function Course_modulePage() {
    const {course_module_id} = useParams();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [course_modules,setCourse_module] = React.useState();
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
        axios.get(BACKEND_SERVER_DOMAIN + '/getschedules/course_module/'+course_module_id+"/", config)
            .then(function (response) {
                setCourse_module(response.data);
                setIsLoading(false)

                console.log("daaa" + JSON.stringify(course_modules))
            })
            .catch(function (err) {
                console.log(err);
                setIsLoading(false)

            });
    },[])

    return (
        <section className="profile-page">
            <Helmet>
                {/* <title>{(course_module) ? course_module.person.first_name + " " +course_module.person.last_name : "User"}'s Course_module</title> */}
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active="0"/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    <CreateSchedules user={user} newSchedules={newSchedules} />

                        {/* {(course_module) ? <TimelineCourse_module user={user} course_module={course_module} expanded={true}/>:""} */}
                    
                        <div className="friendlistitem d-flex">
            <div className="avatar">
       
            </div>
            <div>             

            {/* <Course_modulesSingle course_modules={course_modules} /> */}
            {(!isLoading) ? (course_modules) ? (
                                <div className="course_modules-list">
                                    {course_modules
                                        .slice()
                                        .reverse()
                                        .map((course_modules, index) => (
                                            <div
                                                key={index}
                                            >
            <Course_modulesSingle course_modules={course_modules} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some course_modules and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)}
                {/* <h6><Link to={"/course_module/"+course_module._id}>{course_module.title}</Link></h6> */}

                {/* <p>{course_modules.desc}</p>
                <hr style={{color: "green"}} />

                <b>Թեմատիկ Գրականություն</b>
                <p>{course_modules.literature}</p>
                <hr style={{color: "green"}} />

                <b>օգտակար հղումներ</b>
                <p>{course_modules.links}</p>
                <hr style={{color: "green"}} />

                <b>Դասի օրը,  ժամը</b>
                <p>{course_modules.hourly_course_module}</p> */}
                {/* <span>{course_modules.tagline}<br/><i class="fas fa-birthday-cake"></i>&nbsp; {birthday(course_modules.birthday)}</span> */}
            </div>
        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

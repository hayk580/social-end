import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
// import SuggestCourses from "./SuggestCourses";
// import CourseRequests from "./CourseRequests";
import axios from "axios";
import CreateCourse from './Createcours'
import LeftSidebar from "../LeftSidebar";
import CourseListItem from "./CourseListItem";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import Navbar from "../Navbar";
import { addCourse } from "../../../redux/actions"

export default function Courses() {
    const [courses, setCourses] = React.useState();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(true)
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const dispatch = useDispatch();


    const newCourse = (course) => {
        dispatch(addCourse(course));
    }


    React.useEffect(() => {
        window.scrollTo(0, 0);
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' +  Token,   
            },
        };
        axios
            .get(BACKEND_SERVER_DOMAIN + "/getcourses/all/", config)
            .then((res) => {
                setCourses(res.data)
                setIsLoading(false)
            })
            .catch(function(error) {
                console.log(error)
                setIsLoading(false)
            });
    },[])

    return (
        <section className="courses">
            <Helmet>
                <title>Courses on socialnetwork</title>
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={2}/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    <CreateCourse user={user} newCourse={newCourse} />

                        <courseRequests />
                        <h6 className="mt-3">Courses</h6>
                        <div class="card">
                            {(!isLoading) ? (courses) ? (
                                <div className="courses-list">
                                    {courses
                                        .slice()
                                        .reverse()
                                        .map((course, index) => (
                                            <div
                                                key={index}
                                            >
                                                <CourseListItem course={course} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some courses and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)}
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 rightsidebar">
                        {/* <SuggestCourses /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

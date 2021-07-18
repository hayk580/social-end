import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
// import SuggestCourse_modules from "./SuggestCourse_modules";
// import Course_moduleRequests from "./Course_moduleRequests";
import axios from "axios";
import CreateCourse_module from './Createcours_module'
import LeftSidebar from "../LeftSidebar";
import Course_moduleListItem from "./Course_moduleListItem";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import Navbar from "../Navbar";
import { addCourse_module } from "../../../redux/actions"

export default function Course_modules() {
    const [course_modules, setCourse_modules] = React.useState();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(true)
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const dispatch = useDispatch();


    const newCourse_module = (course_module) => {
        dispatch(addCourse_module(course_module));
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
            .get(BACKEND_SERVER_DOMAIN + "/getcourse_modules/all/", config)
            .then((res) => {
                setCourse_modules(res.data)
                setIsLoading(false)
            })
            .catch(function(error) {
                console.log(error)
                setIsLoading(false)
            });
    },[])

    return (
        <section className="course_modules">
            <Helmet>
                <title>Course_modules on socialnetwork</title>
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={2}/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    <CreateCourse_module user={user} newCourse_module={newCourse_module} />

                        <course_moduleRequests />
                        <h6 className="mt-3">Course_modules</h6>
                        <div class="card">
                            {(!isLoading) ? (course_modules) ? (
                                <div className="course_modules-list">
                                    {course_modules
                                        .slice()
                                        .reverse()
                                        .map((course_module, index) => (
                                            <div
                                                key={index}
                                            >
                                                <Course_moduleListItem course_module={course_module} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some course_modules and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)}
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 rightsidebar">
                        {/* <SuggestCourse_modules /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

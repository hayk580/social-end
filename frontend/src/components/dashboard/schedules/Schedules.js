import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
// import SuggestScheduless from "./SuggestScheduless";
// import SchedulesRequests from "./SchedulesRequests";
import axios from "axios";
import CreateSchedules from './Createschedules'
import LeftSidebar from "../LeftSidebar";
import SchedulesListItem from "./SchedulesListItem";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import Navbar from "../Navbar";
import { addSchedules } from "../../../redux/actions"

export default function Scheduless() {
    const [scheduless, setScheduless] = React.useState();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(true)
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const dispatch = useDispatch();


    const newSchedules = (schedules) => {
        dispatch(addSchedules(schedules));
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
            .get(BACKEND_SERVER_DOMAIN + "/getschedules/all/", config)
            .then((res) => {
                setScheduless(res.data)
                setIsLoading(false)
            })
            .catch(function(error) {
                console.log(error)
                setIsLoading(false)
            });
    },[])

    return (
        <section className="scheduless">
            <Helmet>
                <title>Scheduless on socialnetwork</title>
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={2}/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    {/* <CreateSchedules user={user} newSchedules={newSchedules} /> */}

                        <schedulesRequests />
                        <h6 className="mt-3">Դասացուցակ</h6>
                        <div class="card">
                            {(!isLoading) ? (scheduless) ? (
                                <div className="scheduless-list">
                                    {scheduless
                                        .slice()
                                        .reverse()
                                        .map((schedules, index) => (
                                            <div
                                                key={index}
                                            >
                                                <SchedulesListItem schedules={schedules} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some dddd and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)}
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 rightsidebar">
                        {/* <SuggestScheduless /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

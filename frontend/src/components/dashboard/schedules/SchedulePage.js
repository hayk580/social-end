import React from 'react'
import { Helmet } from "react-helmet";
// import TimelineSchedule from './TimelineSchedule'
import { useParams, Link } from 'react-router-dom';
import Navbar from "../Navbar";
import LeftSidebar from "../LeftSidebar";
import axios from 'axios';
import { BACKEND_SERVER_DOMAIN } from '../../../settings'
import { useSelector } from 'react-redux';
import  SchedulesSingle  from './Singl';
export default function SchedulePage() {
    const {schedule_id} = useParams();
    const user = useSelector((state) => state.user);
    const [schedules,setSchedule] = React.useState();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    React.useEffect(() => {
        window.scrollTo(0, 0);
        let config = { headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' +  Token,   
        }};
        axios.get(BACKEND_SERVER_DOMAIN + '/getschedules/single/'+schedule_id+"/", config)
            .then(function (response) {
                setSchedule(response.data);

                console.log("daaa" + JSON.stringify(schedules))
            })
            .catch(function (err) {
                console.log(err);
            });
    },[])

    return (
        <section className="profile-page">
            <Helmet>
                {/* <title>{(schedule) ? schedule.person.first_name + " " +schedule.person.last_name : "User"}'s Schedule</title> */}
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active="0"/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                        {/* {(schedule) ? <TimelineSchedule user={user} schedule={schedule} expanded={true}/>:""} */}
                    
                        <div className="friendlistitem d-flex">
            <div className="avatar">
       
            </div>
            <div>             
            <SchedulesSingle schedules={schedules} />

                {/* <h6><Link to={"/schedule/"+schedule._id}>{schedule.title}</Link></h6> */}

                {/* <p>{schedules.desc}</p>
                <hr style={{color: "green"}} />

                <b>Թեմատիկ Գրականություն</b>
                <p>{schedules.literature}</p>
                <hr style={{color: "green"}} />

                <b>օգտակար հղումներ</b>
                <p>{schedules.links}</p>
                <hr style={{color: "green"}} />

                <b>Դասի օրը,  ժամը</b>
                <p>{schedules.hourly_schedule}</p> */}
                {/* <span>{schedules.tagline}<br/><i class="fas fa-birthday-cake"></i>&nbsp; {birthday(schedules.birthday)}</span> */}
            </div>
        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

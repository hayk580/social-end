import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"
export default function SchedulesListItem({schedules}) {

    function birthday(date) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date(date),
            month = '' + months[d.getMonth()],
            day = '' + d.getDate() + ",",
            year = d.getFullYear();
    
        return [month, day, year].join(' ');
    }

    return (
        <div className="friendlistitem d-flex">
            <div className="avatar">
            {/* {schedules.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + schedules.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )} */}
            </div>
            <div>             

                <h6><Link to={"/schedule/"+schedules._id}>{schedules.title}</Link></h6>

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
    );
}


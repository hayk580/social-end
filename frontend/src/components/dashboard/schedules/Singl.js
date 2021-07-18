import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"

export default function SchedulesSingle({schedules}) {

if(!schedules)
{
    return 0
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
            <hr />

                <h4>{schedules.title}</h4>
                <hr />
                <p>{schedules.desc}</p>
                <hr style={{color: "green"}} />

                <b>Թեմատիկ Գրականություն</b>
                <p>{schedules.literature}</p>
                <hr style={{color: "green"}} />

                <b>օգտակար հղումներ</b>
                <p>{schedules.links}</p>
                <hr style={{color: "green"}} />

                <b>Դասի օրը,  ժամը</b>
                <p>{schedules.hourly_schedule}</p> 
            </div>
        </div>
    );
}
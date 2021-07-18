import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"

export default function Course_modulesSingle({course_modules}) {

if(!course_modules)
{
    return 0
}

    return (
        <div className="friendlistitem d-flex">
            <div className="avatar">
            {/* {course_modules.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + course_modules.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )} */}
            </div>
            <div>             
            <hr />

                <h4>{course_modules.title}</h4>
                <hr />
                <p>{course_modules.desc}</p>
                <hr style={{color: "green"}} />

                <b>Թեմատիկ Գրականություն</b>
                <p>{course_modules.literature}</p>
                <hr style={{color: "green"}} />

                <b>օգտակար հղումներ</b>
                <p>{course_modules.links}</p>
                <hr style={{color: "green"}} />

                <b>Դասի օրը,  ժամը</b>
                <p>{course_modules.hourly_course_module}</p> 
            </div>
        </div>
    );
}
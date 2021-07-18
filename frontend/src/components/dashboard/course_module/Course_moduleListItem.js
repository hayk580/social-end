import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"

export default function Course_moduleListItem({course_module}) {

    return (
        <div className="friendlistitem d-flex">
            <div className="avatar">
            {/* {course_module.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + course_module.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )} */}
            </div>
            <div>
                <h6><Link to={"/course_module/"+course_module._id}>{course_module.title}</Link></h6>
                <h6>{course_module.desc}</h6>
                {/* <span>{course_module.tagline}<br/><i class="fas fa-birthday-cake"></i>&nbsp; {birthday(course_module.birthday)}</span> */}
            </div>
        </div>
    );
}
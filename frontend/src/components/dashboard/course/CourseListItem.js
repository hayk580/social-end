import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"
export default function CategorysListItem({course}) {

    return (
        <div className="friendlistitem d-flex">
            <div className="avatar">
            {/* {course.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + course.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )} */}
            </div>
            <div>
                <h6><Link to={"/course/"+course._id}>{course.title}</Link></h6>
                <h6>{course.desc}</h6>
                {/* <span>{course.tagline}<br/><i class="fas fa-birthday-cake"></i>&nbsp; {birthday(course.birthday)}</span> */}
            </div>
        </div>
    );
}
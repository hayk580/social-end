import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"





export default function HomeworkListItem({homework}) {

if(!homework)
{
    return 3
}




    return (
        <div className="studentlistitem d-flex">
            <div className="avatar">
            {/* {homework.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + homework.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )} */}
            <hr />
            </div>
           
            <div>
                <h6><Link to={"/u/"+homework.username}>{homework.title} </Link></h6>
                <span>{homework.occupation}<br/></span>
            </div>
            
        </div>
        // <option value={student._id}>{student.full_name}</option>

        
    );
}


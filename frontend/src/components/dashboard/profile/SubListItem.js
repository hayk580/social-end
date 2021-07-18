import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"





export default function StudentListItem({student}) {

if(!student)
{
    return 0
}




    return (
        <div className="studentlistitem d-flex">
            <div className="avatar">
            {student.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + student.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )}
            <hr />
            </div>
           
            <div>
                <h6><Link to={"/u/"+student.username}>{student.full_name} </Link></h6>
                <span>{student.occupation}<br/></span>
            </div>
            
        </div>
        // <option value={student._id}>{student.full_name}</option>

        
    );
}


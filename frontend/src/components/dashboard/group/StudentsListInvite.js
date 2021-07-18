import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"
import { divide } from 'lodash';





export default function  StudentListInvite({student}) {

if(!student)
{
    return 0
}




    return (
       
        <option value={student._id}>{student.full_name} </option>

 
    );
}


import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"
export default function QuestionsListItem({question}) {

    return (
        <div className="friendlistitem d-flex">
            <div className="avatar">
            {/* {question.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + question.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )} */}
            </div>
            <div>
                <h6><Link to={"/question/"+question._id}>{question.title}</Link></h6>
                <h6>{question.desc}</h6>
                {/* <span>{question.tagline}<br/><i class="fas fa-birthday-cake"></i>&nbsp; {birthday(question.birthday)}</span> */}
            </div>
        </div>
    );
}
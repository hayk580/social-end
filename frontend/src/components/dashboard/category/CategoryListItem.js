import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"
export default function CategoryeListItem({category}) {

    return (
        <div className="friendlistitem d-flex">
            <div className="avatar">
            {/* {categorye.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + categorye.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )} */}
            </div>
            <div>
                <h6><Link to={"/categorye/"+category._id}>{category.title}</Link></h6>
                <h6>{category.desc}</h6>
                {/* <span>{categorye.tagline}<br/><i class="fas fa-birthday-cake"></i>&nbsp; {birthday(categorye.birthday)}</span> */}
            </div>
        </div>
    );
}
import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"
export default function FriendListItem({friend}) {

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
            {friend.avatar ? (
                <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + friend.avatar} className="rounded" />
            ) : (
                <img src={profile} className="rounded" />
            )}
            </div>


            <div>
                <h6><Link to={"/u/"+friend._id}>{friend.full_name} </Link></h6>
                {/* <span>{friend.tagline}<br/><i class="fas fa-birthday-cake"></i>&nbsp; {birthday(friend.birthday)}</span> */}
            </div>
        </div>

        
    );
}
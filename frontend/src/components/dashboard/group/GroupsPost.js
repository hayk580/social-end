import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import profile from "../../../assets/images/profile.jpg"
export default function GroupPostListItem({posts}) {

if(!posts)
{
    return "բացկայում են"
}
    return (


        // <div className="groupPostlistitem d-flex">
        //     {/* <div className="avatar">

        //     {posts.avatar ?  (
        //         <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + posts.avatar} className="rounded" />
                
        //         )
                

        //         : (
        //         <img src={profile} className="rounded" />           
        //     )}
            
        //     </div> */}

        //     <div>
        //             <h6>
        //                 <Link to={"/u/"+posts.username}>{posts.username} </Link>
        //             </h6>
        //         </div>
        //     <div>
        //         <h6>{posts.username}</h6>
        //         <div>
        //         <p className="post-content">{posts.desc}</p>
        //         </div>
               
        //                        {/* <span>{groupPost.tagline}<br/><i class="fas fa-birthday-cake"></i>&nbsp; {birthday(groupPost.birthday)}</span> */}
        //     </div>
        // </div>



        // // <option value={groupPost._id}>{groupPost.full_name}</option>

<article className="post card">
<div className="d-flex userbar">
<LazyLoadImage
            loading="lazy"
            className="rounded-circle"
            src={BACKEND_SERVER_DOMAIN + "/" + 'avatar' + "/" + posts.avatar}
            // alt={post.person.first_name + "'s avatar"}
        />
<div>
                    <h6>
                        <Link to={"/u/"+posts.username}>{posts.username} </Link>
                    </h6>
                    <span></span>
                </div>
                </div>

                <div>
                <p className="post-content">{posts.desc}</p>
                </div>
                {posts.photo ? (
                <LazyLoadImage src={BACKEND_SERVER_DOMAIN +  '/' + 'photo' + '/' + posts.photo}/>
            ) : (
                ""
            )}
</article>


        
    );
}
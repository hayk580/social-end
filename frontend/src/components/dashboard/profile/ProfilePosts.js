import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import profile from "../../../assets/images/profile.jpg"
export default function ProfilePostListItem({posts}) {

if(!posts)
{
    return "բացկայում են"
}
    return (


        <div>
        <div class="Terminal__Toolbar">
     <div class="Toolbar__buttons">
       <button class="Toolbar__button Toolbar__button--exit">&#10005;</button>
       <button class="Toolbar__button">&#9472;</button>
       <button class="Toolbar__button">&#9723;</button>
     </div>
     <p class="Toolbar__user">cody@ubuntu:~</p>
   </div>
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
                    <div class="Terminal__Prompt">
        <span class="Prompt__user">@{posts.username}:</span><span class="Prompt__location"></span><span class="Prompt__dollar"></span>
        {/* <span class="Prompt__cursor"></span> */}
      </div>
                        {/* <Link to={"/u/"+posts.username}>{posts.username} </Link> */}
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
</div>

        
    );
}
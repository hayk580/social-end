import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function UserPostListItem({posts}) {

if(!posts)
{
    return "բացկայում են"
}
    return (

<article className="post card">
<div className="d-flex userbar">
<LazyLoadImage
            loading="lazy"
            className="rounded-circle"
            src={BACKEND_SERVER_DOMAIN + "/" + 'avatar' + "/" + posts.avatar}
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
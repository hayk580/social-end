import React, { useEffect} from 'react';
import axios from 'axios';
import TimelinePost from './TimelinePost';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from "../../../redux/actions"
import { BACKEND_SERVER_DOMAIN } from '../../../settings'

function Posts({token, userposts}) {
                   
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const getPosts = () => {
        
        let config = { headers: {
            'Content-Type': 'application/json',
             Authorization: 'Bearer ' +  Token,   
        }};
        axios.get(BACKEND_SERVER_DOMAIN + '/getposts/all/', config)
            .then(function (response) {
                dispatch(setPosts(response.data.reverse()));
            })
            .catch(function (err) {
                console.log(err);
                dispatch(setPosts([]));
            });


    }

    useEffect(() => {
        if (userposts) {
            dispatch(setPosts(userposts))
        } else {
            getPosts();
        }
    },[])



    return (posts && posts.length > 0) ? 
            (<section className="timeline-posts">
                {posts.map((post) => (
                    
                    <TimelinePost key={post._id} user={user} post={post}/>
            ))}
            </section>) : (
            <div className="sorry">
No posts yet.
            </div>
        );
}

export default Posts;
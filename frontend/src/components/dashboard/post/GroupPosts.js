// import React, { useEffect} from 'react';
// import axios from 'axios';
// import TimelinePost from './TimelinePost';
// import { useDispatch, useSelector } from 'react-redux';
// import { setGroupPosts } from "../../../redux/actions"
// import { BACKEND_SERVER_DOMAIN } from '../../../settings'
// import { useParams, Link } from "react-router-dom";

// function GroupPosts({token, usergroupPosts}) {
//     const {group_id} = useParams();
//     const user = useSelector((state) => state.user);
//     const groupPosts = useSelector((state) => state.groupPosts.groupPosts);
//     const dispatch = useDispatch();
//     const setToekn = localStorage.getItem('state')
//     const jsonToken = JSON.parse(setToekn)
//     const Token = jsonToken.user.access_token


//     const getGroupPosts = () => {
//         let config = { headers: {
//             'Content-Type': 'application/json',
//              Authorization: 'Bearer ' +  Token,   
//         }};
//         axios.get(BACKEND_SERVER_DOMAIN + '/groupPosts/' + group_id, config)
//             .then(function (response) {
//                 dispatch(setGroupPosts(response.data.reverse()));
//             })
//             .catch(function (err) {
//                 console.log(err);
//                 dispatch(setGroupPosts([]));
//             });
//     }

//     useEffect(() => {
//         if (usergroupPosts) {
//             dispatch(setGroupPosts(usergroupPosts))
//         } else {
//             getGroupPosts();
//         }
//     },[])

//     return (groupPosts && groupPosts.length > 0) ? 
//             (<section className="timeline-groupPosts">
//                 {groupPosts.map((post) => (
//                     <TimelinePost key={post._id} user={user} post={post}/>
//             ))}
//             </section>) : (
//             <div className="sorry">
//                բան չկա դու ասա
//             </div>
//         );
// }

// export default GroupPosts;
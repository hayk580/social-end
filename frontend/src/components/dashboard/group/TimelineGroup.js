    import React, { useState, useRef, useEffect } from "react";
import { timeSince } from "../../../utils/timesince";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import CommentComponent from "../post/Comment";
import axios from "axios";
import { Link } from 'react-router-dom';
import profile from '../../../assets/images/profile.jpg'
import {getMetadata} from 'page-metadata-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const TimelinePost = ({ user, post, expanded}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [comments, setComments] = useState();
    const [showComments, setShowComments] = useState(false);
    const [userdata, setUserData] = useState();
    const [isLoadingComments,setIsLoadingComments] = useState(false);
    const [embedUrls,setEmbedUrls] = useState();
    const [isDeleted, setIsDeleted] = useState(false);
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
   
    let btnRef = useRef();

    useEffect(() => {
      
    }, []);

    const likePost = () => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        };
        axios
            .put(BACKEND_SERVER_DOMAIN + "/api/post/" + post.id + "/", {}, config)
            .then(function (response) {
                let like = isLiked ? false : true;
                setIsLiked(like);
                if (like) {
                    setLikesCount(likesCount+1);
                } else {
                    setLikesCount(likesCount-1);
                }
                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const commentsToggle = () => {

        if (comments) {
            setShowComments(!showComments);
        } else {
            if (!isLoadingComments) {setIsLoadingComments(true)}
            axios.get(BACKEND_SERVER_DOMAIN + "/postcomment/" + post._id, {headers:{ Authorization: 'Bearer ' +  Token}})
                .then(function (response) {
                    setComments(response.data)
                    console.log("therrr" +  JSON.stringify(response.data))
                     console.log(post._id)
                    if (response.data.length == 0) {
                        setIsLoadingComments(false);
                    } else {
                        setShowComments(true)
                    }
                })
                .catch((err) => {
                    console.log(err.response)
                    setIsLoadingComments(false);
                })
        }
    }


   




    const commentField = useRef();
    const postComment = (parent) => {
        let commentText = commentField.current.value;
        if (commentText) {
            let formData = new FormData();
            formData.append("comment_text", commentText);
            formData.append("comment_parent", parent);

            let config = { headers: {
                Authorization: 'Bearer ' +  Token,
            
            }}

            let data = {
                text: commentText
            }

            axios.post(BACKEND_SERVER_DOMAIN + '/postcomment/'+ post._id , data, config)
                .then(function (response) {
                    // Post has been made successfully
                    if (comments) 
                    {
                        // If we already have comments
                        comments.push(response.data);
                        // React only rerenders if pointer to field is changed so 
                        // we have to make a new array
                        let newArr = [...comments];
                        setComments(newArr);
                    }
                    else {
                        setComments(Array.of(response.data));
                    }
                    commentField.current.value = "";
                    setShowComments(true)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("empty field");
        }
    }

    const deletePost = () => {
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        };
        axios
            .delete(
                BACKEND_SERVER_DOMAIN +
                    "/api/post/" +
                    post.id + "/",
                config
            )
            .then(function (response) {
                if (response.data.action) {
                    setIsDeleted(true);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    function splicedArray(array,index) {
        let nArr = [...array];
        nArr.splice(0,index+1);
        return nArr;
    }

    return (!isDeleted) ? (
        <article className="post card">
            <div className="d-flex userbar">
                
                {(post.avatar == " ") ?
                   <LazyLoadImage
                   loading="lazy"
                   className="rounded-circle"
                   src={profile}
               />
                      
            :
      
            <LazyLoadImage
            loading="lazy"
            className="rounded-circle"
            src={BACKEND_SERVER_DOMAIN + "/" + 'avatar' + "/" + post.avatar}
            // alt={post.person.first_name + "'s avatar"}
        />}
                <div>
                    <h6>
                        <Link to={"/u/"+post.username}>{post.username} </Link>
                    </h6>
                    <span>{timeSince(post.createdIn)}</span>
                </div>
                <div className="more-options">
                    <div className="dropleft">
                        <button
                            className="post-actions"
                            type="button"
                            id={"options"+post._id}
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div
                            className="dropdown-menu"
                            aria-labelledby={"options"+post.id}
                        >
                            <Link className="dropdown-item" to={"/post/"+post._id}>
                                View Post
                            </Link>
                            {(user.id == post.authorId) ? <button className="dropdown-item"
                            onClick={deletePost}>
                                Delete
                            </button> : ""}
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <p className="post-content">{post.desc}</p>
                {(embedUrls) ? (embedUrls.map((url, index) => (
                    <a className="url" href={url.url} key={index} target="_blank">
                        <div>
                            <div className="utitle"><i className="fas fa-external-link-alt"></i> {url.title}</div>
                            {(url.description) ? <div className="udescription">{url.description}</div> : ""}
                            <div className="uurl">{url.url}</div>
                        </div>
                    </a>
                ))) : ""}
            </div>
            {post.photo ? (
                <LazyLoadImage src={BACKEND_SERVER_DOMAIN +  '/' + 'photo' + '/' + post.photo}/>
            ) : (
                ""
            )}
            <div className="d-flex post-actions">
                <button
                    onClick={commentsToggle}>
                    <i className="far fa-comment-alt"></i>{(comments) ? (comments.length == 0) ? "No " : comments.length +" " : ""}Comments
                </button>
                <button
                    ref={btnRef}
                    onClick={likePost}
                    className={
                        isLiked
                            ? "btn btn-light btn-light-accent"
                            : "btn btn-light"
                    }
                >
                    <i className="far fa-thumbs-up"></i>
                    {likesCount > 0 ? likesCount+' ' : ''}Like
                    {likesCount > 1 ? "s" : ""}
                </button>
                <button>
                    <i className="far fa-share-square"></i>Share
                </button>
            </div>
            { (post.likes) ? 
                <div className="likedBy">Liked by&nbsp;
                        {post.likes.persons.slice(0,2).map((person, index)=> (
                            <span key={person.id}>
                                <Link to={"/u/"+person.slug} key={person.id}>
                                    {person.first_name} {person.last_name}
                                </Link>
                                {(post.likes.persons.length > 1 && index==0) ?", ":""}
                            </span>
                        ))} {(post.likes.persons.length > 2) ? " and "+(likesCount-2)+" others": ""}
                </div> : ""
            }
            <div className={(isLoadingComments) ? "slim-loading-bar":""}></div>

{
                console.log(typeof(comments))

}            
            {
                 typeof comments == "object" ?
                    <div className="each-comment parent-comment">
                        {comments.slice().map((comment, index) => (
                            <div key={comment._id}>{(comment) ?
                                    <CommentComponent 
                                        key={comment._id}
                                        comment={comment}
                                        user={user}
                                        allComments={splicedArray(comments,index)}/>
                            : "comment.text"}
                            {(Number(index+1) == Number(comments.length) && isLoadingComments) ? setIsLoadingComments(false) : ''}
                            </div>                       
                        ))}
                    </div>
                : <div></div>
            }
            <div className="post-comment">
                <div className="d-flex">
                    <input type="text" ref={commentField} placeholder="Write your comment..." />
                    <button onClick={() => postComment(0)}>
                        <i className="far fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </article>
    ) : <article className="post card text-center text-muted">Post is removed.</article>;
};

export default TimelinePost;

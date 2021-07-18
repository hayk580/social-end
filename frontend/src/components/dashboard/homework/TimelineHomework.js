import React, { useState, useRef, useEffect } from "react";
import { timeSince } from "../../../utils/timesince";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import CommentComponent from "../homework/Comment";
import axios from "axios";
import { Link } from 'react-router-dom';
import {getMetadata} from 'page-metadata-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const TimelineHomework = ({ user, homework, expanded}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [comments, setComments] = useState();
    const [showComments, setShowComments] = useState(false);
    const [isLoadingComments,setIsLoadingComments] = useState(false);
    const [embedUrls,setEmbedUrls] = useState();
    const [userData, setUserData ] = useState();
    const [postImage, setPostImage] = useState(null);
    const [postImages, setPostImages] = useState();
    const [apiResponse, setAPIResponse] = useState();

    const [isDeleted, setIsDeleted] = useState(false);
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
   
    console.log(jsonToken.user.user.username)
    let btnRef = useRef();
   
    let showBtn = useRef();

    let postPictureBtnRef = useRef();



      useEffect(() => {
     
        
        if (jsonToken.user.user.role == "teacher") 
        {
        if (comments) {
             setShowComments(!showComments);
         } else {
             if (!isLoadingComments) {setIsLoadingComments(true)}
 
             axios.get(BACKEND_SERVER_DOMAIN + "/homeworkcomment/" + homework._id, {headers:{ Authorization: 'Bearer ' +  Token}})
                 .then(function (response) {
                     setComments(response.data)
                     if (response.data.comments.length == 0) {
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
 
 
     else {
         if (comments) {
             setShowComments(!showComments);
         } else {
             if (!isLoadingComments) {setIsLoadingComments(true)}
 
             axios.get(BACKEND_SERVER_DOMAIN + "/homeworkcomment/author/" + jsonToken.user.user._id + '/' +  homework._id,  {headers:{ Authorization: 'Bearer ' +  Token}})
                 .then(function (response) {
                     setComments(response.data)
                     if (response.data.comments.length == 0) {
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


        let config = { headers: {
            'Content-Type': 'application/json',
             Authorization: 'Bearer ' +  Token,   
        }};
               
        axios.get(BACKEND_SERVER_DOMAIN + '/profile/userById/', + homework.authorId,  config)
            .then(function (response) {
                setUserData(response.data)
                console.log(response.data)
            })
            .catch(function (err) {
                console.log(err);
                // dispatch(setHomeworks([]));
            });


    }, []);

    const likeHomework = () => {
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
            .put(BACKEND_SERVER_DOMAIN + "/api/homework/" + homework.id + "/", {}, config)
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
 
}

    const commentField = useRef();
    const homeworkComment = (parent) => {
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
            axios.post(BACKEND_SERVER_DOMAIN + '/homeworkcomment/' + homework._id, data, config)
                .then(function (response) {
                    if (comments) 
                    {
                        comments.push(response.data);
              
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



    const handlePostPicture = ({target}) => {
        if (target.value) {
            setPostImage(target.files[0]);
            setAPIResponse(<span>+&nbsp; {target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]}</span>);
            showBtn.current.classList.add("show-btn");
        }
        
    }
 
    const clickPostPicture = () => {
        postPictureBtnRef.current.click();
    }
    const deleteHomework = () => {
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        };
        axios
            .delete(
                BACKEND_SERVER_DOMAIN +
                    "/api/homework/" +
                    homework.id + "/",
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
if (!userData) {
    
    return 0
}
    return (!isDeleted) ? (
        <article className="post card">
             <h6>
                    </h6>
            <div className="d-flex userbar">
                <LazyLoadImage
                    loading="lazy"
                    className="rounded-circle"
                    src={BACKEND_SERVER_DOMAIN + "/" + 'avatar' + "/" + homework.authorId.avatar}
                />
                {userData._id}

                <div>
                    <h6>
                        <Link to={"/u/"+homework.username}>{homework.authorId.avatar.username} </Link>
                    </h6>
                    <span>{timeSince(homework.createdIn)}</span>
                </div>
                <div className="more-options">
                    <div className="dropleft">
                        <button
                            className="post-actions"
                            type="button"
                            id={"options"+homework._id}
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div
                            className="dropdown-menu"
                            aria-labelledby={"options"+homework.id}
                        >
                            <Link className="dropdown-item" to={"/homework/"+homework._id}>
                                View Homework
                            </Link>
                            {(user.id == homework.authorId) ? <button className="dropdown-item"
                            onClick={deleteHomework}>
                                Delete
                            </button> : ""}
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
            <h5 className="post-content">{homework.title}</h5>

                <p className="post-content">{homework.desc}</p>
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
            {homework.photo ? (
                <LazyLoadImage src={BACKEND_SERVER_DOMAIN +  '/' + 'photo' + '/' + homework.photo}/>
           ) : (
                ""
            )}
            <div className="d-flex post-actions">
           
                 {/* <button
                    onClick={commentsToggle}>
                    <i className="fa fa-hand-lizard-o"></i>{(comments) ? (comments.length == 0) ? "No " : "   " : ""}Տեսնել Պատասխանները
                </button>  */}
         
             {/* <button
                    ref={btnRef}
                    onClick={likeHomework}
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
                </button> */}
            </div>
            { (homework.likes) ? 
                <div className="likedBy">Liked by&nbsp;
                        {homework.likes.persons.slice(0,2).map((person, index)=> (
                            <span key={person.id}>
                                <Link to={"/u/"+person.slug} key={person.id}>
                                    {person.first_name} {person.last_name}
                                </Link>
                                {(homework.likes.persons.length > 1 && index==0) ?", ":""}
                            </span>
                        ))} {(homework.likes.persons.length > 2) ? " and "+(likesCount-2)+" others": ""}
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
                        {(jsonToken.user.user.role === "teacher") ? " "

            :<div className="post-comment">
                
                <div className="d-flex">
                {/* {<img className="rounded-circle avatar" src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + jsonToken.user.user.avatar}/>} */}

                    <input type="text" ref={commentField} placeholder="Ուղարկել Պատասխանը..." />

                    <button onClick={() => homeworkComment(0)}>
                        <i className="far fa-paper-plane"></i>
                        
                    </button>
                    <input type="file" accept="image/*" name="post_image" onChange={handlePostPicture} ref={postPictureBtnRef} className="d-none" />
                    

                </div>
            </div>

}
        </article>
    ) : <article className="homework card text-center text-muted">Homework is removed.</article>;
};

export default TimelineHomework;

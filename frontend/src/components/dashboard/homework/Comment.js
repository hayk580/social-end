import React, { useState, useRef, useEffect } from "react";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { timeSince } from "../../../utils/timesince";
import axios from "axios";
import { Link } from "react-router-dom";
import {getMetadata} from 'page-metadata-parser';

export default function CommentComponent({
    user,
    allComments,
    comment,
    expanded
    
}) {
    const [isLiked, setIsLiked] = useState();
    const [likesCount, setLikesCount] = useState();
    const [comments, setComments] = useState();
    const [isDeleted, setIsDeleted] = useState(false);
    const btnRef = useRef();
    const commentField = useRef();
    const commentBoxDiv = useRef();
    const [embedUrls,setEmbedUrls] = useState();

    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
   




    useEffect(() => {
        if(!isDeleted) {
        
            let urlRegEx = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            const urls = [...comment.text.matchAll(urlRegEx)]
            let links = []
            if (urls) {
                urls.map(async (url, index) => {
                    const domino = require('domino');
                    const response = await fetch(url[0], {
                        mode: 'no-cors' // 'cors' by default
                    });
                    const html = await response.text();
                    const doc = domino.createWindow(html).document;
                    const metadata = getMetadata(doc, url);
                    links.push({"title":metadata.title,
                        "description":metadata.description,
                        "url":url[0]})
                    if (urls.length == index+1) setEmbedUrls(links);
                })
            }
            // if (expanded) {
            //     commentsToggle()
            // }
        }
    }, []);




//     axios.get(BACKEND_SERVER_DOMAIN + "/profile/sl" + comment.authorId, {headers:{ Authorization: 'Bearer ' +  Token}})
//     .then(function (response) {
//         setUserData(response.data)
//         // console.log("therrr" +  JSON.stringify(response.data))
//         //  console.log(homework._id)
//         // if (response.data.length == 0) {
//         //     setIsLoadingComments(false);
//         // } else {
//         //     setShowComments(true)
//         // }
//     })
//     .catch((err) => {
//         console.log(err.response)
//         // setIsLoadingComments(false);
//     })


// console.log("user date" + userdata)




    // useEffect(() => {
    //     setIsLiked(comment.comment_likes.persons && comment.comment_likes.persons.includes(user.id))
    //     setLikesCount(
    //         comment.comment_likes.persons != null
    //             ? comment.comment_likes.persons.length
    //             : 0
    //     );
    //     let subCmts = new Array();
    //     let possibleParents = new Array();
    //     possibleParents.push(comment.id);
    //     allComments.map((cmt) => {
      
    //         if (
    //             cmt.comment_parent != comment.comment_parent &&
    //             cmt.id > comment.id &&
    //             cmt.comment_parent >= comment.id &&
    //             possibleParents.includes(cmt.comment_parent)
    //         ) {
    //             subCmts.push(cmt);
    //             possibleParents.push(cmt.id);
    //         }
    //     });
    //     setComments(subCmts);
    // }, []);
    const likeComment = () => {
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
            .put(
                BACKEND_SERVER_DOMAIN +
                    "/api/" +
                    comment.homework_id +
                    "/comments/" +
                    comment.id +"/",
                {},
                config
            )
            .then(function (response) {
                let like = isLiked ? false : true;
                setIsLiked(like);
                if (like) {
                    setLikesCount(likesCount + 1);
                } else {
                    setLikesCount(likesCount - 1);
                }
                console.log(like);
                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const deleteComment = () => {
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        };
        axios
            .delete(
                BACKEND_SERVER_DOMAIN +
                    "/api/" +
                    comment.homework_id +
                    "/comments/" +
                    comment.id + "/",
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

    const showFieldToHomeworkComment = () => {
        commentBoxDiv.current.classList.toggle("show");
        commentField.current.focus();
    };

    function splicedArray(array, index) {
        let nArr = [...array];
        nArr.splice(0, index + 1);
        return nArr;
    }

    const homeworkComment = (parent) => {
        let commentText = commentField.current.value;
        if (commentText) {
            // let formData = new FormData();
            // formData.append("text", commentText);
            // formData.append("comment_parent", parent);
            let config = {
                headers: {
                    Authorization: 'Bearer ' +  Token,   
                },
            };

            let data = {
                text: commentText
            }
            axios
                .post(
                    BACKEND_SERVER_DOMAIN + "/replycomment/reply/" + parent,
                    data,
                    config
                )
                .then(function (response) {
                    // Post has been made successfully
                    if (comments) {
                        // If we already have comments
                        comments.unshift(response.data);
                        // React only rerenders if pointer to field is changed so
                        // we have to make a new array
                        let newArr = [...comments];
                        setComments(newArr);
                        commentBoxDiv.current.classList.toggle("show");
                    } else {
                        setComments(Array.of(response.data));
                    }
                    commentField.current.value = "";
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("empty field");
        }
    };


    let sendFriendReqBtn = React.useRef();
    const sendFriendReq = (id) => {
        sendFriendReqBtn.current.setAttribute("disabled", "disabled");
        let config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: 'Bearer ' +  Token,   
            },
        };
        axios
            .get(
                BACKEND_SERVER_DOMAIN + "/homeworkcomment/status" + "/" + id,
                config
            )
            .then(function (response) {
                sendFriendReqBtn.current.textContent = "Հաստատված"
            })
            .catch(function (error) {
                console.log(error);
                sendFriendReqBtn.current.removeAttribute("disabled", "disabled");
            });
    }









    return (
        <div className="d-flex comment">
            <img
                className="avatar rounded-circle"
                src={(!isDeleted) ? (BACKEND_SERVER_DOMAIN +  '/avatar/' +  comment.avatar) : ""}
            />
            <div>
                <div className="content">
                    <Link to={"/u/"+comment._id}><h6> 
                        {(!isDeleted) ? ( comment.full_name) : "deleted"}
                    </h6></Link>
                    <p>{ comment.text }</p>
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
                {/* {(!isDeleted) ? (<div><div className="comment-options">
                    <button
                        ref={btnRef}
                        onClick={likeComment}
                        className={
                            isLiked
                                ? "btn btn-light btn-light-accent"
                                : "btn btn-light"
                        }
                    >
                        <i className="far fa-thumbs-up"></i>
                        {likesCount > 0 ? likesCount + " " : ""}Like
                        {likesCount > 1 ? "s" : ""}
                    </button>
                    <button onClick={showFieldToHomeworkComment}>
                        <i className="fas fa-reply"></i> Reply
                    </button>
                    <span className="timesince">
                        {timeSince(comment.created)}
                    </span>
                    {Number(user.id) === Number(comment.person_id) ? (
                        <div className="dropright">
                            <button
                                className="comment-actions"
                                type="button"
                                id={"options"+comment._id}
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby={"options"+comment._id}
                            >
                                <button className="dropdown-item"
                                onClick={deleteComment}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="homework-comment" ref={commentBoxDiv}>
                    <div className="d-flex">
                        <input
                            type="text"
                            ref={commentField}
                            placeholder="Write your comment..."
                        />
                        <button onClick={() => homeworkComment(comment.id)}>
                            <i className="far fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                </div>) : ''}
                {typeof comments == "object" ? (
                    <div className="each-comment">
                        {comments
                            .map((cmt, index) =>
                                cmt.comment_parent == comment.id ? (
                                    <CommentComponent
                                        comment={cmt}
                                        key={cmt.id}
                                        user={user}
                                        allComments={splicedArray(
                                            comments,
                                            index
                                        )}
                                    />
                                ) : (
                                    ""
                                )
                            )}
                    </div>
                ) : (
                    <div></div>
                )} */}
      {(!isDeleted) ? (<div><div className="comment-options">
                    {/* <button
                        ref={btnRef}
                        onClick={likeComment}
                        className={
                            isLiked
                                ? "btn btn-light btn-light-accent"
                                : "btn btn-light"
                        }
                    >
                        <i className="far fa-thumbs-up"></i>
                        {likesCount > 0 ? likesCount + " " : ""}Like
                        {likesCount > 1 ? "s" : ""}
                    </button> */}
                      {  (comment.status == "1")? 
                          <button className="btn btn-sm btn-outline-success" disabled="disabled">
                             Հստատված
                              </button>

// onClick={() => sendFriendReq(profileData._id)} ref={sendFriendReqBtn}
       
                                :
                                (jsonToken.user.user.role == "USER") ?
                   ""
:<button className="btn btn-sm btn-primary confirm-btn" onClick={() => sendFriendReq(comment._id)} ref={sendFriendReqBtn} title="հաստատել տնայան աշխատանքը." >
<i className="fa fa-check" >Հաստատել</i> 
          </button>

                            }
        
                    <button onClick={showFieldToHomeworkComment}>
                        <i className="fas fa-reply"></i> պատասխանել
                    </button>
                    {/* <span className="timesince">
                        {timeSince(comment.created)}
                    </span> */}
                    {jsonToken.user.user._id === comment.person_id ? (
                        <div className="dropright">
                            <button
                                className="comment-actions"
                                type="button"
                                id={"options"+comment._id}
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby={"options"+comment._id}
                            >
                                <button className="dropdown-item"
                                onClick={deleteComment}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="post-comment" ref={commentBoxDiv}>
                    <div className="d-flex">
                        <input
                            type="text"
                            ref={commentField}
                            placeholder="Write your comment..."
                        />
                        <button onClick={() => homeworkComment(comment._id)}>
                            <i className="far fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                </div>) : ''}
                {typeof comments == "object" ? (
                    <div className="each-comment">
                        {comments
                            .map((cmt, index) =>
                                cmt.comment_parent == comment.id ? (
                                    <CommentComponent
                                        comment={cmt}
                                        key={cmt.id}
                                        user={user}
                                        allComments={splicedArray(
                                            comments,
                                            index
                                        )}
                                    />
                                ) : (
                                    ""
                                )
                            )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

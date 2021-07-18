import React from 'react'
import { Helmet } from "react-helmet";
import { useParams, Link } from 'react-router-dom';
import Navbar from "../Navbar";
import LeftSidebar from "../LeftSidebar";
import axios from 'axios';
import { BACKEND_SERVER_DOMAIN } from '../../../settings'
import { useSelector } from 'react-redux';
import Posts from "../post/Posts";
import ProfilePost from './ProfilePosts';
import { timeSince } from "../../../utils/timesince";
import InputField from '../../../utils/InputField'
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"
import StudentListItem from './SubListItem'
export default function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {slug} = useParams();
    const user = useSelector((state) => state.user);
    const [profileData, setProfileData] = React.useState();
    const [isLoadingPost, setIsLoadingPost] = React.useState(true)

    const [friendData, setFriendData] = React.useState();
    const [avatar, setAvatar] = React.useState();
    const [cover, setCover] = React.useState();
    const [phone, setPhone] = React.useState("");
    const [birthdate, setBirthdate] = React.useState("");
    const [work, setWork] = React.useState("")
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const [posts, setPosts] = React.useState();
    const [sub, Setsub] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true)
    let fakeCoverPictureBtnRef = React.useRef();
    let realCoverPictureBtnRef = React.useRef();
    let fakeProfilePictureBtnRef = React.useRef();
    let realProfilePictureBtnRef = React.useRef();
    let userSub = jsonToken.user.user._id






    const getData = () => {
        let config = { headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' +  Token,   
        }};
        axios.get(BACKEND_SERVER_DOMAIN + '/profile/userById/' + slug, config)
            .then(function (response) {
                console.log("ardarutyun" + response.data.username)

                setProfileData(response.data);
                // setAvatar(response.data.avatar)
                // // setCover(response.data.user.cover_image)
                // // setPhone(response.data.user.phone)
                // // setBirthdate(response.data.user.birthdate)
                // // setWork(response.data.user.work)
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    React.useEffect(() => {
    
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' +  Token,   
            },
        };
    
        axios.get(BACKEND_SERVER_DOMAIN + '/profile/set/' + slug , config)
        .then(function (response) {
            Setsub(response.data);
            setIsLoading(false)
        })
        .catch(function (err) {
            console.log(err);
            setIsLoading(false)
        });

        
        axios
        .get(BACKEND_SERVER_DOMAIN + "/getposts/postByUser/" + slug, config)
        .then((res) => {
            setPosts(res.data)
            setIsLoadingPost(false)
            console.log("cobraa" + JSON.stringify(res.data))
        })
        .catch(function(error) {
            console.log(error)
            setIsLoadingPost(false)
        });
        
        window.scrollTo(0, 0);
        getData();
    },[slug])




  



    // if(getData()){

    //   let profile_id = profileData._id;
  
    //     let config = { headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer ' +  Token,   
    //     }};
    //     axios.get(BACKEND_SERVER_DOMAIN + '/profile/sl'  + profile_id, config)
    //         .then(function (response) {
    //             console.log("ssssqqq" + response.data.username)

    //             setFriendData(response.data);
   
    //         })

    //         .catch(function (err) {
    //             console.log(err);
    //         });
    //     }   


    // axios
    // .get(BACKEND_SERVER_DOMAIN + "/post/groupPosts/" + group_id, config)
    // .then((res) => {
    //     setPosts(res.data)
    //     setIsLoadingPost(false)
    //     console.log("cobraa" + JSON.stringify(res.data))
    // })
    // .catch(function(error) {
    //     console.log(error)
    //     setIsLoadingPost(false)
    // });

    const handleAvatar = ({ target }) => {
        if (target.value) {
            fakeProfilePictureBtnRef.current.textContent = target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            setAvatar(target.files[0]);
        }
    };

    const handleCoverPicture = ({ target }) => {
        if (target.value) {
            fakeCoverPictureBtnRef.current.textContent = target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            setCover(target.files[0]);
        }
    };
    
    const handlePhone = ({ target }) => {
        setPhone(target.value);
    };
    
    const handleWork = ({ target }) => {
        setWork(target.value);
    };
    
    const handleBirthdate = ({ target }) => {
        setBirthdate(target.value);
    };

    const clickChooseCoverPicture = () => {
        realCoverPictureBtnRef.current.click()
    }

    const clickChoosePicture = () => {
        realProfilePictureBtnRef.current.click()
    }

    let editProfileBtnRef = React.useRef()
    const editProfile = () => {

        editProfileBtnRef.current.textContent = "Saving..."
        editProfileBtnRef.current.setAttribute("disabled", "disabled");

        var formData = new FormData();
        formData.append("file", avatar);

        var CoverData = new FormData();
        CoverData.append("file", cover);
        // formData.append("work", work);
        // formData.append("hometown", home);
        // formData.append("tagline", tagline);
        // formData.append("cover", cover);
        
        let configs = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' +  Token,   
            },
        };


        let data = {
            phone: phone,
            work: work,
            birthdate: birthdate,

        }
        axios
            .post(
                BACKEND_SERVER_DOMAIN + "/avatar",
                formData,
                configs
            )
            .then(function (response) {
                console.log(response.data)
                //  dispatch(setUser(response.data));
                editProfileBtnRef.current.textContent = "Done!"
                editProfileBtnRef.current.removeAttribute("class","btn-primary")
                editProfileBtnRef.current.setAttribute("class","btn btn-success")
                
                history.go(0)
            })
            .catch(function (error) {
                console.log(error)
                editProfileBtnRef.current.textContent = "Try Again"
                editProfileBtnRef.current.setAttribute("class","btn btn-danger")
                editProfileBtnRef.current.removeAttribute("disabled");
            });



            





        }


    //         axios
    //         .put(
    //             BACKEND_SERVER_DOMAIN + "/profile",
    //             data,
    //             config
    //         )
    //         .then(function (response) {
    //             console.log(response.data)
    //             // dispatch(setUser(response.data));
    //             editProfileBtnRef.current.textContent = "Done!"
    //             editProfileBtnRef.current.removeAttribute("class","btn-primary")
    //             editProfileBtnRef.current.setAttribute("class","btn btn-success")
    //             // history.go(0)
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //             // editProfileBtnRef.current.textContent = "Try Again"
    //             // editProfileBtnRef.current.setAttribute("class","btn btn-danger")
    //             // editProfileBtnRef.current.removeAttribute("disabled");
    //         });
    // }

    const editProfileData = () => {

        editProfileBtnRef.current.textContent = "Saving..."
        editProfileBtnRef.current.setAttribute("disabled", "disabled");

        var formData = new FormData();
        // formData.append("file", avatar);
        // // formData.append("work", work);
        // // formData.append("hometown", home);
        // // formData.append("tagline", tagline);
        // // formData.append("cover", cover);
        
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' +  Token,   
            },
        };

        var CoverData = new FormData();
        CoverData.append("file", cover);

        let configs = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' +  Token,   
            },
        };


        let data = {
            phone: phone,
            occupation: work,
            birthdata: birthdate,

        }

            axios
            .put(
                BACKEND_SERVER_DOMAIN + "/profile",
              data,
                config
            )
            .then(function (response) {
                console.log(response.data)
                // dispatch(setUser(response.data));
                editProfileBtnRef.current.textContent = "Done!"
                editProfileBtnRef.current.removeAttribute("class","btn-primary")
                editProfileBtnRef.current.setAttribute("class","btn btn-success")
                history.go(0)
                console.log(data)
            })
            .catch(function (error) {
                console.log(error)
                editProfileBtnRef.current.textContent = "Try Again"
                editProfileBtnRef.current.setAttribute("class","btn btn-danger")
                editProfileBtnRef.current.removeAttribute("disabled");
            });





            axios
            .post(
                BACKEND_SERVER_DOMAIN + "/cover",
                CoverData,
                configs
            )
            .then(function (response) {
                console.log(response.data)
                //  dispatch(setUser(response.data));
                editProfileBtnRef.current.textContent = "Done!"
                editProfileBtnRef.current.removeAttribute("class","btn-primary")
                editProfileBtnRef.current.setAttribute("class","btn btn-success")
                
                history.go(0)
            })
            .catch(function (error) {
                console.log(error)
                editProfileBtnRef.current.textContent = "Try Again"
                editProfileBtnRef.current.setAttribute("class","btn btn-danger")
                editProfileBtnRef.current.removeAttribute("disabled");
            });

    }

    let sendFriendReqBtn = React.useRef();
    const sendFriendReq = (id) => {
        sendFriendReqBtn.current.setAttribute("disabled", "disabled");
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' +  Token,   
            },
        };
        console.log("curr" + id)
        axios
            .get(
                BACKEND_SERVER_DOMAIN + "/sub" + "/subscribe" + "/" + id,
                config
            )
            .then(function (response) {
                sendFriendReqBtn.current.textContent = "Request Sent"
            })
            .catch(function (error) {
                console.log(error);
                sendFriendReqBtn.current.removeAttribute("disabled", "disabled");
            });
    }

    return (
        <section className="profile-page">
            <Helmet>
                <title>{(profileData) ? profileData.full_name + " " +profileData.full_name : "User"} on socialnetwork</title>
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={(profileData) ? (profileData._id) ? 3 : "" : ""}/>
                    </div>
                    <div className="col-lg-9 col-12 timeline">
                        {
                            (profileData) ? 
                                (<div>
                                    <div className="card profile-user">
                                        <img className="cover-image" src={BACKEND_SERVER_DOMAIN + '/cover/' +  profileData.cover}/>
                                        {/* <img className="cover-image" src={profile}/> */}
                                       
                                       
                                        {(profileData._id == jsonToken.user.user._id ) ?<button className="edit"  data-toggle="modal" data-target="#exampleModal"><i className="fas fa-pen"></i></button>:""}
                                        <div className="d-flex">
                                            {
                                                (!profileData.avatar) ? <img className="rounded-circle avatar" src={profile} />
                                                
                                            :
                                            (profileData._id == jsonToken.user.user._id) ?
                                            <img className="rounded-circle avatar" src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + profileData.avatar} alt={profileData.full_name+"'s avatar"}     data-toggle="modal" data-target="#exampleModal2" />
                                             :
                                             <img className="rounded-circle avatar" src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + profileData.avatar} alt={profileData.full_name+"'s avatar"} />

                                            }
                                            {/* <img className="rounded-circle avatar" src={profile} /> */}

                                            <div className="user-details">
                                                <h6>{profileData.username}</h6>
                                                <p>{profileData.full_name}</p>
                                                {(profileData.country)? <p><i className="fas fa-map-marker-alt"></i> {profileData.country}</p> :""}
                                       
                                      
                                            {  
                                            (jsonToken.user.user._id != slug) ? 
                                            (profileData.subscribers.includes(userSub))? 
                                                
                                                                <button className="btn btn-sm btn-outline-success" disabled="disabled">
                                                                <i className="fas fa-check"></i> Բաժանորդագրված
                                                            </button>
                                                            
                                                         :<button className="btn btn-sm btn-primary" onClick={() => sendFriendReq(profileData._id)} ref={sendFriendReqBtn}>
                                                         <i className="fas fa-user-plus"></i> Բաժանորդագրվել  

                                                     </button>
                                          :""
                                            }
                                                   {/* <button className="btn btn-sm btn-outline-primary" disabled="disabled">
                                                            <i className="fas fa-user-clock"></i> Friend Request Pending
                                                        </button>
                                             
                                                    <button className="btn btn-sm btn-outline-success" disabled="disabled">
                                                        <i className="fas fa-check"></i> Friends
                                                    </button>  */}
                                            </div> 
                                        </div>
                                        <ul>
                                            {/* {(profileData.user)? <li><i className="fas fa-briefcase"></i> {profileData.user.work}</li> :""} */}
                                            <li><i className="fas fa-birthday-cake"></i>  Ծննդյան ամսաթիվ  {profileData.birthdate} </li>
                                            <li><i className="far fa-calendar-alt"></i> Զբաղվածություն     {profileData.occupation} </li>
                                            <li><i className="far fa-calendar-alt"></i> Հեռախոսահամար   {profileData.phone} </li>
                                         
                                        </ul>   
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-8 col-md-12">
                                            <h6 className="ml-3 mt-1">Posts</h6>
                                            {(!isLoadingPost) ? (posts) ? (
                            
                            <section className="timeline-posts">
                            {posts
                                        .slice()
                                        .reverse()
                                        .map((posts, index) => (
                                          
                                                <ProfilePost posts={posts} />
                                        ))}
                                                  </section>
                            ) : (
                                <div class="sorry">
                                    Add some students and they will show up here!
                                </div>
                            ) : ("")}




                                            {/* <Posts key={1} token={user.token} userposts={profileData.posts.slice().reverse()} /> */}
                                        </div>
                                        <div className="col-lg-4 col-md-12 rightsidebar">
                                            <h6 className="ml-3 mt-1">Friends <span>{(profileData.subscriptions.length) ? "("+profileData.subscriptions.length+")": ""}</span></h6> 
                                            <div className="card">
                                            {(!isLoading) ? (sub) ? (
                            
                            <div className="d-flex user">
                                                                <div className="friends-list">

                                {sub
                                    .slice()
                                    .reverse()
                                    .map((student, index) => (
                                      
                                            <StudentListItem student={student} />
                                    ))}
                            
                            </div>
                            </div>
                        ) : (
                            <div class="sorry">
                                Add some students and they will show up here!
                            </div>
                        ) : ("")}
                                            </div>
                                            <h6 className="ml-3">Recent Activity</h6>
                                            <div className="card">
                                                {(profileData.comments.length) ? 
                                                    profileData.comments.map((comment) => (
                                                        <div className="recent-activity" key={comment.id}>
                                                            <div className="what">posted comment on a <Link to={"/post/"+comment.post_id}>post</Link></div>
                                                            <div>
                                                                <span className="content">{comment.comment_text}</span>
                                                                <span className="when">- {timeSince(comment.created)}</span>
                                                            </div>
                                                        </div>
                                                    )) : 
                                                    <div className="sorry-sm">{profileData.full_name} has not commented on any posts.</div>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-body">
                                            <h5 className="mt-2 mb-2">Edit Profile</h5>
                                     
                                            <label className="form-label">Cover Image&nbsp; <i className="far fa-file-image "></i></label>
                                            <button className="choose-avatar form-control" ref={fakeCoverPictureBtnRef} onClick={clickChooseCoverPicture}>
                                                choose cover image
                                            </button>
                                            <input
                                                className="d-none"
                                                type="file"
                                                name="cover"
                                                accept="image/*"
                                                ref={realCoverPictureBtnRef}
                                                onChange={handleCoverPicture}
                                            />
                                            <InputField
                                                type="text"
                                                name="phone"
                                                label="Հեռախոսահամար"
                                                onChange={handlePhone}
                                                value={profileData.phone}
                                                />
                                            <InputField
                                                type="text"
                                                name="phone"
                                                label="Հեռախոսահամար"
                                                onChange={handlePhone}
                                                value={profileData.phone}
                                                />
                                            <InputField
                                                type="text"
                                                name="work"
                                                label="Զբաղվածություն"
                                                onChange={profileData.occupation}
                                                value={work}
                                                />
                                            <InputField
                                                type="date"
                                                name="birthdate"
                                                label="Ծննդյան օր"
                                                onChange={handleBirthdate}
                                                value={profileData.birthdata}
                                                />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            {/* <button type="button" className="btn btn-primary" ref={editProfileBtnRef} onClick={editProfile}>Save changes</button> */}
                                            <button type="button" className="btn btn-primary" ref={editProfileBtnRef} onClick={editProfileData}>Save changes2</button>

                                        </div>
                                        </div>
                                    </div>
                                    </div>




                                    <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-body">
                                            <h5 className="mt-2 mb-2">Edit Profile</h5>
                                            <label className="form-label">Profile Picture&nbsp; <i className="far fa-file-image "></i></label>
                                            <button className="choose-avatar form-control" ref={fakeProfilePictureBtnRef} onClick={clickChoosePicture}>
                                                choose profile picture
                                            </button>
                                            <input
                                                className="d-none"
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                ref={realProfilePictureBtnRef}
                                                onChange={handleAvatar}
                                            />
                                            {/* <label className="form-label">Cover Image&nbsp; <i className="far fa-file-image "></i></label>
                                            <button className="choose-avatar form-control" ref={fakeCoverPictureBtnRef} onClick={clickChooseCoverPicture}>
                                                choose cover image
                                            </button> */}
                                         
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" ref={editProfileBtnRef} onClick={editProfile}>Save changes</button>
                                            {/* <button type="button" className="btn btn-primary" ref={editProfileBtnRef} onClick={editProfileData}>Save changes2</button> */}

                                        </div>
                                        </div>
                                    </div>
                                    </div>




                                </div>) :
                                <div className="slim-loading-bar"></div>
                        }
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
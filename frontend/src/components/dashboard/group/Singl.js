import React from 'react'
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar";
import LeftSidebar from "../LeftSidebar";
import { useParams, Link } from "react-router-dom";
import profile from "../../../assets/images/profile.jpg"
import GroupPost from './GroupsPost'
import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';
import StudentListItem from './StudentsListItem';
import HomeworkListItem from './HomeworksListItem';
import StudentListInvite from './StudentsListInvite';
import InputField from '../../../utils/InputField'
import { useHistory } from "react-router-dom";
import CreateHomework from "../homework/CreateHomework";
import { addHomework } from '../../../redux/actions';
import CreateGroupPost from './CreateGroupPost'
import TimelinePost from '../post/TimelinePost';
export default function GroupSingle({group, student}) {
    const history = useHistory();

    const [students, setFriends] = React.useState();
    const [homeworks, setHomeworks] = React.useState();

    const [notstudents, setNotStudents] = React.useState();
    const dispatch = useDispatch();

    const [posts, setPosts] = React.useState();
    const [studnetId, setStudentId] = React.useState(); 
    const [isLoading, setIsLoading] = React.useState(true)
    const [isLoadingPost, setIsLoadingPost] = React.useState(true)
    const [isLoadingStudent, setIsLoadingStudent] = React.useState(true)
    const [isLoadingHomerworks, setIsLoadingHomeworks] = React.useState(true)
    const setToekn = localStorage.getItem('state')
    const[homeworkPress, setHomeworkPress] = React.useState();
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const {group_id} = useParams();


    const newHomework = (homework) => {
        dispatch(addHomework(homework));
    }
    const handleStudent = ({ target }) => {
        setStudentId(target.value);

    };
   
        let config = {
            headers: {
                Authorization: 'Bearer ' +  Token,   
            },
        };

        React.useEffect(() => {
            window.scrollTo(0, 0);        
        axios
            .get(BACKEND_SERVER_DOMAIN + "/profile/group/" + group_id, config)
            .then((res) => {
                setFriends(res.data)
                setIsLoading(false)
            })
            .catch(function(error) {
                console.log(error)
                setIsLoading(false)
            });


            axios
            .get(BACKEND_SERVER_DOMAIN + "/post/groupPosts/" + group_id, config)
            .then((res) => {
                setPosts(res.data)
                setIsLoadingPost(false)
                console.log("cobraa" + JSON.stringify(res.data))
            })
            .catch(function(error) {
                console.log(error)
                setIsLoadingPost(false)
            });


            axios
            .get(BACKEND_SERVER_DOMAIN + "/profile/NotIngroup/" + group_id, config)
            .then((res) => {
                setNotStudents(res.data)
                 console.log("rabochi " + res.data)
                 setIsLoadingStudent(false)
               
            })
            .catch(function(error) {
                console.log(error)
                setIsLoadingStudent(false)
               
            });


       
    
            axios.get(BACKEND_SERVER_DOMAIN + '/gethomeworks/all/', config)
                .then(function (response) {
                    setHomeworks(response.data)
                    setIsLoadingHomeworks(false)
                 
                })
                .catch(function (err) {
                    console.log(err);
                    setIsLoadingHomeworks(false)

                 
                });
  
        },[])

  

    
if(!group)
{
    return 1
}


const CreateHomeworkBtn = () => {

    setHomeworkPress("true")

}


const InvateStudent = ()  => {
 
     
    let config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' +  Token,   
        },
    };

       let data =
       {
            
        group_name: group.title
       }


    axios
    .post(BACKEND_SERVER_DOMAIN + "/group/invite/" +  studnetId + "/" + group_id, data,  config)
    .then((res) => {
        history.go(0)       
    })
    .catch(function(error) {
        console.log(error)
       
    });

}

return (
    <section className="profile-page">
            <Helmet>
                {/* <title>{(profileData) ? profileData.full_name + " " +profileData.full_name : "User"} on socialnetwork</title> */}
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        {/* <LeftSidebar active={(groupData) ? (profileData._id) ? 3 : "" : ""}/> */}
                        <LeftSidebar />

                    </div>
                    <div className="col-lg-9 col-12 timeline">
                      
                                <div>
                                    <div className="card profile-user">
                                     
                                    {
                                          (jsonToken.user.user.role === 'teacher')?
                                        <button className="edit3" onClick={CreateHomeworkBtn} >Հանձնարարել Տնային աշխատանք խմբին</button>
                                        :""
                                        }
                                       
                                       
                                       {/* <img className="cover-image" src={BACKEND_SERVER_DOMAIN + ((profileData.user.cover_image) ? profileData.user.cover_image : "/static/images/placeholder_cover.jpg")}/> */}
                                        <img className="cover-image" src={profile}/>

                                        <div className="d-flex">
                                          
                                               {/* <img className="rounded-circle avatar" src={profile} /> */}
                                                
                                       
                                            {/* <img className="rounded-circle avatar" src={profile} /> */}

                                            <div className="user-details">
                                                <h5>{group.title}</h5>
                                                <p>{group.desc}</p>
              
                                            </div> 
                                        </div>
                                        
                                        <ul>
                                          
                       
                                        </ul>   
                                    </div>
                                    
                                    <div className="row">
                                        
                                    <div className="col-lg-8 col-md-12 timeline">
                                            {/* <h6 className="ml-3 mt-1">Posts</h6> */}
                
                                     
                                            {(homeworkPress == "true") ?
                                            <CreateHomework  />
                                            :    <CreateGroupPost />

}
 

                                            {(!isLoadingPost) ? (posts) ? (
                            
                            <section className="timeline-posts">
                            {posts
                                        .slice()
                                        .reverse()
                                        .map((posts, index) => (
                                          
                                                <TimelinePost post={posts} />
                                        ))}
                                                  </section>
                            ) : (
                                <div class="sorry">
                                    Add some students and they will show up here!
                                </div>
                            ) : ("")}





                                            {/* <GroupPosts key={1} token={user.token} userposts={profileData.posts.slice().reverse()} /> */}
                   



                                        </div>
                                        
                                        <div className="col-lg-4 col-md-12 rightsidebar">
                                            <h6 className="ml-3 mt-1">Ուսանողներ <span></span></h6>

                                            <div class="card ">
                                          
                            {(!isLoading) ? (students) ? (
                            
                                <div className="d-flex user">
                                                                    <div className="friends-list">

                                    {students
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
                              <div className="card profile-user">

{<button className="edit2"  data-toggle="modal" data-target="#exampleModal"><i className="fa fa-plus"> Ավելացնել Ուսանող</i></button>}
</div>     
                        </div>


                        <h6 className="ml-3 mt-1">Տնային աշխատանքներ<span></span></h6>
                        <div class="card ">
                                          
                                          {(!isLoadingHomerworks) ? (homeworks) ? (
                                          
                                              <div className="d-flex user">
                                                                                  <div className="friends-list">
              
                                                  {homeworks
                                                      .slice()
                                                      .reverse()
                                                      .map((homework, index) => (
                                                        
                                                              <HomeworkListItem homework={homework} />
                                                      ))}
                                              
                                              </div>
                                              </div>
                                          ) : (
                                              <div class="sorry">
                                                  Add some students and they will show up here!
                                              </div>
                                          ) : ("")}
                                            {/* <div className="card profile-user">
              
              {<button className="edit2"  data-toggle="modal" data-target="#exampleModal"><i className="fa fa-plus"> Ավելացնել Ուսանող</i></button>}
              </div>      */}
                                      </div>

                                        </div>




                                        
                                    </div>

                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-body">
                                            <h5 className="mt-2 mb-2">Ավելացնել Ուսանող</h5>
                                           
                                             <select className="form-control_homework"  onChange={handleStudent}  style={{background:'black'}}>

                                             
                                             {(!isLoadingStudent) ? (notstudents) ? 
                            
                                notstudents
                                    .slice()
                                    .reverse()
                                    .map((notstudent, index) => (
                                      
                                            <StudentListInvite student={notstudent} />
                                    ))
                         : (
                            <div class="sorry">
                                Add some students and they will show up here!
                            </div>
                        ) : ("Բոլոր ուսանողներ արդեն գրանցված են տվյալ խմբում")}
                           
                                
                                             </select>
                                        
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={InvateStudent}>Ավելացնել</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                                {/* <div className="slim-loading-bar"></div> */}
                       
                        
                    </div>
                </div>
            </div>
        </section>

);










    // return (
    //     <div className="studentlistitem d-flex">
    //         <div className="avatar">
    //         {/* {group.avatar ? (
    //             <img src={BACKEND_SERVER_DOMAIN + '/'  + 'avatar' + '/' + group.avatar} className="rounded" />
    //         ) : (
    //             <img src={profile} className="rounded" />
    //         )} */}
    //         </div>
    //         <div>             
    //         <hr />

    //             <h4>{group.title}</h4>
    //             <hr />
    //             <p>{group.desc}</p>
    //             <hr style={{color: "green"}} />

    //             <b>Թեմատիկ Գրականություն</b>
    //             <p>{group.literature}</p>
    //             <hr style={{color: "green"}} />

    //             <b>օգտակար հղումներ</b>
    //             <p>{group.links}</p>
    //             <hr style={{color: "green"}} />

    //             <b>Դասի օրը,  ժամը</b>
    //             <p>{group.hourly_schedule}</p> 
    //         </div>
    //     </div>
    // );
}
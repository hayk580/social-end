import React, {useState, useRef} from 'react';
import axios from 'axios';
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { useParams, Link, useHistory } from 'react-router-dom';
import profile from "../../../assets/images/profile.jpg"


export default function CreateHomework({user, newHomework}) {
    const [postText, setPostText] = useState("");
    const [postTitile, setPostTitile] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [postDeadline, setPostDeadline] =useState("");
    const [postImages, setPostImages] = useState();
    const [apiResponse, setAPIResponse] = useState();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const [profileData, setProfileData] = useState();
    const {slug} = useParams();
    const history = useHistory();

    let btnRef = useRef();
    let postPictureBtnRef = useRef();
    let showBtn = useRef();
    let textAreaRef = useRef();


        let config = { headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' +  Token,   
        }};
        axios.get(BACKEND_SERVER_DOMAIN + '/profile/my/', config)
            .then(function (response) {

                setProfileData(response.data);

            })
            .catch(function (err) {
                console.log(err);
            });

    const handlePostText = ({ target}) => {
        setPostText(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!postImage) {
                showBtn.current.classList.remove("show-btn");
            }
        }
    };

    const handlePostTitle = ({ target}) => {
        setPostTitile(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!postImage) {
                showBtn.current.classList.remove("show-btn");
            }
        }
    }


    const handlePostDeadline = ({ target}) => {
        setPostDeadline(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!postImage) {
                showBtn.current.classList.remove("show-btn");
            }
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
    
    const clickMakeHomework = () => {
        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
        }
        if (postText && postText. length>0) {
            let formData = new FormData();
            formData.append("file", postImage);
           
            console.log("maybe " + postImages)

            const file = {
                file: postImage
                
            }

            let config = { headers: {
              
                Authorization: 'Bearer ' +  Token,   
            }}

            let configImage = { headers: {
              
                Authorization: 'Bearer ' +  Token,   
                'Content-Type': 'multipart/form-data'
            }}

            if(postImage != undefined)
{
            axios.post(BACKEND_SERVER_DOMAIN + '/photos', formData, configImage)
            .then(function(response){
                setPostImages(response.data)
                let img = response.data

                const posts = {
                    title: postTitile,
                    desc: postText,
                     photo: img,
                }
            axios.post(BACKEND_SERVER_DOMAIN + '/homework/create',posts, config)
            .then(function (response) {

                setPostText("");
                setPostTitile("");
                textAreaRef.current.style.height = 'auto'
                setPostImage(null);
                // newHomework({...response.data});s
                history.go(0)
                setAPIResponse("");
                showBtn.current.classList.remove("show-btn");
                })
            .catch(function (error) {
                setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Unable to post. Post text pooo required!</span>);
                if(btnRef.current){
                    btnRef.current.removeAttribute("disabled");
                }
            });
            })

        }
else 
{
    const posts = {
        title: postTitile,
        desc: postText,
        deadline: postDeadline,
    }
    axios.post(BACKEND_SERVER_DOMAIN + '/homework/create',posts, config)
    .then(function (response) {

        setPostText("");
        setPostTitile("");

        textAreaRef.current.style.height = 'auto'
        setPostImage(null);
        // newHomework({...response.data});s
        history.go(0)
        setAPIResponse("");
        showBtn.current.classList.remove("show-btn");
        })
    .catch(function (error) {
        setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Unable S post. Post text is required!</span>);
        if(btnRef.current){
            btnRef.current.removeAttribute("disabled");
        }
    });
}

}
        
        else {
            setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Post text is required!</span>);
        }
       console.log("ssss+ " + profileData)
    }
    return(

         (jsonToken.user.user.role == "teacher") ?
      
        <section className="create-post">
            <h6>Ստեղծել Տնային Աշխատանք</h6>
            <div className="col-lg-5 col-md-12 col-sm-12">
                
                               <label>Վերնագիր</label>
                               <input className="form-control_homework" type="text" placeholder="Վերնագիր" onChange={handlePostTitle} name="title"/>
                               <label>Վերջնաժամկետ</label>
                               <input className="form-control_homework" type="date" placeholder="Վերնագիր" onChange={handlePostDeadline}/>
   
                           
                               <span>
                               </span>
                      
                   </div>
            <div className="d-flex">

                {/* <img className="rounded-circle"  src={profile} alt="profile-picture"/> */}
                {/* {<img className="rounded-circle avatar" src={BACKEND_SERVER_DOMAIN + '/' + profileData.username + '/' + 'avatar' + '/' + profileData.avatar}/>} */}
                 
                <textarea ref={textAreaRef} placeholder="Ընդհանուր թեման" rows="1" onChange={handlePostText} name="desc" ></textarea>
               
                <button onClick={clickPostPicture}><i className="far fa-file-image"></i></button>
            </div>
            <div className="submit-btn" ref={showBtn}>
                <button className="btn btn-primary btn-sm" type="submit" ref={btnRef} onClick={clickMakeHomework}>Create Post</button> {apiResponse}
            </div>
            <input type="file" accept="image/*" name="post_image" onChange={handlePostPicture} ref={postPictureBtnRef} className="d-none" />

        </section>
        : ""
       
        );
}


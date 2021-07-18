import React, {useState, useRef} from 'react';
import axios from 'axios';
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { useParams, Link } from 'react-router-dom';


export default function CreateGroup({user, newGroup}) {
    const [groupText, setGroupText] = useState("");
    const [groupTitile, setGroupTitile] = useState("");
    const [groupImage, setGroupImage] = useState(null);
    const [groupImages, setGroupImages] = useState();
    const [apiResponse, setAPIResponse] = useState();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const [profileData, setProfileData] = useState();
    const {slug} = useParams();

    let btnRef = useRef();
    let groupPictureBtnRef = useRef();
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

    const handleGroupText = ({ target }) => {
        setGroupText(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!groupImage) {
                showBtn.current.classList.remove("show-btn");
            }
        }
    };

    const handleTitleText = ({ target }) => {
        setGroupTitile(target.value)
    }
    const handleGroupPicture = ({target}) => {
        if (target.value) {
            setGroupImage(target.files[0]);
            setAPIResponse(<span>+&nbsp; {target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]}</span>);
            showBtn.current.classList.add("show-btn");
        }
        
    }
 
    const clickGroupPicture = () => {
        groupPictureBtnRef.current.click();
    }
    const clickMakeGroup = () => {
        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
        }
        if (groupText && groupText. length>0) {
            let formData = new FormData();
            formData.append("file", groupImage);
           
            console.log("maybe " + groupImages)

            const file = {
                file: groupImage
                
            }

            let config = { headers: {
              
                Authorization: 'Bearer ' +  Token,   
            }}

            let configImage = { headers: {
              
                Authorization: 'Bearer ' +  Token,   
                'Content-Type': 'multipart/form-data'
            }}

            if(groupImage != undefined)
{
            axios.post(BACKEND_SERVER_DOMAIN + '/photos', formData, configImage)
            .then(function(response){
                setGroupImages(response.data)
                let img = response.data

                const groups = {
                    title: groupTitile,
                    desc: groupText,
                     photo: img,
                }
            axios.post(BACKEND_SERVER_DOMAIN + '/group/create',groups, config)
            .then(function (response) {

                setGroupText("");
                setGroupTitile("");
                textAreaRef.current.style.height = 'auto'
                setGroupImage(null);
                newGroup({...response.data,"person":user});
                setAPIResponse("");
                showBtn.current.classList.remove("show-btn");
                })
            .catch(function (error) {
                setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Unable to group. Group text pooo required!</span>);
                if(btnRef.current){
                    btnRef.current.removeAttribute("disabled");
                }
            });
            })

        }
else 
{
    const groups = {
        title: groupTitile,
        desc: groupText,
    }
    axios.post(BACKEND_SERVER_DOMAIN + '/course/create',groups, config)
    .then(function (response) {

        setGroupText("");
        setGroupTitile("");

        textAreaRef.current.style.height = 'auto'
        setGroupImage(null);
        newGroup({...response.data,"person":user});
        setAPIResponse("");
        showBtn.current.classList.remove("show-btn");
        })
    .catch(function (error) {
        setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Unable to group. Group text is required!</span>);
        if(btnRef.current){
            btnRef.current.removeAttribute("disabled");
        }
        console.log(error)
    });
}

}
        
        else {
            setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Group text is required!</span>);
        }
    }
    return(
        <section className="create-post">
            <h6>Ավելացնել նոր </h6>
            <div className="col-lg-5 col-md-12 col-sm-12">
                
                               <label>Խմբի անունը</label>
                               <input className="form-control_homework" type="text" placeholder="Խմբի անունը" onChange={handleTitleText} name="title" value={groupTitile}/>
                            
                           
                               <span>
                               </span>
                   </div>
            <div className="d-flex">
                {/* <img className="rounded-circle"  src={profile} alt="profile-picture"/> */}
                {/* {<img className="rounded-circle avatar" src={BACKEND_SERVER_DOMAIN + '/' + profileData.username + '/' + 'avatar' + '/' + profileData.avatar}/>} */}
                 
                <textarea ref={textAreaRef} placeholder="Նկարագրություն" rows="1" onChange={handleGroupText} name="desc" value={groupText} ></textarea>
               
                <button onClick={clickGroupPicture}><i className="far fa-file-image"></i></button>
            </div>
            <div className="submit-btn" ref={showBtn}>
                <button className="btn btn-primary btn-sm" type="submit" ref={btnRef} onClick={clickMakeGroup}>Create Group</button> {apiResponse}
            </div>
            <input type="file" accept="image/*" name="group_image" onChange={handleGroupPicture} ref={groupPictureBtnRef} className="d-none" />
        </section>
        );
}


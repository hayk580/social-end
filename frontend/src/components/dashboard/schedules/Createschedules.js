import React, {useState, useRef} from 'react';
import axios from 'axios';
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { useParams, Link } from 'react-router-dom';


export default function CreateSchedules({user, newSchedules}) {
    const [schedulesText, setSchedulesText] = useState("");
    const [schedulesTitile, setSchedulesTitile] = useState("");
    
    const [schedulesLiterature, setSchedulesLiterature] = useState("");

    const [schedulesLinks, setSchedulesLinks] = useState("");

    const [schedulesHourly_schedule, setSchedulesHourly_schedule] = useState("");

    const [schedulesImage, setSchedulesImage] = useState(null);
    const [schedulesImages, setSchedulesImages] = useState();
    const [apiResponse, setAPIResponse] = useState();
    const setToekn = localStorage.getItem('state')
    const {course_id} = useParams();

    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const [profileData, setProfileData] = useState();
    const {slug} = useParams();

    let btnRef = useRef();
    let schedulesPictureBtnRef = useRef();
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

    const handleSchedulesText = ({ target }) => {
        setSchedulesText(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!schedulesImage) {
                showBtn.current.classList.remove("show-btn");
            }
        }
    };




    const handleSchedulesTitle = ({ target }) => {
        setSchedulesTitile(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!schedulesImage) {
                showBtn.current.classList.remove("show-btn");
            }
        }
    };



    const handleSchedulesLiterature = ({ target }) => {
        setSchedulesLiterature(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!schedulesImage) {
                showBtn.current.classList.remove("show-btn");
            }
        }
    };



    const handleSchedulesLinks = ({ target }) => {
        setSchedulesLinks(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!schedulesImage) {
                showBtn.current.classList.remove("show-btn");
            }
        }
    };


    const handleSchedulesHourly_schedule = ({ target }) => {
        setSchedulesHourly_schedule(target.value)
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight+2)+'px'
        if (target.value) {
            btnRef.current.removeAttribute("disabled");
            showBtn.current.classList.add("show-btn");
        } else {
            btnRef.current.setAttribute("disabled", "disabled");
            if (!schedulesImage) {
                showBtn.current.classList.remove("show-btn");
            }
        }
    };

    
    const handleSchedulesPicture = ({target}) => {
        if (target.value) {
            setSchedulesImage(target.files[0]);
            setAPIResponse(<span>+&nbsp; {target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]}</span>);
            showBtn.current.classList.add("show-btn");
        }
        
    }
 
    const clickSchedulesPicture = () => {
        schedulesPictureBtnRef.current.click();
    }
    const clickMakeSchedules = () => {
        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
        }
        if (schedulesText && schedulesText. length>0) {
            let formData = new FormData();
            formData.append("file", schedulesImage);
           
            console.log("maybe " + schedulesImages)

            const file = {
                file: schedulesImage
                
            }

            let config = { headers: {
              
                Authorization: 'Bearer ' +  Token,   
            }}

            let configImage = { headers: {
              
                Authorization: 'Bearer ' +  Token,   
                'Content-Type': 'multipart/form-data'
            }}

            if(schedulesImage != undefined)
{
            axios.post(BACKEND_SERVER_DOMAIN + '/photos', formData, configImage)
            .then(function(response){
                setSchedulesImages(response.data)
                let img = response.data

                const scheduless = {
                    title: schedulesTitile,
                    desc: schedulesText,
                     photo: img,
                }
            axios.post(BACKEND_SERVER_DOMAIN + '/schedules/create',scheduless, config)
            .then(function (response) {

                setSchedulesText("");
                setSchedulesTitile("");
                textAreaRef.current.style.height = 'auto'
                setSchedulesImage(null);
                newSchedules({...response.data,"person":user});
                setAPIResponse("");
                showBtn.current.classList.remove("show-btn");
                })
            .catch(function (error) {
                setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Unable to schedules. Schedules text pooo required!</span>);
                if(btnRef.current){
                    btnRef.current.removeAttribute("disabled");
                }
            });
            })

        }
else 
{
    const scheduless = {
        title: schedulesTitile,
        desc: schedulesText,
        literature: schedulesLiterature,
        links: schedulesLinks,
        hourly_schedule: schedulesHourly_schedule,
        course: course_id
    }
    axios.post(BACKEND_SERVER_DOMAIN + '/schedule/create', scheduless, config)
    .then(function (response) {

        setSchedulesText("");
        setSchedulesTitile("");

        textAreaRef.current.style.height = 'auto'
        setSchedulesImage(null);
        newSchedules({...response.data,"person":user});
        setAPIResponse("");
        showBtn.current.classList.remove("show-btn");
        })
    .catch(function (error) {
        setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Unable to schedules. Schedules text is required!</span>);
        if(btnRef.current){
            btnRef.current.removeAttribute("disabled");
        }
    });
}

}
        
        else {
            setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Schedules text is required!</span>);
        }
       console.log("ssss+ " + profileData)
    }
    return(
        <section className="create-post">
            <h6>Ավելացնել Դաս</h6>
            <div className="col-lg-5 col-md-12 col-sm-12">
                
                               <label>Դասի վերնագիրը</label>
                               <input className="form-control_homework" type="text" placeholder=" " onChange={handleSchedulesTitle} name="title"  value={schedulesTitile}/>
                            
                               <label>Գրականություն</label>
                               <input className="form-control_homework" type="text" placeholder=" " onChange={handleSchedulesLiterature} name="literature"  value={schedulesLiterature}/>
                               
                               <label>Հղումներ</label>
                               <input className="form-control_homework" type="text" placeholder=" " onChange={handleSchedulesLinks} name="links" />
                               
                               <label>Դասի օրը</label>
                               <input className="form-control_homework" type="text" placeholder="" onChange={handleSchedulesHourly_schedule} name="hourly_schedule"/>
                           
                               <span>
                               </span>
                   </div>
            <div className="d-flex">
                {/* <img className="rounded-circle"  src={profile} alt="profile-picture"/> */}
                {/* {<img className="rounded-circle avatar" src={BACKEND_SERVER_DOMAIN + '/' + profileData.username + '/' + 'avatar' + '/' + profileData.avatar}/>} */}
                 
                <textarea ref={textAreaRef} placeholder="Նկարագրություն" rows="1" onChange={handleSchedulesText} name="desc"  ></textarea>
               
                <button onClick={clickSchedulesPicture}><i className="far fa-file-image"></i></button>
            </div>
            <div className="submit-btn" ref={showBtn}>
                <button className="btn btn-primary btn-sm" type="submit" ref={btnRef} onClick={clickMakeSchedules}>Create Schedules</button> {apiResponse}
            </div>
            <input type="file" accept="image/*" name="schedules_image" onChange={handleSchedulesPicture} ref={schedulesPictureBtnRef} className="d-none" />
        </section>
        );
}


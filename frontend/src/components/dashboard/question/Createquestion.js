import React, {useState, useRef} from 'react';
import axios from 'axios';
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import { useParams, Link } from 'react-router-dom';


export default function CreateQuestion({user, newQuestion}) {
    const [groupText, setQuestionText] = useState("");
    const [groupTitile, setQuestionTitile] = useState("");
    const [groupImage, setQuestionImage] = useState(null);
    const [groupImages, setQuestionImages] = useState();
    const [apiResponse, setAPIResponse] = useState();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const [profileData, setProfileData] = useState();
    const [groupPoint, setGroupPoint] = useState();
    const [level, setLevel] = useState();
    const {slug} = useParams();
    const [fields, setFields] = useState([{ value: null }]);
    const [answer, setAnswer] = useState([])
    let btnRef = useRef();
    let groupPictureBtnRef = useRef();
    let showBtn = useRef();
    let textAreaRef = useRef();

    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
      }
    
      function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
      }
    
      function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
      }

                                  
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

    const handleQuestionText = ({ target }) => {
        setQuestionText(target.value)
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



    const handleGroupPoint = ({target}) => {

        setGroupPoint(target.value)
    }
    
    const handleLevel = ({target}) => {
        setLevel(target.value)
    }


    
    const handleTitleText = ({ target }) => {
        setQuestionTitile(target.value)
    }
    const handleQuestionPicture = ({target}) => {
        if (target.value) {
            setQuestionImage(target.files[0]);
            setAPIResponse(<span>+&nbsp; {target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]}</span>);
            showBtn.current.classList.add("show-btn");
        }
        
    }
 
    const clickQuestionPicture = () => {
        groupPictureBtnRef.current.click();
    }
    const clickMakeQuestion = () => {

        fields.map((field, idx) => {

            setAnswer(field.value)

        })

        console.log(answer)
        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
        }
        if (groupText && groupText. length>0) {
            let formData = new FormData();
            formData.append("file", groupImage);
           

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


    const groups = {
        title: groupTitile,
        desc: groupText,
        point: groupPoint,
        level:level

    }
    axios.post(BACKEND_SERVER_DOMAIN + '/question/create',groups, config)
    .then(function (response) {

        setQuestionText("");
        setQuestionTitile("");

        textAreaRef.current.style.height = 'auto'
        setQuestionImage(null);
        newQuestion({...response.data,"person":user});
        setAPIResponse("");
        showBtn.current.classList.remove("show-btn");
        })
    .catch(function (error) {
        setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Unable to group. Question text is required!</span>);
        if(btnRef.current){
            btnRef.current.removeAttribute("disabled");
        }
        console.log(error)
    });
}

        
        else {
            setAPIResponse(<span className="fw-bold text-uppercase text-danger text-sm">Question text is required!</span>);
        }
    }
    return(
        <section className="create-post">
            <h6>Ավելացնել նոր հարց </h6>
            <div className="d-flex">
                {/* <img className="rounded-circle"  src={profile} alt="profile-picture"/> */}
                {/* {<img className="rounded-circle avatar" src={BACKEND_SERVER_DOMAIN + '/' + profileData.username + '/' + 'avatar' + '/' + profileData.avatar}/>} */}
                 
                <textarea ref={textAreaRef} placeholder="Կոդի Օրինակ" rows="1" onChange={handleQuestionText} name="desc" value={groupText} ></textarea>
               
                {/* <button onClick={clickQuestionPicture}><i className="far fa-file-image"></i></button> */}
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
                
                               <label>վերնագիր</label>
                               <input className="form-control_homework" type="text" placeholder="վերնագիր" onChange={handleTitleText} name="title" value={groupTitile}/>
                               <input className="form-control_homework" type="number" placeholder="միավոր" onChange={handleGroupPoint} name="title" value={groupTitile}/>
                            
                               <select className="form-control_homework" onChange={handleLevel} style={{background:'black'}}>

                                   <option value="level6">Դաժան</option>
                                   <option value="level5">Շատ Դժվար</option>
                                   <option value="level4">Դժվար</option>
                                   <option value="level3">Միջին</option>
                                   <option value="level2">պարզ</option>
                                   <option value="level1">Ճռիկ</option>
                               </select>
                               
      <button type="button" className="btn btn-primary btn-sm" onClick={() => handleAdd()}>
        Ավելացնել տարբերակ
      </button>

      {fields.map((field, idx) => {
        return (
        <div key={`${field}-${idx}`} style={{marginTop: '5%'}}>
            <input
              type="text"
              placeholder="Տարբերակ"
              value={field.value || ""}
              onChange={e => handleChange(idx, e)}
              className="form-control_homework"
            />
            {/* <button type="button" className="btn btn-primary btn-sm"  onClick={() => handleRemove(idx)} >
              հեռացնել
            </button> */}
          </div>
        );
      })}
                               <span>
                               </span>
                   </div>
          
            <div className="submit-btn" ref={showBtn}>
                <button className="btn btn-primary btn-sm" type="submit" ref={btnRef} onClick={clickMakeQuestion}>Create Question</button> {apiResponse}
            </div>
            <input type="file" accept="image/*" name="group_image" onChange={handleQuestionPicture} ref={groupPictureBtnRef} className="d-none" />
        </section>
        );
}


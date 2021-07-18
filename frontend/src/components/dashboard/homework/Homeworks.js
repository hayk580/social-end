import React, { useEffect} from 'react';
import axios from 'axios';
import TimelineHomework from './TimelineHomework';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeworks } from "../../../redux/actions"
import { BACKEND_SERVER_DOMAIN } from '../../../settings'

function Homeworks({token, userhomeworks}) {
                   
    const user = useSelector((state) => state.user);
    const homeworks = useSelector((state) => state.homeworks.homeworks);
    const dispatch = useDispatch();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
  
  
    const eventSource = new EventSource(BACKEND_SERVER_DOMAIN + '/homework/sse');
eventSource.onmessage = ({ data }) => {
  console.log('New message', JSON.parse(data));
};

  
    const getHomeworks = () => {
        let config = { headers: {
            'Content-Type': 'application/json',
             Authorization: 'Bearer ' +  Token,   
        }};

        axios.get(BACKEND_SERVER_DOMAIN + '/gethomeworks/all/', config)
            .then(function (response) {
                dispatch(setHomeworks(response.data.reverse()));
            })
            .catch(function (err) {
                console.log(err);
                dispatch(setHomeworks([]));
            });


            
    }





    useEffect(() => {
        if (userhomeworks) {
            dispatch(setHomeworks(userhomeworks))
        } else {
            getHomeworks();
        }
    },[])

    return (homeworks && homeworks.length > 0) ? 
            (<section className="timeline-posts">
                {homeworks.map((homework) => (
                    <TimelineHomework key={homework.id} user={user} homework={homework}/>
            ))}
            </section>) : (
            <div className="sorry">
                No homeworks yet.
            </div>
        );
}

export default Homeworks;
import React from 'react'
import { Helmet } from "react-helmet";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_SERVER_DOMAIN } from '../../../settings'

export const userData = ()=> {
    const [profileData, setProfileData] = React.useState();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token

    const getData = () => {
        let config = { headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' +  Token,   
        }};
        axios.get(BACKEND_SERVER_DOMAIN + '/profile/my/', config)
            .then(function (response) {
                console.log("ardarutyun" + response.data.username)

                setProfileData(response.data);
                setAvatar(response.data.avatar)
                setCover(response.data.user.cover_image)
                setTagline(response.data.user.tagline)
                setHome(response.data.user.hometown)
                setWork(response.data.user.work)
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    React.useEffect(() => {
        window.scrollTo(0, 0);
        getData();
    },[slug])

}


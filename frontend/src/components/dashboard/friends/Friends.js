import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import SuggestFriends from "./SuggestFriends";
import FriendRequests from "./FriendRequests";
import axios from "axios";

import LeftSidebar from "../LeftSidebar";
import FriendListItem from "./FriendListItem";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import Navbar from "../Navbar";

export default function Friends() {
    const [friends, setFriends] = React.useState();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(true)
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    React.useEffect(() => {
        window.scrollTo(0, 0);
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' +  Token,   
            },
        };
        axios
            .get(BACKEND_SERVER_DOMAIN + "/admin/users/", config)
            .then((res) => {
                setFriends(res.data)
                setIsLoading(false)
            })
            .catch(function(error) {
                console.log(error)
                setIsLoading(false)
            });
    },[])

    return (
        <section className="friends">
            <Helmet>
                <title>Friends on socialnetwork</title>
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={2}/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                        <FriendRequests />
                        <h6 className="mt-3">Friends</h6>
                        <div class="card">
                            {(!isLoading) ? (friends) ? (
                                <div className="friends-list">
                                    {friends
                                        .slice()
                                        .reverse()
                                        .map((friend, index) => (
                                            <div
                                                key={index}
                                            >
                                                <FriendListItem friend={friend} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some friends and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)}
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 rightsidebar">
                        <SuggestFriends />
                    </div>
                </div>
            </div>
        </section>
    );
}

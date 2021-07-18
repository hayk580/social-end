import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
// import SuggestGroups from "./SuggestGroups";
// import GroupRequests from "./GroupRequests";
import axios from "axios";
import CreateGroup from './Creategroup'
import LeftSidebar from "../LeftSidebar";
import GroupListItem from "./GroupListItem";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import Navbar from "../Navbar";
import { addGroup } from "../../../redux/actions"

export default function Groups() {
    const [groups, setGroups] = React.useState();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(true)
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const dispatch = useDispatch();


    const newGroup = (group) => {
        dispatch(addGroup(group));
    }


    React.useEffect(() => {
        window.scrollTo(0, 0);
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' +  Token,   
            },
        };
        axios
            .get(BACKEND_SERVER_DOMAIN + "/getgroups/all/", config)
            .then((res) => {
                setGroups(res.data)
                setIsLoading(false)
            })
            .catch(function(error) {
                console.log(error)
                setIsLoading(false)
            });
    },[])

    return (
        <section className="groups">
            <Helmet>
                <title>Groups on socialnetwork</title>
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={5}/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    <CreateGroup user={user} newGroup={newGroup} />

                        <groupRequests />
                        <h6 className="mt-3">Groups</h6>
                        <div class="card">
                            {(!isLoading) ? (groups) ? (
                                <div className="groups-list">
                                    {groups
                                        .slice()
                                        .reverse()
                                        .map((group, index) => (
                                            <div
                                                key={index}
                                            >
                                                <GroupListItem group={group} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some groups and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)}
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 rightsidebar">
                        {/* <SuggestGroups /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

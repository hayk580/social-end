import React from "react";
import { logoutUser, removeAllPosts } from "../../redux/actions";
import logo from "../../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_SERVER_DOMAIN } from "../../settings";
import { timeSince } from "../../utils/timesince";
import ThemeToggle from "../global/ThemeToggle";
import _ from 'lodash'
export default function Navbar() {
    const user = useSelector((state) => state.user);
    const [notifications, setNotifications] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState(null);
    const [unseen_notifs, setUnseenNotifs] = React.useState(0);
    const [showNotifications, setShowNotifications] = React.useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
/* user data objects */
const [profileData, setProfileData] = React.useState();
const [avatar, setAvatar] = React.useState();
const [cover, setCover] = React.useState();
const [tagline, setTagline] = React.useState("");
const [home, setHome] = React.useState("");
const [work, setWork] = React.useState("")








    if (Object.keys(user).length === 0) {
        history.push("/login");
    }

    const logOut = () => {
        dispatch(logoutUser());
        dispatch(removeAllPosts());
        history.push("/login");
    };



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
        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        };
        axios
            .get(BACKEND_SERVER_DOMAIN + "/api/notifications/", config)
            .then(function (response) {
                setNotifications(response.data);
                let count = 0;
                response.data.map((notif, index) => {
                    if (notif.seen == 0) {
                        count += 1;
                    }
                    if (response.data.length == index + 1) {
                        setUnseenNotifs(count);
                    }
                });
            })
            .catch(function (err) {
                console.log(err.response);
                try {
                    if (err.response.status == 400) {
                        logOut();
                    }
                } catch (err) {
                    console.log(err);
                }
            });
    }, []);

    const searchQuery = _.debounce(({target}) => {
        if(target.value) {
            document.addEventListener("click", handleClickOutside, true);
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user.token,
                },
            };
            axios
                .get(BACKEND_SERVER_DOMAIN + "/api/person/search/"+target.value.replace(" ","+")+"/", config)
                .then(function (response) {
                    setSearchResults(response.data)
                })
                .catch(function (err) {
                    console.log(err.response);
                });
        } else {
            document.removeEventListener("click", handleClickOutside, true);
            setSearchResults(null);
        }
    },1000)

    const markAsSeen = () => {
        let sh = !showNotifications;
        setShowNotifications(sh);
        if (sh) {
            document.addEventListener("click", handleClickOutside, true);
        } else {
            document.removeEventListener("click", handleClickOutside, true);
        }
        if (unseen_notifs > 0) {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user.token,
                },
            };
            axios
                .put(
                    BACKEND_SERVER_DOMAIN + "/api/notifications/seen/",
                    {},
                    config
                )
                .then(function (response) {
                    setUnseenNotifs(0);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    };

    const handleClickOutside = () => {
        setShowNotifications(false);
        setSearchResults(null)
        document.removeEventListener("click", handleClickOutside, true);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <div className="container-fluid row">
                    <div className="col-lg-3 col-12 nav-brand">
                        <h6>
                            <img src={logo} / >
                        </h6>
                        <div className="mobile-notification-icon">
                            <li className="notifications d-block d-lg-none">
                                <button onClick={markAsSeen}>
                                    <i className="far fa-bell"></i>
                                    {unseen_notifs > 0 ? (
                                        <span>{unseen_notifs}</span>
                                    ) : (
                                        ""
                                    )}
                                </button>
                                <Notifications
                                    showNotifications={showNotifications}
                                    notifications={notifications}
                                />
                            </li>
                        </div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarToggler"
                            data-toggle="collapse"
                            data-target="#navbarToggler"
                            aria-controls="navbarToggler"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <div className="col-lg-9 col-12">
                        <div
                            className="collapse navbar-collapse"
                            id="navbarToggler"
                        >
                            <div className="row w-100">
                                <div className="col-lg-8 col-12">
                                    <form className="d-flex">
                                        <input
                                            type="search"
                                            placeholder="Search"
                                            aria-label="Search"
                                            onChange={searchQuery}
                                        />
                                        <button type="submit" disabled="disabled">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        { (searchResults && searchResults.length >0) ?
                                            <div className="searchResults">
                                                {searchResults.slice(0,5).map((result, index)=>(
                                                    <SearchPerson person={result} />
                                                ))}
                                            </div>
                                            : (searchResults && searchResults.length == 0) 
                                                ? <div className="searchResults text-center">
                                                    No results found for this!
                                                </div>
                                            : ""
                                        }
                                    </form>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <ul className="navbar-nav">
                                        <li className="d-md-block d-lg-none">
                                            <Link to={"/dashboard"}>
                                            <i className="far fa-newspaper"></i>?????????????? ????

                                            </Link>
                                        </li>
                                        <li className="d-md-block d-lg-none">
                                            <Link to={"/friends"}>
                                            <i className="fas fa-user-friends"></i>????????????????????

                                            </Link>
                                        </li>
                                        <li className="d-md-block d-lg-none">
                                            <Link to={"/findfriends"}>
                                            <i className="fa fa-globe"></i>???????????? ????????????????

                                            </Link>
                                        </li>
                                        <li className="d-md-block d-lg-none">
                                            <Link to={"/u/" + user.slug}>
                                            <i className="fas fa-user-friends"></i>??????????

                                            </Link>
                                        </li>
                                        <li className="notifications d-none d-lg-block">
                                            <button onClick={markAsSeen}>
                                                <i className="far fa-bell"></i>
                                                {unseen_notifs > 0 ? (
                                                    <span>{unseen_notifs}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </button>
                                             
                                              
                                        </li>
                                        <li className="align-end">
                                            <div className="nav-theme-toggler">
                                                <ThemeToggle />
                                            </div>
                                            <button onClick={logOut}>
                                                Logout
                                                <i className="fas fa-sign-out-alt"></i>
                                            </button>
                                        
                                        </li>
                                                       {/* <DropdownButton
      alignRight
      title="Dropdown right"
      id="dropdown-menu-align-right"
    
        >
              <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
              <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
              <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
      </DropdownButton> */}
                                    </ul>
                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </nav>
    );
}

export function SearchPerson({ person }) {
    return (
        <Link to={"/u/" + person.slug}>
            <div className="d-flex user">
                <img
                    className="rounded-circle"
                    src={BACKEND_SERVER_DOMAIN + person.avatar}
                    alt="profile picture"
                />
                <div>
                    <h6>
                        
                            {person.first_name} {person.last_name}
                    </h6>
                    <span>{person.tagline}</span>
                </div>
            </div>
        </Link>
    );
}

export function Notifications({ showNotifications, notifications }) {
    return (
        <div className={!showNotifications ? "hide" : "list"}>
            {notifications && notifications.length > 0 ? (
                notifications
                    .slice()
                    .reverse()
                    .map((notif) => (
                        <Link
                            key={notif.id}
                            className={notif.seen == 1 ? "notif seen" : "notif"}
                            to={
                                notif.noti == 1
                                    ? "/post/" + notif.about
                                    : notif.noti == 0
                                    ? "/post/" + notif.about
                                    : notif.noti == 2
                                    ? "/post/" + notif.about
                                    : notif.noti == 3
                                    ? "/u/" + notif.person.slug
                                    : notif.noti == 4
                                    ? "/u/" + notif.person.slug
                                    : notif.noti == 5
                                    ? "/post/" + notif.about
                                    : ""
                            }
                        >
                            <div>
                                {notif.noti == 1 ? (
                                    <i className="far fa-comment-alt"></i>
                                ) : notif.noti == 0 ? (
                                    <i className="far fa-thumbs-up"></i>
                                ) : notif.noti == 2 ? (
                                    <i className="far fa-thumbs-up"></i>
                                ) : notif.noti == 3 ? (
                                    <i className="fas fa-user-plus"></i>
                                ) : notif.noti == 4 ? (
                                    <i className="fas fa-user-check"></i>
                                ) : notif.noti == 5 ? (
                                    <i className="fas fa-comment-alt"></i>
                                ) : (
                                    ""
                                )}
                                <span className="uname">
                                    {notif.person.first_name}{" "}
                                    {notif.person.last_name}
                                </span>
                                {notif.noti == 1
                                    ? " commented on your post."
                                    : notif.noti == 0
                                    ? " liked your post."
                                    : notif.noti == 2
                                    ? " liked your comment on a post."
                                    : notif.noti == 3
                                    ? " sent you friend request."
                                    : notif.noti == 4
                                    ? " accepted you friend request."
                                    : notif.noti == 5
                                    ? " replied to your comment on a post."
                                    : ""}
                                <br />
                                <span className="when">
                                    {timeSince(notif.created)}
                                </span>
                            </div>
                        </Link>
                    ))
            ) : (
                <div className="notif">
                    <div className="text-center">No new notifications</div>
                </div>
            )}
        </div>
    );
}

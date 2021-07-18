/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {useParams,  Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BACKEND_SERVER_DOMAIN } from "../../settings";
import profile from "../../assets/images/profile.jpg";
function LeftSidebar({active=0}) {
    const user = useSelector((state) => state.user);
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const user_id = jsonToken.user.user._id

    return (
        <section className="leftsidebar">
            <div className="d-flex user">
                <div>
                    <h4>
                    <Link to={"group/" + jsonToken.user.user.groups}>{jsonToken.user.user.groups_name}</Link>
               </h4>
                    <span>{user.tagline}</span>
                </div>
            </div>
            <div className="navigation">
                <Link to="/dashboard" className={(active == 1) ? "active" : ""}>
                    <i className="far fa-newspaper"></i>Գլխավոր Էջ
                </Link>
                <Link to="/friends" className={(active == 2) ? "active" : ""}>
                    <i className="fas fa-user-friends"></i>Ուսանողներ
                </Link>
                    <Link to={"/u/"+user_id} className={(active == 3) ? "active" : ""}>
                    <i className="far fa-user"></i>Անձնական Էջ
                </Link>
                <Link to={"/homework"} className={(active == 4) ? "active" : ""}>
                    <i className="fa fa-globe"></i>Տնային Աշխատանք
                </Link>
         {(jsonToken.user.user.role != "USER") ?
             <Link to={"/group"} className={(active == 5) ? "active" : ""}>
                  <i className="fas fa-user-friends"></i>Խմբեր
              </Link>
                   : ""
                }
                         {/* {(jsonToken.user.user.role != "USER") ?

              <Link to={"/schedules"} className={(active == 6) ? "active" : ""}>
                  <i className="fas fa-globe"></i>Դասացուցակ
              </Link>
                : ""
            }
                       {(jsonToken.user.user.role != "USER") ?

              <Link to={"/course"} className={(active == 6) ? "active" : ""}>
                  <i className="fas fa-globe"></i>Դասընթաց
              </Link>
       : ""

    }

{(jsonToken.user.user.role != "USER") ?

<Link to={"/category"} className={(active == 6) ? "active" : ""}>
    <i className="fas fa-globe"></i>category
</Link>
: ""

}
{(jsonToken.user.user.role != "USER") ?

<Link to={"/course_module"} className={(active == 6) ? "active" : ""}>
    <i className="fas fa-globe"></i>Դասընթացի մոդուլ
</Link>
: ""

}
{(jsonToken.user.user.role != "USER") ?

<Link to={"/qestions"} className={(active == 6) ? "active" : ""}>
    <i className="fas fa-globe"></i>qestions
</Link>
: ""

} */}

        
            </div>
            <div className="about">
                <h6>Code Republic</h6>
                <p>
                The Programmer brain and heart are composed of 73% Code Republic,
                </p>
                {/* <div className="techs">
                    <a href="https://github.com/gauravjot/social-network" target="_blank">
                        <i className="fab fa-github"></i>Project Github
                    </a>
                    <a href="https://www.djangoproject.com/" target="_blank">
                        <i className="fab fa-python python"></i>Django
                    </a>
                    <a href="https://reactjs.org/" target="_blank">
                        <i className="fab fa-react reactjs"></i>React.js
                    </a>
                    <a href="https://www.postgresql.org/" target="_blank">
                        <i className="fas fa-database sql"></i>PostgreSQL
                    </a>
                </div> */}
                {/* <div className="techs">
                    <a href="https://fontawesome.com/">
                        <i className="fab fa-font-awesome faw"></i>Font Awesome
                    </a>
                    <a href="https://getbootstrap.com/">
                        <i className="fab fa-bootstrap bts"></i>Bootstrap
                    </a>
                </div> */}
            </div>
            <div className="navbar-spacer"></div>
        </section>
    );
}

export default LeftSidebar;

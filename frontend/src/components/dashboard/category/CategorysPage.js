import React from 'react'
import { Helmet } from "react-helmet";
// import TimelineCategory from './TimelineCategory'
import { useParams, Link } from 'react-router-dom';
import Navbar from "../Navbar";
import LeftSidebar from "../LeftSidebar";
import axios from 'axios';
import CreateSchedules from '../schedules/Createschedules'
import { BACKEND_SERVER_DOMAIN } from '../../../settings'
import { useDispatch, useSelector } from 'react-redux';
import { addSchedules } from '../../../redux/actions'

import CategorysSingle from './SinglCategory';
export default function CategoryPage() {
    const {category_id} = useParams();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [categorys,setCategory] = React.useState();
    const setToekn = localStorage.getItem('state')
    const [isLoading, setIsLoading] = React.useState(true)

    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const newSchedules = (schedules) => {
        dispatch(addSchedules(schedules));
    }
    React.useEffect(() => {
        window.scrollTo(0, 0);
        let config = { headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' +  Token,   
        }};
        axios.get(BACKEND_SERVER_DOMAIN + '/getschedules/category/'+category_id+"/", config)
            .then(function (response) {
                setCategory(response.data);
                setIsLoading(false)

                console.log("daaa" + JSON.stringify(categorys))
            })
            .catch(function (err) {
                console.log(err);
                setIsLoading(false)

            });
    },[])

    return (
        <section className="profile-page">
            <Helmet>
                {/* <title>{(category) ? category.person.first_name + " " +category.person.last_name : "User"}'s Category</title> */}
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active="0"/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    {/* <CreateSchedules user={user} newSchedules={newSchedules} /> */}

                        {/* {(category) ? <TimelineCategory user={user} category={category} expanded={true}/>:""} */}
                    
                        <div className="friendlistitem d-flex">
            <div className="avatar">
       
            </div>
            <div>             

            {/* <CategorysSingle categorys={categorys} /> */}
            {/* {(!isLoading) ? (categorys) ? (
                                <div className="categorys-list">
                                    {categorys
                                        .slice()
                                        .reverse()
                                        .map((categorys, index) => (
                                            <div
                                                key={index}
                                            >
            <CategorysSingle categorys={categorys} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some categorys and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)} */}
                
               <CategorysSingle />
            </div>
        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

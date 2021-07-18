import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
// import SuggestCategorys from "./SuggestCategorys";
// import CategoryRequests from "./CategoryRequests";
import axios from "axios";
import CreateCategory from './Createcategory'
import LeftSidebar from "../LeftSidebar";
import CategoryListItem from "./CategoryListItem";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import Navbar from "../Navbar";
import { addCategory } from "../../../redux/actions"

export default function Categorys() {
    const [categorys, setCategorys] = React.useState();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(true)
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const dispatch = useDispatch();


    const newCategory = (category) => {
        dispatch(addCategory(category));
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
            .get(BACKEND_SERVER_DOMAIN + "/getcategorys/all/", config)
            .then((res) => {
                setCategorys(res.data)
                setIsLoading(false)
            })
            .catch(function(error) {
                console.log(error)
                setIsLoading(false)
            });
    },[])

    return (
        <section className="categorys">
            <Helmet>
                <title>Categorys on socialnetwork</title>
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={2}/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    <CreateCategory user={user} newCategory={newCategory} />

                        <categoryRequests />
                        <h6 className="mt-3">Categorys</h6>
                        <div class="card">
                            {(!isLoading) ? (categorys) ? (
                                <div className="categorys-list">
                                    {categorys
                                        .slice()
                                        .reverse()
                                        .map((category, index) => (
                                            <div
                                                key={index}
                                            >
                                                <CategoryListItem category={category} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some categorys and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)}
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 rightsidebar">
                        {/* <SuggestCategorys /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

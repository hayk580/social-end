import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Navbar from "./Navbar";
import CreateHomework from "./homework/CreateHomework";
import Homeworks from "./homework/Homeworks";
import { addHomework } from "../../redux/actions"

function Dashboard() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const token = user.token;

    const newHomework = (homework) => {
        dispatch(addHomework(homework));
    }

    React.useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <section className="dashboard">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Navbar/>
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={4}/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                        {/* <CreateHomework user={user} newHomework={newHomework} /> */}
                        <Homeworks token={token} />
                    </div>
                    <div className="col-lg-3 col-12">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;

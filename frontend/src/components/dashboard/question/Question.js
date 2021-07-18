import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
// import SuggestQuestions from "./SuggestQuestions";
// import QuestionRequests from "./QuestionRequests";
import axios from "axios";
import CreateQuestion from './Createquestion'
import LeftSidebar from "../LeftSidebar";
import QuestionListItem from "./QuestionListItem";
import { BACKEND_SERVER_DOMAIN } from "../../../settings";
import Navbar from "../Navbar";
import { addQuestion } from "../../../redux/actions"

export default function Questions() {
    const [questions, setQuestions] = React.useState();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(true)
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const dispatch = useDispatch();


    const newQuestion = (question) => {
        dispatch(addQuestion(question));
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
            .get(BACKEND_SERVER_DOMAIN + "/getquestions/all/", config)
            .then((res) => {
                setQuestions(res.data)
                setIsLoading(false)
            })
            .catch(function(error) {
                console.log(error)
                setIsLoading(false)
            });
    },[])

    return (
        <section className="questions">
            <Helmet>
                <title>Questions on socialnetwork</title>
            </Helmet>
            <Navbar />
            <div className="navbar-spacer"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <LeftSidebar active={2}/>
                    </div>
                    <div className="col-lg-6 col-12 timeline">
                    <CreateQuestion user={user} newQuestion={newQuestion} />

                        <questionRequests />
                        <h6 className="mt-3">Questions</h6>
                        <div class="card">
                            {(!isLoading) ? (questions) ? (
                                <div className="questions-list">
                                    {questions
                                        .slice()
                                        .reverse()
                                        .map((question, index) => (
                                            <div
                                                key={index}
                                            >
                                                <QuestionListItem question={question} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div class="sorry">
                                    Add some questions and they will show up here!
                                </div>
                            ) : (<div className="slim-loading-bar"></div>)}
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 rightsidebar">
                        {/* <SuggestQuestions /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

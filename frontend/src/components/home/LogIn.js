import React, { useState, useRef } from "react";
import logo from "../../assets/images/logo.png";
import InputField from "../../utils/InputField";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { BACKEND_SERVER_DOMAIN } from "../../settings";
import { Link } from "react-router-dom";
import FinishSignUp from './FinishSignUp'
import {themeApply} from '../global/ThemeApply'

function LogIn() {
    const dispatch = useDispatch();
    const history = useHistory();

    themeApply();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [apiResponse, setAPIResponse] = useState();
    const [isSecondStageSignUpPending,setIsSecondStageSignUpPending] = useState(false)

    const handleUsername = ({ target }) => {
        setUsername(target.value);
    };
    const handlePassword = ({ target }) => {
        setPassword(target.value);
    };
    let btnRef = useRef();
    const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          console.log("Enter key was pressed. Run your function.");
          event.preventDefault();
          let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
          axios
          .post(
              BACKEND_SERVER_DOMAIN + "/auth/login/",
              JSON.stringify({ username: username, password: password }),
              config
              
          )
          .then(function (response) {
              dispatch(setUser(response.data));
              if (true) {
                  history.push("/dashboard");
              } else {
                  setIsSecondStageSignUpPending(true)
              }
          })
          .catch(function (error) {
              setAPIResponse(
                  <div className="fw-bold text-danger text-sm pb-2">
                      Unable to login, make sure your email and password are correct.
                  </div>
              );
              if (btnRef.current) {
                  btnRef.current.removeAttribute("disabled");
              }
          });        }
      };
      document.addEventListener("keydown", listener);
    const handleLogIn = () => {

        if (!username || !password) {
            setAPIResponse(
                <div className="fw-bold text-danger text-sm pb-2">
                    Ooops! Make sure you have typed in your email and password.
                </div>);
            return;
        }

        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
      
        axios
            .post(
                BACKEND_SERVER_DOMAIN + "/auth/login/",
                JSON.stringify({ username: username, password: password }),
                config
                
            )
            .then(function (response) {
                dispatch(setUser(response.data));
                if (true) {
                    history.push("/dashboard");
                } else {
                    setIsSecondStageSignUpPending(true)
                }
            })
            .catch(function (error) {
                setAPIResponse(
                    <div className="fw-bold text-danger text-sm pb-2">
                        Unable to login, make sure your email and password are correct.
                    </div>
                );
                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }
            });
    };

     
    
    return (
        <section className="login bg-social-icons">
            <Helmet>
                <title>Log In to socialnetwork!</title>
            </Helmet>
            <div className="container">
                <div className="col-lg-5 col-md-12 col-sm-12">
                    <img src={logo} className="logo" />
                    {
                        (isSecondStageSignUpPending) ? <FinishSignUp /> 
                        :
                        <div className="card">
                            <h3>Log in</h3>
                            {apiResponse}
                            <InputField
                                label="Մուտքանուն"
                                onChange={handleUsername}
                                name="username"
                                type="text"
                                placeholder=""
                            />
                            <InputField
                                label="Գաղտնաբար"
                                onChange={handlePassword}
                                name="password"
                                type="password"
                                placeholder="*******"
                                onKeyDown={listener}
                            />
                            <button
                                type="submit"
                                ref={btnRef}
                                onClick={handleLogIn}
                                className="btn btn-primary btn-main"
                            >
                                Մուտք Գործել
                            </button>
                            <span>
                                or would you like to <Link to="#">Reset Password</Link>{" "}
                                or <Link to="/">Sign Up</Link>
                            </span>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default LogIn;

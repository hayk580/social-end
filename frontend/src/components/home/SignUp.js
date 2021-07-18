import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import { useHistory } from "react-router-dom";

import InputField from "../../utils/InputField";
import { isValidDate } from "../../utils/CheckValidDate";
import { BACKEND_SERVER_DOMAIN } from "../../settings";

function SignUp({secondStep}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState(undefined);
    const [apiResponse, setAPIResponse] = useState();

    const handleFirstName = ({ target }) => {
        setFirstName(target.value);
    };
    const handleLastName = ({ target }) => {
        setLastName(target.value);
    };
    const handleEmail = ({ target }) => {
        setEmail(target.value);
    };
    const handlePassword = ({ target }) => {
        setPassword(target.value);
    };
   
    const handleConfirmPassword = ({ target }) => {
        if (password === target.value) {
            setConfirmPassword(true);
        } else {
            setConfirmPassword(false);
        }
    };


    let btnRef = useRef();
    const handleSignUp = () => {

        if (!first_name || !last_name || !email || !password ) {
            setAPIResponse(
                <div class="fw-bold text-uppercase text-danger text-sm">
                    Oops! Fields may not be blank.
                </div>
            );
            return;
        }

        if (!confirmPassword) {
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
            setAPIResponse(
                <div class="fw-bold text-uppercase text-danger text-sm">
                    Oops! Passwords do not match.
                </div>
            );
            return;
        }

        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }

        setAPIResponse("");

        let formData = {
            "username":first_name,
            "full_name":last_name,
            "email":email,
            "password":password,
            }
        
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (true) {
            axios
                .post(
                    BACKEND_SERVER_DOMAIN + "/auth/reg",
                    formData,
                    config
                )
                .then(function (response) {
                    // First Step of Sign up is success!!!
                    dispatch(setUser(response.data));
                    secondStep()
                    if(true){
                    history.push("/login");
                    }
                })
                .catch(function (error) {
                    let output_error;
                    try {
                        let error_data = error.response.data;
                        let error_type, error_msg;
                        for (var k in error_data) {
                            error_type = k;
                            error_msg = error_data[k];
                            break;
                        }
                        output_error =
                            error_type.replace("_", " ") + ": " + error_msg;
                    } catch (error) {
                        output_error =
                            "error: sorry ,we are unable to serve your request.";
                    }
                    if (btnRef.current) {
                        btnRef.current.removeAttribute("disabled");
                    }
                    setAPIResponse(
                        <div class="fw-bold text-uppercase text-danger text-sm">
                            {output_error}
                        </div>
                    );
                });
        } else {
            setAPIResponse(
                <div class="fw-bold text-uppercase text-danger text-sm">
                    Sorry, You have to be of age 13 or over.
                </div>
            );
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
        }
    };

    return (
        <section className="signup">
            <div className="card">
                <h3>Գրանցում</h3>
                <div>
                     <Link to={"/login"}>Մուտք գործել</Link>
                </div>
                <div className="text-sm text-muted">
                Բոլոր դաշտերը պարտադիր են:.
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <InputField
                            label="Մուտքանուն"
                            onChange={handleFirstName}
                            name="Mwu"
                            type="text"
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            label="Անուն Ազգանուն"
                            onChange={handleLastName}
                            name="last_name"
                            type="text"
                            />
                    </div>
                    <div className="col-md-12">
                        <InputField
                            label="էլեկտրոնային հասցե"
                            onChange={handleEmail}
                            name="email"
                            type="email"
                            placeholder="beast@coderepublic.am"
                        />
                    </div>
               
                    <div className="col-md-6">
                        <InputField
                            label="Գաղտնաբառ"
                            onChange={handlePassword}
                            name="password"
                            type="password"
                            placeholder="********"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className={confirmPassword == false ? "error-bg" : ""}>
                            <InputField
                                label="Կրկնել գաղտնաբառը"
                                onChange={handleConfirmPassword}
                                name="confirm_password"
                                type="password"
                                placeholder="********"

                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            ref={btnRef}
                            onClick={handleSignUp}
                            className="btn btn-primary btn-signup"
                        >
                            Next
                        </button>
                        {apiResponse}
                    </div>
                </div>
                <div className="tos-text-signup">
                    <a href="#">terms of use</a> and{" "}
                    <a href="#">privacy policies</a>
                </div>
            </div>
        </section>
    );
}

export default SignUp;

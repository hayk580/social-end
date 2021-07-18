import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';

import Swal from 'sweetalert2';


type LoginFormState = {
    email: string;
    password: string;
    rememberMe: boolean;
};


const initialFormState = {
    email: '',
    password: '',
    rememberMe: false,
} as LoginFormState;


export const LoginPage: React.FC = () => {

    const [form, setForm] = useState(initialFormState);

    const { login } = useContext(AuthContext);


    useEffect(() => {

        const rememberMeEmail = localStorage.getItem('email');
        if (rememberMeEmail) {
            setForm(
                s => ({
                    ...s,
                    rememberMe: true,
                    email: rememberMeEmail,
                })
            );
        }
    }, []);


    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setForm(
            {
                ...form,
                [name]: value,
            }
        );

    }

    const toggleCheck = () => {
        setForm(
            {
                ...form,
                rememberMe: !form.rememberMe,
            }
        );
    }

    const onSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (form.rememberMe) {
            localStorage.setItem('email', form.email);
        } else {
            localStorage.removeItem('email');
        }
        const { email, password } = form;
        const ok = await login(email, password);
        if (!ok) {
            Swal.fire('Error', 'Incorrect user or password', 'error');
        } else {

        }
    }

    const isFormValid = (): boolean => {
        const { email, password } = form;
        return email.length > 0 && password.length > 0;
    };



    return (

        <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={onSubmit}
        >
            <span className="login100-form-title mb-3">
                   Մուտք
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={onChange}
                />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                    value={form.password}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div
                    className="col"
                    onClick={toggleCheck}
                >
                    <input
                        name="rememberMe"
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        checked={form.rememberMe}
                        onChange={onChange}
                    />
                    <label className="label-checkbox100">
                        հիշել ինձ
                    </label>
                </div>

                <div className="col text-right">
                    <Link to="/auth/register" className="txt1">
                        Գրանցվել
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button 
                    className="login100-form-btn"
                    type="submit"
                    disabled={!isFormValid()}
                >
                    Մուտք
                </button>
            </div>

        </form>

    )
}

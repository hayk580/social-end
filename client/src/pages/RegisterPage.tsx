import React, { useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';




type RegisterForm = {
    username: string;
    email: string;
    password: string;
}


const initialForm = {
    username: '',
    email: '',
    password: '',
} as RegisterForm;


export const RegisterPage: React.FC = () => {

    const [form, setForm] = useState<RegisterForm>(initialForm);
    const { register } = useContext(AuthContext);

    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setForm(
            {
                ...form,
                [name]: value,
            }
        );

    }

    const onSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        const { username, email, password } = form;
        const ok = await register(username, email, password);
        if (!ok) {
            Swal.fire('Error on register', 'Invalid data', 'error');
        } else {
            Swal.fire('Success', 'User has registered', 'success');
        }
    }

    const isFormValid = (): boolean => {

        const { username, email, password } = form;

        return username.length > 0 && email.length > 0 && password.length > 0;
    }


    return (
        <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={onSubmit}
        >
            <span className="login100-form-title mb-3">
               Գրանցվել
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="text"
                    name="username"
                    onChange={onChange}
                    placeholder="Username"
                />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="password"
                    name="password"
                    onChange={onChange}
                    placeholder="Password"
                />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                       Մուտք Գործել
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button
                    className="login100-form-btn"
                    type="submit"
                    disabled={!isFormValid()}
                >
                   Գրանցվել
                </button>
            </div>

        </form>
    )
}

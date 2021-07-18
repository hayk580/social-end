import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';

export const SearchBox: React.FC = () => {

    const { auth, logout } = useContext(AuthContext);

    const { username } = auth;

    return (
        <>
            {/* <!-- Searchbox inicio --> */}
            <div className="headind_srch">
                <div className="recent_heading mt-2">
                    <h4>{username}</h4>
                </div>
                <div className="srch_bar">
                    <div className="stylish-input-group">
                        <button
                            className="btn text-danger"
                            onClick={logout}
                        >
                            Դուրս գալ
                        </button>
                    </div>
                </div>
            </div>
            {/* <!-- Searchbox Fin --> */}
        </>
    )
}

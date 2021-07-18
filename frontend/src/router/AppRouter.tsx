import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';

import '../css/login-register.css';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const AppRouter: React.FC = () => {

    const { auth, verifyToken } = useContext(AuthContext);
    const { logged, checking } = auth;

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    if (checking) {
        return <h1>Please wait...</h1>
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route path="/auth" component={AuthRouter} /> */}
                    <PublicRoute
                        isAuthenticated={logged}
                        component={AuthRouter}
                        path='/auth'
                    />
                    {/* <Route exact path="/" component={ChatPage} /> */}
                    <PrivateRoute
                        exact
                        path="/"
                        isAuthenticated={logged}
                        component={ChatPage}
                        redirectTo='/auth'
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}

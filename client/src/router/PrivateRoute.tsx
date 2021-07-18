import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
    component: React.FC<Record<string, unknown>>;
    path: string;
    redirectTo: string;
}

export const PrivateRoute = ({component, isAuthenticated, path,redirectTo,...rest}: PrivateRouteProps) => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: redirectTo}}/>
    );
    return <Route {...rest} path={path} render={routeComponent}/>;
};
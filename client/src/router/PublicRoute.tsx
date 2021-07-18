import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface PublicRouteProps extends RouteProps{
    isAuthenticated: boolean;
    component: React.FC<Record<string, unknown>>;
    path: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
    isAuthenticated,
    component: Component,
    path,
    exact,
}: PublicRouteProps) => {
    return (
        <Route
            path={path}
            exact={exact || false}
            component={(props: Record<string, unknown>) =>
                (!isAuthenticated) ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};

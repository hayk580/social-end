import { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { customFetch, HttpResponse } from '../helpers/fetch';
import { ChatTypes } from '../types/chat.types';

export type AuthContextProps = {
    auth: IAuthState,
    login(email: string, password: string): Promise<boolean>;
    register(name: string, email: string, password: string): Promise<boolean>;
    verifyToken(): Promise<boolean>;
    logout(): void;

};


const initialAuthContext = {
    logout(): void { },
} as AuthContextProps;


export interface IAuthState {
    id: string | null;
    checking: boolean;
    logged: boolean;
    username: string | null;
    email: string | null;
}


const initialAuthState = {
    id: null,
    checking: true,
    logged: false,
    username: null,
    email: null,
} as IAuthState;

export interface IUser {
    id: string;
    online: boolean;
    username: string;
    email: string;
}

export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    user: IUser;
}


export const AuthContext = createContext(initialAuthContext);


type AuthPropviderProps = { children: JSX.Element };


export const AuthProvider: React.FC<AuthPropviderProps> = ({ children }) => {

    const [auth, setAuth] = useState<IAuthState>(initialAuthState);

    const { dispatch } = useContext(ChatContext);


    const login = async (email: string, password: string) => {
        const loginResponse = await customFetch<LoginResponse>(
            {
                endpoint: 'auth/login',
                method: 'POST',
                data: { email, password },
            }
        );

        return handleLoginResponse(loginResponse);
    };

    const handleLoginResponse = (loginResponse: HttpResponse<LoginResponse>) => {
        if (loginResponse.ok) {
            const { access_token, refresh_token, user } = loginResponse.data as LoginResponse;
            const { email, id, username } = user;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            setAuth(
                {
                    email,
                    checking: false,
                    id,
                    username,
                    logged: true,
                }
            );
        }
        return loginResponse.ok;
    }

    const register = async (username: string, email: string, password: string) => {

        const registerResponse = await customFetch<LoginResponse>(
            {
                endpoint: 'auth/register-login',
                method: 'POST',
                data: { username, email, password },
            }
        );
        return handleLoginResponse(registerResponse);
    };

    const verifyToken = useCallback(
        async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!(accessToken && refreshToken)) {
                setAuth(
                    {
                        ...initialAuthState,
                        logged: false,
                        checking: false,
                    }
                );
                return false;
            }
            const refreshResponse = await customFetch<LoginResponse>(
                {
                    endpoint: 'auth/refresh-token',
                    method: 'POST',
                    data: {
                        'refreshToken': refreshToken,
                    },
                }
            );
            if (refreshResponse.ok) {
                const { access_token, refresh_token, user } = refreshResponse.data as LoginResponse;
                const { email, id, username } = user;
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                setAuth(
                    {
                        email,
                        checking: false,
                        id,
                        username,
                        logged: true,
                    }
                );
            } else {
                setAuth(
                    {
                        ...initialAuthState,
                        checking: false,
                        logged: false,
                    }
                );
            }

        }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAuth(
            {
                ...initialAuthState,
                checking: false,
                logged: false,
            }
        );
        dispatch({ type: ChatTypes.clean });
    }

    const context = {
        auth,
        login,
        register,
        verifyToken,
        logout,
    } as AuthContextProps;

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

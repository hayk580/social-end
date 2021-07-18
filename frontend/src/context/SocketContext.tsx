import { createContext, useContext, useEffect } from 'react';

import { Socket } from 'socket.io-client';
import { AuthContext, IUser } from '../auth/AuthContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

import { useSocket } from '../hooks/useSocket';
import { ChatTypes } from '../types/chat.types';
import { ChatContext, IMessage } from './chat/ChatContext';
import { ListUsers, NewMessage } from './chat/chatReducer';


export interface ISocketContext {
    socket: Socket | null;
    online: boolean;
}
const initialContext = {
    online: false,
} as ISocketContext;


export const SocketContext: React.Context<ISocketContext> = createContext(initialContext);



export const SocketProvider: React.FC<{ children: JSX.Element }> = ({ children }: { children: JSX.Element }) => {

    const { socket, online, disconnectSocket, connectSocket } = useSocket('http://localhost:3002/chat');

    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);


    useEffect(() => {
        if (auth.logged) {
            connectSocket();
        }
    }, [auth, connectSocket]);

    useEffect(() => {
        if (!auth.logged) {
            disconnectSocket();
        }
    }, [auth, disconnectSocket]);

    // listen  connected users
    useEffect(() => {
        socket?.on('online-users', (users: IUser[]) => {
            dispatch(
                {
                    type: ChatTypes.listUsers,
                    payload: users,
                } as ListUsers,
            );
        });
    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on('private-message', (message: IMessage) => {

            const newMessage = {
                type: ChatTypes.newMessage,
                payload: message,
            } as NewMessage;

            dispatch(newMessage);
            // Move scroll to final
            scrollToBottomAnimated('messages');
        });
    }, [socket, dispatch]);


    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    );
}
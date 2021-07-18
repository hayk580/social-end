import React from 'react'
import { AuthProvider } from './auth/AuthContext'
import { ChatProvider } from './context/chat/ChatContext'
import { SocketProvider } from './context/SocketContext'
import { AppRouter } from './router/AppRouter'

import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');


export const ChatApp: React.FC = () => {
    return (
        <ChatProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AuthProvider>
        </ChatProvider>
    )
}

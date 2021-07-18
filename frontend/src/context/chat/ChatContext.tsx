import React, { createContext, useReducer } from 'react'
import { ChatAction, chatReducer, ChatState, initialChatState } from './chatReducer';


export interface IMessage {
    id: string;
    to: string;
    from: string;
    text: string;
    createdAt?: string;
}

export interface IChatContext {
    chatState: ChatState;
    dispatch: React.Dispatch<ChatAction>;
}


const initialChatContext = {
    chatState: initialChatState,
    dispatch: (action: ChatAction) => { }
} as IChatContext;



export const ChatContext = createContext(initialChatContext);


export const ChatProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialChatState);

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch,
        }}>
            {children}
        </ChatContext.Provider>
    )
}
